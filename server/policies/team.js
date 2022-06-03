"use strict";

var _models = require("./../models");

var _cancan = require("./cancan");

(0, _cancan.allow)(_models.User, "read", _models.Team, (user, team) => user.teamId === (team === null || team === void 0 ? void 0 : team.id));
(0, _cancan.allow)(_models.User, "share", _models.Team, (user, team) => {
  if (!team || user.isViewer || user.teamId !== team.id) {
    return false;
  }

  return team.sharing;
});
(0, _cancan.allow)(_models.User, ["update", "export", "manage"], _models.Team, (user, team) => {
  if (!team || user.isViewer || user.teamId !== team.id) {
    return false;
  }

  return user.isAdmin;
});