"use strict";

var _models = require("./../models");

var _factories = require("./../test/factories");

var _support = require("./../test/support");

var _starDestroyer = _interopRequireDefault(require("./starDestroyer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

beforeEach(() => (0, _support.flushdb)());
describe("starDestroyer", () => {
  const ip = "127.0.0.1";
  it("should destroy existing star", async () => {
    const user = await (0, _factories.buildUser)();
    const document = await (0, _factories.buildDocument)({
      userId: user.id,
      teamId: user.teamId
    });
    const star = await _models.Star.create({
      teamId: document.teamId,
      documentId: document.id,
      userId: user.id,
      createdById: user.id,
      index: "P"
    });
    await (0, _starDestroyer.default)({
      star,
      user,
      ip
    });
    const count = await _models.Star.count();
    expect(count).toEqual(0);
    const event = await _models.Event.findOne();
    expect(event.name).toEqual("stars.delete");
    expect(event.modelId).toEqual(star.id);
  });
});