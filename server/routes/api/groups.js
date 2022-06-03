"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _invariant = _interopRequireDefault(require("invariant"));

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _sequelize = require("sequelize");

var _constants = require("./../../../shared/constants");

var _authentication = _interopRequireDefault(require("./../../middlewares/authentication"));

var _models = require("./../../models");

var _policies = require("./../../policies");

var _presenters = require("./../../presenters");

var _validation = require("./../../validation");

var _pagination = _interopRequireDefault(require("./middlewares/pagination"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _koaRouter.default();
router.post("groups.list", (0, _authentication.default)(), (0, _pagination.default)(), async ctx => {
  let {
    direction
  } = ctx.body;
  const {
    sort = "updatedAt"
  } = ctx.body;

  if (direction !== "ASC") {
    direction = "DESC";
  }

  (0, _validation.assertSort)(sort, _models.Group);
  const {
    user
  } = ctx.state;
  const groups = await _models.Group.findAll({
    where: {
      teamId: user.teamId
    },
    order: [[sort, direction]],
    offset: ctx.state.pagination.offset,
    limit: ctx.state.pagination.limit
  });
  ctx.body = {
    pagination: ctx.state.pagination,
    data: {
      groups: groups.map(_presenters.presentGroup),
      groupMemberships: groups.map(g => g.groupMemberships.filter(membership => !!membership.user).slice(0, _constants.MAX_AVATAR_DISPLAY)).flat().map(_presenters.presentGroupMembership)
    },
    policies: (0, _presenters.presentPolicies)(user, groups)
  };
});
router.post("groups.info", (0, _authentication.default)(), async ctx => {
  const {
    id
  } = ctx.body;
  (0, _validation.assertUuid)(id, "id is required");
  const {
    user
  } = ctx.state;
  const group = await _models.Group.findByPk(id);
  (0, _policies.authorize)(user, "read", group);
  ctx.body = {
    data: (0, _presenters.presentGroup)(group),
    policies: (0, _presenters.presentPolicies)(user, [group])
  };
});
router.post("groups.create", (0, _authentication.default)(), async ctx => {
  const {
    name
  } = ctx.body;
  (0, _validation.assertPresent)(name, "name is required");
  const {
    user
  } = ctx.state;
  (0, _policies.authorize)(user, "createGroup", user.team);
  const g = await _models.Group.create({
    name,
    teamId: user.teamId,
    createdById: user.id
  }); // reload to get default scope

  const group = await _models.Group.findByPk(g.id);
  (0, _invariant.default)(group, "group not found");
  await _models.Event.create({
    name: "groups.create",
    actorId: user.id,
    teamId: user.teamId,
    modelId: group.id,
    data: {
      name: group.name
    },
    ip: ctx.request.ip
  });
  ctx.body = {
    data: (0, _presenters.presentGroup)(group),
    policies: (0, _presenters.presentPolicies)(user, [group])
  };
});
router.post("groups.update", (0, _authentication.default)(), async ctx => {
  const {
    id,
    name
  } = ctx.body;
  (0, _validation.assertPresent)(name, "name is required");
  (0, _validation.assertUuid)(id, "id is required");
  const {
    user
  } = ctx.state;
  const group = await _models.Group.findByPk(id);
  (0, _policies.authorize)(user, "update", group);
  group.name = name;

  if (group.changed()) {
    await group.save();
    await _models.Event.create({
      name: "groups.update",
      teamId: user.teamId,
      actorId: user.id,
      modelId: group.id,
      data: {
        name
      },
      ip: ctx.request.ip
    });
  }

  ctx.body = {
    data: (0, _presenters.presentGroup)(group),
    policies: (0, _presenters.presentPolicies)(user, [group])
  };
});
router.post("groups.delete", (0, _authentication.default)(), async ctx => {
  const {
    id
  } = ctx.body;
  (0, _validation.assertUuid)(id, "id is required");
  const {
    user
  } = ctx.state;
  const group = await _models.Group.findByPk(id);
  (0, _policies.authorize)(user, "delete", group);
  await group.destroy();
  await _models.Event.create({
    name: "groups.delete",
    actorId: user.id,
    modelId: group.id,
    teamId: group.teamId,
    data: {
      name: group.name
    },
    ip: ctx.request.ip
  });
  ctx.body = {
    success: true
  };
});
router.post("groups.memberships", (0, _authentication.default)(), (0, _pagination.default)(), async ctx => {
  const {
    id,
    query
  } = ctx.body;
  (0, _validation.assertUuid)(id, "id is required");
  const {
    user
  } = ctx.state;
  const group = await _models.Group.findByPk(id);
  (0, _policies.authorize)(user, "read", group);
  let userWhere;

  if (query) {
    userWhere = {
      name: {
        [_sequelize.Op.iLike]: `%${query}%`
      }
    };
  }

  const memberships = await _models.GroupUser.findAll({
    where: {
      groupId: id
    },
    order: [["createdAt", "DESC"]],
    offset: ctx.state.pagination.offset,
    limit: ctx.state.pagination.limit,
    include: [{
      model: _models.User,
      as: "user",
      where: userWhere,
      required: true
    }]
  });
  ctx.body = {
    pagination: ctx.state.pagination,
    data: {
      groupMemberships: memberships.map(_presenters.presentGroupMembership),
      users: memberships.map(membership => (0, _presenters.presentUser)(membership.user))
    }
  };
});
router.post("groups.add_user", (0, _authentication.default)(), async ctx => {
  const {
    id,
    userId
  } = ctx.body;
  (0, _validation.assertUuid)(id, "id is required");
  (0, _validation.assertUuid)(userId, "userId is required");
  const user = await _models.User.findByPk(userId);
  (0, _policies.authorize)(ctx.state.user, "read", user);
  let group = await _models.Group.findByPk(id);
  (0, _policies.authorize)(ctx.state.user, "update", group);
  let membership = await _models.GroupUser.findOne({
    where: {
      groupId: id,
      userId
    }
  });

  if (!membership) {
    await group.$add("user", user, {
      through: {
        createdById: ctx.state.user.id
      }
    }); // reload to get default scope

    membership = await _models.GroupUser.findOne({
      where: {
        groupId: id,
        userId
      }
    });
    (0, _invariant.default)(membership, "membership not found"); // reload to get default scope

    group = await _models.Group.findByPk(id);
    (0, _invariant.default)(group, "group not found");
    await _models.Event.create({
      name: "groups.add_user",
      userId,
      teamId: user.teamId,
      modelId: group.id,
      actorId: ctx.state.user.id,
      data: {
        name: user.name
      },
      ip: ctx.request.ip
    });
  }

  ctx.body = {
    data: {
      users: [(0, _presenters.presentUser)(user)],
      groupMemberships: [(0, _presenters.presentGroupMembership)(membership)],
      groups: [(0, _presenters.presentGroup)(group)]
    }
  };
});
router.post("groups.remove_user", (0, _authentication.default)(), async ctx => {
  const {
    id,
    userId
  } = ctx.body;
  (0, _validation.assertUuid)(id, "id is required");
  (0, _validation.assertUuid)(userId, "userId is required");
  let group = await _models.Group.findByPk(id);
  (0, _policies.authorize)(ctx.state.user, "update", group);
  const user = await _models.User.findByPk(userId);
  (0, _policies.authorize)(ctx.state.user, "read", user);
  await group.$remove("user", user);
  await _models.Event.create({
    name: "groups.remove_user",
    userId,
    modelId: group.id,
    teamId: user.teamId,
    actorId: ctx.state.user.id,
    data: {
      name: user.name
    },
    ip: ctx.request.ip
  }); // reload to get default scope

  group = await _models.Group.findByPk(id);
  (0, _invariant.default)(group, "group not found");
  ctx.body = {
    data: {
      groups: [(0, _presenters.presentGroup)(group)]
    }
  };
});
var _default = router;
exports.default = _default;