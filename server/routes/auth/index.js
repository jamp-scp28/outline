"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _koaPassport = _interopRequireDefault(require("@outlinewiki/koa-passport"));

var _dateFns = require("date-fns");

var _koa = _interopRequireDefault(require("koa"));

var _koaBody = _interopRequireDefault(require("koa-body"));

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _errors = require("./../../errors");

var _authentication = _interopRequireDefault(require("./../../middlewares/authentication"));

var _models = require("./../../models");

var _providers = _interopRequireDefault(require("./providers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = new _koa.default();
const router = new _koaRouter.default();
router.use(_koaPassport.default.initialize()); // dynamically load available authentication provider routes

_providers.default.forEach(provider => {
  if (provider.enabled) {
    router.use("/", provider.router.routes());
  }
});

router.get("/redirect", (0, _authentication.default)(), async ctx => {
  const {
    user
  } = ctx.state;
  const jwtToken = user.getJwtToken();

  if (jwtToken === ctx.params.token) {
    throw (0, _errors.AuthenticationError)("Cannot extend token");
  } // ensure that the lastActiveAt on user is updated to prevent replay requests


  await user.updateActiveAt(ctx.request.ip, true);
  ctx.cookies.set("accessToken", jwtToken, {
    httpOnly: false,
    expires: (0, _dateFns.addMonths)(new Date(), 3)
  });
  const [team, collection, view] = await Promise.all([_models.Team.findByPk(user.teamId), _models.Collection.findFirstCollectionForUser(user), _models.View.findOne({
    where: {
      userId: user.id
    }
  })]);
  const defaultCollectionId = team === null || team === void 0 ? void 0 : team.defaultCollectionId;

  if (defaultCollectionId) {
    const collection = await _models.Collection.findOne({
      where: {
        id: defaultCollectionId,
        teamId: team.id
      }
    });

    if (collection) {
      ctx.redirect(`${team.url}${collection.url}`);
      return;
    }
  }

  const hasViewedDocuments = !!view;
  ctx.redirect(!hasViewedDocuments && collection ? `${team === null || team === void 0 ? void 0 : team.url}${collection.url}` : `${team === null || team === void 0 ? void 0 : team.url}/home`);
});
app.use((0, _koaBody.default)());
app.use(router.routes());
var _default = app;
exports.default = _default;