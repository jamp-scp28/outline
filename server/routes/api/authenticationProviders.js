"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _authentication = _interopRequireDefault(require("./../../middlewares/authentication"));

var _models = require("./../../models");

var _policies = require("./../../policies");

var _presenters = require("./../../presenters");

var _validation = require("./../../validation");

var _providers = _interopRequireDefault(require("../auth/providers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _koaRouter.default();
router.post("authenticationProviders.info", (0, _authentication.default)(), async ctx => {
  const {
    id
  } = ctx.body;
  (0, _validation.assertUuid)(id, "id is required");
  const {
    user
  } = ctx.state;
  const authenticationProvider = await _models.AuthenticationProvider.findByPk(id);
  (0, _policies.authorize)(user, "read", authenticationProvider);
  ctx.body = {
    data: (0, _presenters.presentAuthenticationProvider)(authenticationProvider),
    policies: (0, _presenters.presentPolicies)(user, [authenticationProvider])
  };
});
router.post("authenticationProviders.update", (0, _authentication.default)(), async ctx => {
  const {
    id,
    isEnabled
  } = ctx.body;
  (0, _validation.assertUuid)(id, "id is required");
  (0, _validation.assertPresent)(isEnabled, "isEnabled is required");
  const {
    user
  } = ctx.state;
  const authenticationProvider = await _models.AuthenticationProvider.findByPk(id);
  (0, _policies.authorize)(user, "update", authenticationProvider);
  const enabled = !!isEnabled;

  if (enabled) {
    await authenticationProvider.enable();
  } else {
    await authenticationProvider.disable();
  }

  await _models.Event.create({
    name: "authenticationProviders.update",
    data: {
      enabled
    },
    modelId: id,
    teamId: user.teamId,
    actorId: user.id,
    ip: ctx.request.ip
  });
  ctx.body = {
    data: (0, _presenters.presentAuthenticationProvider)(authenticationProvider),
    policies: (0, _presenters.presentPolicies)(user, [authenticationProvider])
  };
});
router.post("authenticationProviders.list", (0, _authentication.default)(), async ctx => {
  const {
    user
  } = ctx.state;
  (0, _policies.authorize)(user, "read", user.team);
  const teamAuthenticationProviders = await user.team.$get("authenticationProviders");

  const otherAuthenticationProviders = _providers.default.filter(p => // @ts-expect-error ts-migrate(7006) FIXME: Parameter 't' implicitly has an 'any' type.
  !teamAuthenticationProviders.find(t => t.name === p.id) && p.enabled && // email auth is dealt with separetly right now, although it definitely
  // wants to be here in the future – we'll need to migrate more data though
  p.id !== "email");

  ctx.body = {
    data: {
      authenticationProviders: [...teamAuthenticationProviders.map(_presenters.presentAuthenticationProvider), ...otherAuthenticationProviders.map(p => ({
        name: p.id,
        isEnabled: false,
        isConnected: false
      }))]
    }
  };
});
var _default = router;
exports.default = _default;