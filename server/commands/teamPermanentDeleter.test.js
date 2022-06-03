"use strict";

var _dateFns = require("date-fns");

var _models = require("./../models");

var _factories = require("./../test/factories");

var _support = require("./../test/support");

var _teamPermanentDeleter = _interopRequireDefault(require("./teamPermanentDeleter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

beforeEach(() => (0, _support.flushdb)());
describe("teamPermanentDeleter", () => {
  it("should destroy related data", async () => {
    const team = await (0, _factories.buildTeam)({
      deletedAt: (0, _dateFns.subDays)(new Date(), 90)
    });
    const user = await (0, _factories.buildUser)({
      teamId: team.id
    });
    await (0, _factories.buildDocument)({
      teamId: team.id,
      userId: user.id
    });
    await (0, _teamPermanentDeleter.default)(team);
    expect(await _models.Team.count()).toEqual(0);
    expect(await _models.User.count()).toEqual(0);
    expect(await _models.Document.unscoped().count({
      paranoid: false
    })).toEqual(0);
    expect(await _models.Collection.unscoped().count({
      paranoid: false
    })).toEqual(0);
  });
  it("should not destroy unrelated data", async () => {
    const team = await (0, _factories.buildTeam)({
      deletedAt: (0, _dateFns.subDays)(new Date(), 90)
    });
    await (0, _factories.buildUser)();
    await (0, _factories.buildTeam)();
    await (0, _factories.buildDocument)();
    await (0, _teamPermanentDeleter.default)(team);
    expect(await _models.Team.count()).toEqual(4); // each build command creates a team

    expect(await _models.User.count()).toEqual(2);
    expect(await _models.Document.unscoped().count({
      paranoid: false
    })).toEqual(1);
    expect(await _models.Collection.unscoped().count({
      paranoid: false
    })).toEqual(1);
  });
  it("should destroy attachments", async () => {
    const team = await (0, _factories.buildTeam)({
      deletedAt: (0, _dateFns.subDays)(new Date(), 90)
    });
    const user = await (0, _factories.buildUser)({
      teamId: team.id
    });
    const document = await (0, _factories.buildDocument)({
      teamId: team.id,
      userId: user.id
    });
    await (0, _factories.buildAttachment)({
      teamId: document.teamId,
      documentId: document.id
    });
    await (0, _teamPermanentDeleter.default)(team);
    expect(await _models.Team.count()).toEqual(0);
    expect(await _models.User.count()).toEqual(0);
    expect(await _models.Attachment.count()).toEqual(0);
    expect(await _models.Document.unscoped().count({
      paranoid: false
    })).toEqual(0);
    expect(await _models.Collection.unscoped().count({
      paranoid: false
    })).toEqual(0);
  });
  it("should error when trying to destroy undeleted team", async () => {
    const team = await (0, _factories.buildTeam)();
    let error;

    try {
      await (0, _teamPermanentDeleter.default)(team);
    } catch (err) {
      error = err.message;
    }

    expect(error).toEqual(`Cannot permanently delete ${team.id} team. Please delete it and try again.`);
  });
});