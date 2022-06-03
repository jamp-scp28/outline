"use strict";

var _models = require("./../models");

var _cancan = require("./cancan");

(0, _cancan.allow)(_models.User, "createNotificationSetting", _models.Team, (user, team) => {
  if (!team || user.teamId !== team.id) {
    return false;
  }

  return true;
});
(0, _cancan.allow)(_models.User, ["read", "update", "delete"], _models.NotificationSetting, (user, setting) => user && user.id === (setting === null || setting === void 0 ? void 0 : setting.userId));