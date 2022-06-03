"use strict";

var _dateFns = require("date-fns");

var _models = require("./../../models");

var _FileOperation = require("./../../models/FileOperation");

var _factories = require("./../../test/factories");

var _support = require("./../../test/support");

var _CleanupExpiredFileOperationsTask = _interopRequireDefault(require("./CleanupExpiredFileOperationsTask"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

beforeEach(() => (0, _support.flushdb)());
describe("CleanupExpiredFileOperationsTask", () => {
  it("should expire exports older than 30 days ago", async () => {
    await (0, _factories.buildFileOperation)({
      type: _FileOperation.FileOperationType.Export,
      state: _FileOperation.FileOperationState.Complete,
      createdAt: (0, _dateFns.subDays)(new Date(), 30)
    });
    await (0, _factories.buildFileOperation)({
      type: _FileOperation.FileOperationType.Export,
      state: _FileOperation.FileOperationState.Complete
    });
    /* This is a test helper that creates a new task and runs it. */

    const task = new _CleanupExpiredFileOperationsTask.default();
    await task.perform({
      limit: 100
    });
    const data = await _models.FileOperation.count({
      where: {
        type: _FileOperation.FileOperationType.Export,
        state: _FileOperation.FileOperationState.Expired
      }
    });
    expect(data).toEqual(1);
  });
  it("should not expire exports made less than 30 days ago", async () => {
    await (0, _factories.buildFileOperation)({
      type: _FileOperation.FileOperationType.Export,
      state: _FileOperation.FileOperationState.Complete,
      createdAt: (0, _dateFns.subDays)(new Date(), 29)
    });
    await (0, _factories.buildFileOperation)({
      type: _FileOperation.FileOperationType.Export,
      state: _FileOperation.FileOperationState.Complete
    });
    const task = new _CleanupExpiredFileOperationsTask.default();
    await task.perform({
      limit: 100
    });
    const data = await _models.FileOperation.count({
      where: {
        type: _FileOperation.FileOperationType.Export,
        state: _FileOperation.FileOperationState.Expired
      }
    });
    expect(data).toEqual(0);
  });
});