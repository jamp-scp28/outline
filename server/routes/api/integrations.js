"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _authentication = _interopRequireDefault(require("./../../middlewares/authentication"));

var _models = require("./../../models");

var _Integration = _interopRequireDefault(require("./../../models/Integration"));

var _policies = require("./../../policies");

var _presenters = require("./../../presenters");

var _validation = require("./../../validation");

var _pagination = _interopRequireDefault(require("./middlewares/pagination"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _koaRouter.default();
router.post("integrations.list", (0, _authentication.default)(), (0, _pagination.default)(), async ctx => {
  let {
    direction
  } = ctx.body;
  const {
    sort = "updatedAt"
  } = ctx.body;

  if (direction !== "ASC") {
    direction = "DESC";
  }

  (0, _validation.assertSort)(sort, _Integration.default);
  const {
    user
  } = ctx.state;
  const integrations = await _Integration.default.findAll({
    where: {
      teamId: user.teamId
    },
    order: [[sort, direction]],
    offset: ctx.state.pagination.offset,
    limit: ctx.state.pagination.limit
  });
  ctx.body = {
    pagination: ctx.state.pagination,
    data: integrations.map(_presenters.presentIntegration)
  };
});
router.post("integrations.update", (0, _authentication.default)(), async ctx => {
  const {
    id,
    events
  } = ctx.body;
  (0, _validation.assertUuid)(id, "id is required");
  const {
    user
  } = ctx.state;
  const integration = await _Integration.default.findByPk(id);
  (0, _policies.authorize)(user, "update", integration);
  (0, _validation.assertArray)(events, "events must be an array");

  if (integration.type === "post") {
    integration.events = events.filter(event => ["documents.update", "documents.publish"].includes(event));
  }

  await integration.save();
  ctx.body = {
    data: (0, _presenters.presentIntegration)(integration)
  };
});
router.post("integrations.delete", (0, _authentication.default)(), async ctx => {
  const {
    id
  } = ctx.body;
  (0, _validation.assertUuid)(id, "id is required");
  const {
    user
  } = ctx.state;
  const integration = await _Integration.default.findByPk(id);
  (0, _policies.authorize)(user, "delete", integration);
  await integration.destroy();
  await _models.Event.create({
    name: "integrations.delete",
    modelId: integration.id,
    teamId: integration.teamId,
    actorId: user.id,
    ip: ctx.request.ip
  });
  ctx.body = {
    success: true
  };
});
var _default = router;
exports.default = _default;