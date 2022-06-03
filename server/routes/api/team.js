"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _teamUpdater = _interopRequireDefault(require("./../../commands/teamUpdater"));

var _authentication = _interopRequireDefault(require("./../../middlewares/authentication"));

var _models = require("./../../models");

var _policies = require("./../../policies");

var _presenters = require("./../../presenters");

var _validation = require("./../../validation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _koaRouter.default();
router.post("team.update", (0, _authentication.default)(), async ctx => {
  const {
    name,
    avatarUrl,
    subdomain,
    sharing,
    guestSignin,
    documentEmbeds,
    memberCollectionCreate,
    collaborativeEditing,
    defaultCollectionId,
    defaultUserRole,
    inviteRequired,
    allowedDomains
  } = ctx.body;
  const {
    user
  } = ctx.state;
  const team = await _models.Team.findByPk(user.teamId, {
    include: [{
      model: _models.TeamDomain
    }]
  });
  (0, _policies.authorize)(user, "update", team);

  if (defaultCollectionId !== undefined && defaultCollectionId !== null) {
    (0, _validation.assertUuid)(defaultCollectionId, "defaultCollectionId must be uuid");
  }

  const updatedTeam = await (0, _teamUpdater.default)({
    params: {
      name,
      avatarUrl,
      subdomain,
      sharing,
      guestSignin,
      documentEmbeds,
      memberCollectionCreate,
      collaborativeEditing,
      defaultCollectionId,
      defaultUserRole,
      inviteRequired,
      allowedDomains
    },
    user,
    team,
    ip: ctx.request.ip
  });
  ctx.body = {
    data: (0, _presenters.presentTeam)(updatedTeam),
    policies: (0, _presenters.presentPolicies)(user, [updatedTeam])
  };
});
var _default = router;
exports.default = _default;