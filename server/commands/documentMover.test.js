"use strict";

var _sequelize = require("./../database/sequelize");

var _Pin = _interopRequireDefault(require("./../models/Pin"));

var _factories = require("./../test/factories");

var _support = require("./../test/support");

var _documentMover = _interopRequireDefault(require("./documentMover"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

beforeEach(() => (0, _support.flushdb)());
describe("documentMover", () => {
  const ip = "127.0.0.1";
  it("should move within a collection", async () => {
    const {
      document,
      user,
      collection
    } = await (0, _support.seed)();
    const response = await (0, _documentMover.default)({
      user,
      document,
      collectionId: collection.id,
      ip
    });
    expect(response.collections.length).toEqual(1);
    expect(response.documents.length).toEqual(1);
  });
  it("should error when not in source collection documentStructure", async () => {
    const user = await (0, _factories.buildUser)();
    const collection = await (0, _factories.buildCollection)({
      teamId: user.teamId
    });
    const document = await (0, _factories.buildDocument)({
      collectionId: collection.id
    });
    await document.archive(user.id);
    let error;

    try {
      await (0, _documentMover.default)({
        user,
        document,
        collectionId: collection.id,
        ip
      });
    } catch (err) {
      error = err;
    }

    expect(error).toBeTruthy();
  });
  it("should move with children", async () => {
    const {
      document,
      user,
      collection
    } = await (0, _support.seed)();
    const newDocument = await (0, _factories.buildDocument)({
      parentDocumentId: document.id,
      collectionId: collection.id,
      teamId: collection.teamId,
      userId: collection.createdById,
      title: "Child document",
      text: "content"
    });
    await collection.addDocumentToStructure(newDocument);
    const response = await (0, _documentMover.default)({
      user,
      document,
      collectionId: collection.id,
      parentDocumentId: undefined,
      index: 0,
      ip
    });
    expect(response.collections[0].documentStructure[0].children[0].id).toBe(newDocument.id);
    expect(response.collections.length).toEqual(1);
    expect(response.documents.length).toEqual(1);
    expect(response.documents[0].collection.id).toEqual(collection.id);
    expect(response.documents[0].updatedBy.id).toEqual(user.id);
  });
  it("should move with children to another collection", async () => {
    const {
      document,
      user,
      collection
    } = await (0, _support.seed)();
    const newCollection = await (0, _factories.buildCollection)({
      teamId: collection.teamId
    });
    const newDocument = await (0, _factories.buildDocument)({
      parentDocumentId: document.id,
      collectionId: collection.id,
      teamId: collection.teamId,
      userId: collection.createdById,
      title: "Child document",
      text: "content"
    });
    await collection.addDocumentToStructure(newDocument);
    const response = await (0, _documentMover.default)({
      user,
      document,
      collectionId: newCollection.id,
      parentDocumentId: undefined,
      index: 0,
      ip
    }); // check document ids where updated

    await newDocument.reload();
    expect(newDocument.collectionId).toBe(newCollection.id); // check collection structure updated

    expect(response.collections[0].id).toBe(collection.id);
    expect(response.collections[1].id).toBe(newCollection.id);
    expect(response.collections[1].documentStructure[0].children[0].id).toBe(newDocument.id);
    expect(response.collections.length).toEqual(2);
    expect(response.documents.length).toEqual(2);
    expect(response.documents[0].collection.id).toEqual(newCollection.id);
    expect(response.documents[0].updatedBy.id).toEqual(user.id);
    expect(response.documents[1].collection.id).toEqual(newCollection.id);
    expect(response.documents[1].updatedBy.id).toEqual(user.id);
  });
  it("should remove associated collection pin if moved to another collection", async () => {
    const {
      document,
      user,
      collection
    } = await (0, _support.seed)();
    const newCollection = await (0, _factories.buildCollection)({
      teamId: collection.teamId
    });
    await _Pin.default.create({
      createdById: user.id,
      collectionId: collection.id,
      documentId: document.id,
      teamId: collection.teamId
    });
    const response = await _sequelize.sequelize.transaction(async transaction => (0, _documentMover.default)({
      user,
      document,
      collectionId: newCollection.id,
      parentDocumentId: undefined,
      index: 0,
      ip,
      transaction
    }));
    const pinCount = await _Pin.default.count();
    expect(pinCount).toBe(0); // check collection structure updated

    expect(response.collections[0].id).toBe(collection.id);
    expect(response.collections[1].id).toBe(newCollection.id);
    expect(response.collections.length).toEqual(2);
    expect(response.documents.length).toEqual(1);
    expect(response.documents[0].collection.id).toEqual(newCollection.id);
    expect(response.documents[0].updatedBy.id).toEqual(user.id);
  });
});