"use strict";

var _dateFns = require("date-fns");

var _models = require("./../../models");

var _factories = require("./../../test/factories");

var _support = require("./../../test/support");

var _CleanupDeletedDocumentsTask = _interopRequireDefault(require("./CleanupDeletedDocumentsTask"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

beforeEach(() => (0, _support.flushdb)());
describe("CleanupDeletedDocumentsTask", () => {
  it("should not destroy documents not deleted", async () => {
    await (0, _factories.buildDocument)({
      publishedAt: new Date()
    });
    const task = new _CleanupDeletedDocumentsTask.default();
    await task.perform({
      limit: 100
    });
    expect(await _models.Document.unscoped().count({
      paranoid: false
    })).toEqual(1);
  });
  it("should not destroy documents deleted less than 30 days ago", async () => {
    await (0, _factories.buildDocument)({
      publishedAt: new Date(),
      deletedAt: (0, _dateFns.subDays)(new Date(), 25)
    });
    const task = new _CleanupDeletedDocumentsTask.default();
    await task.perform({
      limit: 100
    });
    expect(await _models.Document.unscoped().count({
      paranoid: false
    })).toEqual(1);
  });
  it("should destroy documents deleted more than 30 days ago", async () => {
    await (0, _factories.buildDocument)({
      publishedAt: new Date(),
      deletedAt: (0, _dateFns.subDays)(new Date(), 60)
    });
    const task = new _CleanupDeletedDocumentsTask.default();
    await task.perform({
      limit: 100
    });
    expect(await _models.Document.unscoped().count({
      paranoid: false
    })).toEqual(0);
  });
  it("should destroy draft documents deleted more than 30 days ago", async () => {
    await (0, _factories.buildDocument)({
      publishedAt: undefined,
      deletedAt: (0, _dateFns.subDays)(new Date(), 60)
    });
    const task = new _CleanupDeletedDocumentsTask.default();
    await task.perform({
      limit: 100
    });
    expect(await _models.Document.unscoped().count({
      paranoid: false
    })).toEqual(0);
  });
});