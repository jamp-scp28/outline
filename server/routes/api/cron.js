"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _env = _interopRequireDefault(require("./../../env"));

var _errors = require("./../../errors");

var _CleanupDeletedDocumentsTask = _interopRequireDefault(require("./../../queues/tasks/CleanupDeletedDocumentsTask"));

var _CleanupDeletedTeamsTask = _interopRequireDefault(require("./../../queues/tasks/CleanupDeletedTeamsTask"));

var _CleanupExpiredFileOperationsTask = _interopRequireDefault(require("./../../queues/tasks/CleanupExpiredFileOperationsTask"));

var _InviteReminderTask = _interopRequireDefault(require("./../../queues/tasks/InviteReminderTask"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _koaRouter.default();

const cronHandler = async ctx => {
  const {
    token,
    limit = 500
  } = ctx.body;

  if (_env.default.UTILS_SECRET !== token) {
    throw (0, _errors.AuthenticationError)("Invalid secret token");
  }

  await _CleanupDeletedDocumentsTask.default.schedule({
    limit
  });
  await _CleanupExpiredFileOperationsTask.default.schedule({
    limit
  });
  await _CleanupDeletedTeamsTask.default.schedule({
    limit
  });
  await _InviteReminderTask.default.schedule();
  ctx.body = {
    success: true
  };
};

router.post("cron.:period", cronHandler); // For backwards compatibility

router.post("utils.gc", cronHandler);
var _default = router;
exports.default = _default;