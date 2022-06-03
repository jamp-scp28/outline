"use strict";

var _models = require("./../models");

var _factories = require("./../test/factories");

var _support = require("./../test/support");

var _pinDestroyer = _interopRequireDefault(require("./pinDestroyer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

beforeEach(() => (0, _support.flushdb)());
describe("pinCreator", () => {
  const ip = "127.0.0.1";
  it("should destroy existing pin", async () => {
    const user = await (0, _factories.buildUser)();
    const document = await (0, _factories.buildDocument)({
      userId: user.id,
      teamId: user.teamId
    });
    const pin = await _models.Pin.create({
      teamId: document.teamId,
      documentId: document.id,
      collectionId: document.collectionId,
      createdById: user.id,
      index: "P"
    });
    await (0, _pinDestroyer.default)({
      pin,
      user,
      ip
    });
    const count = await _models.Pin.count();
    expect(count).toEqual(0);
    const event = await _models.Event.findOne();
    expect(event.name).toEqual("pins.delete");
    expect(event.modelId).toEqual(pin.id);
  });
});