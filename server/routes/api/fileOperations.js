"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _invariant = _interopRequireDefault(require("invariant"));

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _fileOperationDeleter = _interopRequireDefault(require("./../../commands/fileOperationDeleter"));

var _errors = require("./../../errors");

var _authentication = _interopRequireDefault(require("./../../middlewares/authentication"));

var _models = require("./../../models");

var _policies = require("./../../policies");

var _presenters = require("./../../presenters");

var _s = require("./../../utils/s3");

var _validation = require("./../../validation");

var _pagination = _interopRequireDefault(require("./middlewares/pagination"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _koaRouter.default();
router.post("fileOperations.info", (0, _authentication.default)(), async ctx => {
  const {
    id
  } = ctx.body;
  (0, _validation.assertUuid)(id, "id is required");
  const {
    user
  } = ctx.state;
  const team = await _models.Team.findByPk(user.teamId);
  const fileOperation = await _models.FileOperation.findByPk(id);
  (0, _invariant.default)(fileOperation, "File operation not found");
  (0, _policies.authorize)(user, fileOperation.type, team);

  if (!fileOperation) {
    throw (0, _errors.NotFoundError)();
  }

  ctx.body = {
    data: (0, _presenters.presentFileOperation)(fileOperation)
  };
});
router.post("fileOperations.list", (0, _authentication.default)(), (0, _pagination.default)(), async ctx => {
  let {
    direction
  } = ctx.body;
  const {
    sort = "createdAt",
    type
  } = ctx.body;
  (0, _validation.assertPresent)(type, "type is required");
  (0, _validation.assertIn)(type, ["import", "export"], "type must be one of 'import' or 'export'");

  if (direction !== "ASC") {
    direction = "DESC";
  }

  const {
    user
  } = ctx.state;
  const where = {
    teamId: user.teamId,
    type
  };
  const team = await _models.Team.findByPk(user.teamId);
  (0, _policies.authorize)(user, type, team);
  const [exports, total] = await Promise.all([await _models.FileOperation.findAll({
    where,
    order: [[sort, direction]],
    offset: ctx.state.pagination.offset,
    limit: ctx.state.pagination.limit
  }), await _models.FileOperation.count({
    where
  })]);
  ctx.body = {
    pagination: { ...ctx.state.pagination,
      total
    },
    data: exports.map(_presenters.presentFileOperation)
  };
});
router.post("fileOperations.redirect", (0, _authentication.default)(), async ctx => {
  const {
    id
  } = ctx.body;
  (0, _validation.assertUuid)(id, "id is required");
  const {
    user
  } = ctx.state;
  const team = await _models.Team.findByPk(user.teamId);
  const fileOp = await _models.FileOperation.unscoped().findByPk(id);

  if (!fileOp) {
    throw (0, _errors.NotFoundError)();
  }

  (0, _policies.authorize)(user, fileOp.type, team);

  if (fileOp.state !== "complete") {
    throw (0, _errors.ValidationError)(`${fileOp.type} is not complete yet`);
  }

  const accessUrl = await (0, _s.getSignedUrl)(fileOp.key);
  ctx.redirect(accessUrl);
});
router.post("fileOperations.delete", (0, _authentication.default)(), async ctx => {
  const {
    id
  } = ctx.body;
  (0, _validation.assertUuid)(id, "id is required");
  const {
    user
  } = ctx.state;
  const team = await _models.Team.findByPk(user.teamId);
  const fileOp = await _models.FileOperation.findByPk(id);

  if (!fileOp) {
    throw (0, _errors.NotFoundError)();
  }

  (0, _policies.authorize)(user, fileOp.type, team);
  await (0, _fileOperationDeleter.default)(fileOp, user, ctx.request.ip);
  ctx.body = {
    success: true
  };
});
var _default = router;
exports.default = _default;