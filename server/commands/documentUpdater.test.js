"use strict";

var _sequelize = require("./../database/sequelize");

var _models = require("./../models");

var _factories = require("./../test/factories");

var _support = require("./../test/support");

var _documentUpdater = _interopRequireDefault(require("./documentUpdater"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

beforeEach(() => (0, _support.flushdb)());
describe("documentUpdater", () => {
  const ip = "127.0.0.1";
  it("should change lastModifiedById", async () => {
    const user = await (0, _factories.buildUser)();
    let document = await (0, _factories.buildDocument)({
      teamId: user.teamId
    });
    document = await _sequelize.sequelize.transaction(async transaction => (0, _documentUpdater.default)({
      text: "Changed",
      document,
      user,
      ip,
      transaction
    }));
    const event = await _models.Event.findOne();
    expect(document.lastModifiedById).toEqual(user.id);
    expect(event.name).toEqual("documents.update");
    expect(event.documentId).toEqual(document.id);
  });
  it("should not change lastModifiedById or generate event if nothing changed", async () => {
    const user = await (0, _factories.buildUser)();
    let document = await (0, _factories.buildDocument)({
      teamId: user.teamId
    });
    document = await _sequelize.sequelize.transaction(async transaction => (0, _documentUpdater.default)({
      title: document.title,
      document,
      user,
      ip,
      transaction
    }));
    const event = await _models.Event.findOne();
    expect(document.lastModifiedById).not.toEqual(user.id);
    expect(event).toEqual(null);
  });
});