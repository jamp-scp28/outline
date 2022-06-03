"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _env = _interopRequireDefault(require("./../../env"));

var _authentication = _interopRequireDefault(require("./../../middlewares/authentication"));

var _models = require("./../../models");

var _policies = require("./../../policies");

var _presenters = require("./../../presenters");

var _validation = require("./../../validation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _koaRouter.default();
router.post("notificationSettings.create", (0, _authentication.default)(), async ctx => {
  const {
    event
  } = ctx.body;
  (0, _validation.assertPresent)(event, "event is required");
  const {
    user
  } = ctx.state;
  (0, _policies.authorize)(user, "createNotificationSetting", user.team);
  const [setting] = await _models.NotificationSetting.findOrCreate({
    where: {
      userId: user.id,
      teamId: user.teamId,
      event
    }
  });
  ctx.body = {
    data: (0, _presenters.presentNotificationSetting)(setting)
  };
});
router.post("notificationSettings.list", (0, _authentication.default)(), async ctx => {
  const {
    user
  } = ctx.state;
  const settings = await _models.NotificationSetting.findAll({
    where: {
      userId: user.id
    }
  });
  ctx.body = {
    data: settings.map(_presenters.presentNotificationSetting)
  };
});
router.post("notificationSettings.delete", (0, _authentication.default)(), async ctx => {
  const {
    id
  } = ctx.body;
  (0, _validation.assertUuid)(id, "id is required");
  const {
    user
  } = ctx.state;
  const setting = await _models.NotificationSetting.findByPk(id);
  (0, _policies.authorize)(user, "delete", setting);
  await setting.destroy();
  ctx.body = {
    success: true
  };
});
router.post("notificationSettings.unsubscribe", async ctx => {
  const {
    id,
    token
  } = ctx.body;
  (0, _validation.assertUuid)(id, "id is required");
  (0, _validation.assertPresent)(token, "token is required");
  const setting = await _models.NotificationSetting.findByPk(id, {
    include: [{
      model: _models.Team,
      required: true,
      as: "team"
    }]
  });

  if (setting && setting.unsubscribeToken === token) {
    await setting.destroy();
    ctx.redirect(`${setting.team.url}/settings/notifications?success`);
    return;
  }

  ctx.redirect(`${_env.default.URL}?notice=invalid-auth`);
});
var _default = router;
exports.default = _default;