"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _authentication = _interopRequireDefault(require("./../../middlewares/authentication"));

var _models = require("./../../models");

var _presenters = require("./../../presenters");

var _validation = require("./../../validation");

var _pagination = _interopRequireDefault(require("./middlewares/pagination"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _koaRouter.default();
router.post("searches.list", (0, _authentication.default)(), (0, _pagination.default)(), async ctx => {
  const {
    user
  } = ctx.state;
  const searches = await _models.SearchQuery.findAll({
    where: {
      userId: user.id
    },
    order: [["createdAt", "DESC"]],
    offset: ctx.state.pagination.offset,
    limit: ctx.state.pagination.limit
  });
  ctx.body = {
    pagination: ctx.state.pagination,
    data: searches.map(_presenters.presentSearchQuery)
  };
});
router.post("searches.delete", (0, _authentication.default)(), async ctx => {
  const {
    id,
    query
  } = ctx.body;
  (0, _validation.assertPresent)(id || query, "id or query is required");
  const {
    user
  } = ctx.state;
  await _models.SearchQuery.destroy({
    where: { ...(id ? {
        id
      } : {
        query
      }),
      userId: user.id
    }
  });
  ctx.body = {
    success: true
  };
});
var _default = router;
exports.default = _default;