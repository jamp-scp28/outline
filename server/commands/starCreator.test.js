"use strict";

var _sequelize = require("./../database/sequelize");

var _models = require("./../models");

var _factories = require("./../test/factories");

var _support = require("./../test/support");

var _starCreator = _interopRequireDefault(require("./starCreator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

beforeEach(() => (0, _support.flushdb)());
describe("starCreator", () => {
  const ip = "127.0.0.1";
  it("should create star", async () => {
    const user = await (0, _factories.buildUser)();
    const document = await (0, _factories.buildDocument)({
      userId: user.id,
      teamId: user.teamId
    });
    const star = await _sequelize.sequelize.transaction(async transaction => (0, _starCreator.default)({
      documentId: document.id,
      user,
      ip,
      transaction
    }));
    const event = await _models.Event.findOne();
    expect(star.documentId).toEqual(document.id);
    expect(star.userId).toEqual(user.id);
    expect(star.index).toEqual("P");
    expect(event.name).toEqual("stars.create");
    expect(event.modelId).toEqual(star.id);
  });
  it("should not record event if star is existing", async () => {
    const user = await (0, _factories.buildUser)();
    const document = await (0, _factories.buildDocument)({
      userId: user.id,
      teamId: user.teamId
    });
    await _models.Star.create({
      teamId: document.teamId,
      documentId: document.id,
      userId: user.id,
      createdById: user.id,
      index: "P"
    });
    const star = await _sequelize.sequelize.transaction(async transaction => (0, _starCreator.default)({
      documentId: document.id,
      user,
      ip,
      transaction
    }));
    const events = await _models.Event.count();
    expect(star.documentId).toEqual(document.id);
    expect(star.userId).toEqual(user.id);
    expect(star.index).toEqual("P");
    expect(events).toEqual(0);
  });
});