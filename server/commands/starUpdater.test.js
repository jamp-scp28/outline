"use strict";

var _models = require("./../models");

var _factories = require("./../test/factories");

var _support = require("./../test/support");

var _starUpdater = _interopRequireDefault(require("./starUpdater"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

beforeEach(() => (0, _support.flushdb)());
describe("starUpdater", () => {
  const ip = "127.0.0.1";
  it("should update (move) existing star", async () => {
    const user = await (0, _factories.buildUser)();
    const document = await (0, _factories.buildDocument)({
      userId: user.id,
      teamId: user.teamId
    });
    let star = await _models.Star.create({
      teamId: document.teamId,
      documentId: document.id,
      userId: user.id,
      createdById: user.id,
      index: "P"
    });
    star = await (0, _starUpdater.default)({
      star,
      index: "h",
      user,
      ip
    });
    const event = await _models.Event.findOne();
    expect(star.documentId).toEqual(document.id);
    expect(star.userId).toEqual(user.id);
    expect(star.index).toEqual("h");
    expect(event.name).toEqual("stars.update");
    expect(event.modelId).toEqual(star.id);
  });
});