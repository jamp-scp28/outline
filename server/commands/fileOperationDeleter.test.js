"use strict";

var _models = require("./../models");

var _factories = require("./../test/factories");

var _support = require("./../test/support");

var _fileOperationDeleter = _interopRequireDefault(require("./fileOperationDeleter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

beforeEach(() => (0, _support.flushdb)());
describe("fileOperationDeleter", () => {
  const ip = "127.0.0.1";
  it("should destroy file operation", async () => {
    const admin = await (0, _factories.buildAdmin)();
    const fileOp = await (0, _factories.buildFileOperation)({
      userId: admin.id,
      teamId: admin.teamId
    });
    await (0, _fileOperationDeleter.default)(fileOp, admin, ip);
    expect(await _models.FileOperation.count()).toEqual(0);
  });
});