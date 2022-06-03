"use strict";

var _models = require("./../models");

var _factories = require("./../test/factories");

var _support = require("./../test/support");

var _pinCreator = _interopRequireDefault(require("./pinCreator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

beforeEach(() => (0, _support.flushdb)());
describe("pinCreator", () => {
  const ip = "127.0.0.1";
  it("should create pin to home", async () => {
    const user = await (0, _factories.buildUser)();
    const document = await (0, _factories.buildDocument)({
      userId: user.id,
      teamId: user.teamId
    });
    const pin = await (0, _pinCreator.default)({
      documentId: document.id,
      user,
      ip
    });
    const event = await _models.Event.findOne();
    expect(pin.documentId).toEqual(document.id);
    expect(pin.collectionId).toEqual(null);
    expect(pin.createdById).toEqual(user.id);
    expect(pin.index).toEqual("P");
    expect(event.name).toEqual("pins.create");
    expect(event.modelId).toEqual(pin.id);
  });
  it("should create pin to collection", async () => {
    const user = await (0, _factories.buildUser)();
    const document = await (0, _factories.buildDocument)({
      userId: user.id,
      teamId: user.teamId
    });
    const pin = await (0, _pinCreator.default)({
      documentId: document.id,
      collectionId: document.collectionId,
      user,
      ip
    });
    const event = await _models.Event.findOne();
    expect(pin.documentId).toEqual(document.id);
    expect(pin.collectionId).toEqual(document.collectionId);
    expect(pin.createdById).toEqual(user.id);
    expect(pin.index).toEqual("P");
    expect(event.name).toEqual("pins.create");
    expect(event.modelId).toEqual(pin.id);
    expect(event.collectionId).toEqual(pin.collectionId);
  });
});