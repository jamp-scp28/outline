"use strict";

var _models = require("./../../models");

var _factories = require("./../../test/factories");

var _support = require("./../../test/support");

var _RevisionsProcessor = _interopRequireDefault(require("./RevisionsProcessor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ip = "127.0.0.1";
beforeEach(() => (0, _support.flushdb)());
beforeEach(jest.resetAllMocks);
describe("documents.update.debounced", () => {
  test("should create a revision", async () => {
    const document = await (0, _factories.buildDocument)();
    const processor = new _RevisionsProcessor.default();
    await processor.perform({
      name: "documents.update.debounced",
      documentId: document.id,
      collectionId: document.collectionId,
      teamId: document.teamId,
      actorId: document.createdById,
      createdAt: new Date().toISOString(),
      data: {
        title: document.title,
        autosave: false,
        done: true
      },
      ip
    });
    const amount = await _models.Revision.count({
      where: {
        documentId: document.id
      }
    });
    expect(amount).toBe(1);
  });
  test("should not create a revision if identical to previous", async () => {
    const document = await (0, _factories.buildDocument)();
    await _models.Revision.createFromDocument(document);
    const processor = new _RevisionsProcessor.default();
    await processor.perform({
      name: "documents.update.debounced",
      documentId: document.id,
      collectionId: document.collectionId,
      teamId: document.teamId,
      actorId: document.createdById,
      createdAt: new Date().toISOString(),
      data: {
        title: document.title,
        autosave: false,
        done: true
      },
      ip
    });
    const amount = await _models.Revision.count({
      where: {
        documentId: document.id
      }
    });
    expect(amount).toBe(1);
  });
});