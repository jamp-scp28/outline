"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fractionalIndex = _interopRequireDefault(require("fractional-index"));

var _invariant = _interopRequireDefault(require("invariant"));

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _sequelize = require("sequelize");

var _collectionExporter = _interopRequireDefault(require("./../../commands/collectionExporter"));

var _teamUpdater = _interopRequireDefault(require("./../../commands/teamUpdater"));

var _sequelize2 = require("./../../database/sequelize");

var _errors = require("./../../errors");

var _authentication = _interopRequireDefault(require("./../../middlewares/authentication"));

var _models = require("./../../models");

var _FileOperation = require("./../../models/FileOperation");

var _policies = require("./../../policies");

var _presenters = require("./../../presenters");

var _indexing = require("./../../utils/indexing");

var _removeIndexCollision = _interopRequireDefault(require("./../../utils/removeIndexCollision"));

var _validation = require("./../../validation");

var _pagination = _interopRequireDefault(require("./middlewares/pagination"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _koaRouter.default();
router.post("collections.create", (0, _authentication.default)(), async ctx => {
  const {
    name,
    color,
    description,
    permission,
    sharing,
    icon,
    sort = _models.Collection.DEFAULT_SORT
  } = ctx.body;
  let {
    index
  } = ctx.body;
  (0, _validation.assertPresent)(name, "name is required");

  if (color) {
    (0, _validation.assertHexColor)(color, "Invalid hex value (please use format #FFFFFF)");
  }

  const {
    user
  } = ctx.state;
  (0, _policies.authorize)(user, "createCollection", user.team);

  if (index) {
    (0, _validation.assertIndexCharacters)(index);
  } else {
    const collections = await _models.Collection.findAll({
      where: {
        teamId: user.teamId,
        deletedAt: null
      },
      attributes: ["id", "index", "updatedAt"],
      limit: 1,
      order: [// using LC_COLLATE:"C" because we need byte order to drive the sorting
      _sequelize.Sequelize.literal('"collection"."index" collate "C"'), ["updatedAt", "DESC"]]
    });
    index = (0, _fractionalIndex.default)(null, collections.length ? collections[0].index : null);
  }

  index = await (0, _removeIndexCollision.default)(user.teamId, index);
  const collection = await _models.Collection.create({
    name,
    description,
    icon,
    color,
    teamId: user.teamId,
    createdById: user.id,
    permission: permission ? permission : null,
    sharing,
    sort,
    index
  });
  await _models.Event.create({
    name: "collections.create",
    collectionId: collection.id,
    teamId: collection.teamId,
    actorId: user.id,
    data: {
      name
    },
    ip: ctx.request.ip
  }); // we must reload the collection to get memberships for policy presenter

  const reloaded = await _models.Collection.scope({
    method: ["withMembership", user.id]
  }).findByPk(collection.id);
  (0, _invariant.default)(reloaded, "collection not found");
  ctx.body = {
    data: (0, _presenters.presentCollection)(reloaded),
    policies: (0, _presenters.presentPolicies)(user, [reloaded])
  };
});
router.post("collections.info", (0, _authentication.default)(), async ctx => {
  const {
    id
  } = ctx.body;
  (0, _validation.assertPresent)(id, "id is required");
  const {
    user
  } = ctx.state;
  const collection = await _models.Collection.scope({
    method: ["withMembership", user.id]
  }).findByPk(id);
  (0, _policies.authorize)(user, "read", collection);
  ctx.body = {
    data: (0, _presenters.presentCollection)(collection),
    policies: (0, _presenters.presentPolicies)(user, [collection])
  };
});
router.post("collections.import", (0, _authentication.default)(), async ctx => {
  const {
    attachmentId,
    format = _FileOperation.FileOperationFormat.MarkdownZip
  } = ctx.body;
  (0, _validation.assertUuid)(attachmentId, "attachmentId is required");
  const {
    user
  } = ctx.state;
  (0, _policies.authorize)(user, "importCollection", user.team);
  const attachment = await _models.Attachment.findByPk(attachmentId);
  (0, _policies.authorize)(user, "read", attachment);
  (0, _validation.assertIn)(format, Object.values(_FileOperation.FileOperationFormat), "Invalid format");
  await _sequelize2.sequelize.transaction(async transaction => {
    const fileOperation = await _models.FileOperation.create({
      type: _FileOperation.FileOperationType.Import,
      state: _FileOperation.FileOperationState.Creating,
      format,
      size: attachment.size,
      key: attachment.key,
      userId: user.id,
      teamId: user.teamId
    }, {
      transaction
    });
    await _models.Event.create({
      name: "fileOperations.create",
      teamId: user.teamId,
      actorId: user.id,
      modelId: fileOperation.id,
      data: {
        type: _FileOperation.FileOperationType.Import
      }
    }, {
      transaction
    });
  });
  ctx.body = {
    success: true
  };
});
router.post("collections.add_group", (0, _authentication.default)(), async ctx => {
  const {
    id,
    groupId,
    permission = "read_write"
  } = ctx.body;
  (0, _validation.assertUuid)(id, "id is required");
  (0, _validation.assertUuid)(groupId, "groupId is required");
  const collection = await _models.Collection.scope({
    method: ["withMembership", ctx.state.user.id]
  }).findByPk(id);
  (0, _policies.authorize)(ctx.state.user, "update", collection);
  const group = await _models.Group.findByPk(groupId);
  (0, _policies.authorize)(ctx.state.user, "read", group);
  let membership = await _models.CollectionGroup.findOne({
    where: {
      collectionId: id,
      groupId
    }
  });

  if (!membership) {
    membership = await _models.CollectionGroup.create({
      collectionId: id,
      groupId,
      permission,
      createdById: ctx.state.user.id
    });
  } else if (permission) {
    membership.permission = permission;
    await membership.save();
  }

  await _models.Event.create({
    name: "collections.add_group",
    collectionId: collection.id,
    teamId: collection.teamId,
    actorId: ctx.state.user.id,
    modelId: groupId,
    data: {
      name: group.name
    },
    ip: ctx.request.ip
  });
  ctx.body = {
    data: {
      collectionGroupMemberships: [(0, _presenters.presentCollectionGroupMembership)(membership)]
    }
  };
});
router.post("collections.remove_group", (0, _authentication.default)(), async ctx => {
  const {
    id,
    groupId
  } = ctx.body;
  (0, _validation.assertUuid)(id, "id is required");
  (0, _validation.assertUuid)(groupId, "groupId is required");
  const collection = await _models.Collection.scope({
    method: ["withMembership", ctx.state.user.id]
  }).findByPk(id);
  (0, _policies.authorize)(ctx.state.user, "update", collection);
  const group = await _models.Group.findByPk(groupId);
  (0, _policies.authorize)(ctx.state.user, "read", group);
  await collection.$remove("group", group);
  await _models.Event.create({
    name: "collections.remove_group",
    collectionId: collection.id,
    teamId: collection.teamId,
    actorId: ctx.state.user.id,
    modelId: groupId,
    data: {
      name: group.name
    },
    ip: ctx.request.ip
  });
  ctx.body = {
    success: true
  };
});
router.post("collections.group_memberships", (0, _authentication.default)(), (0, _pagination.default)(), async ctx => {
  const {
    id,
    query,
    permission
  } = ctx.body;
  (0, _validation.assertUuid)(id, "id is required");
  const {
    user
  } = ctx.state;
  const collection = await _models.Collection.scope({
    method: ["withMembership", user.id]
  }).findByPk(id);
  (0, _policies.authorize)(user, "read", collection);
  let where = {
    collectionId: id
  };
  let groupWhere;

  if (query) {
    groupWhere = {
      name: {
        [_sequelize.Op.iLike]: `%${query}%`
      }
    };
  }

  if (permission) {
    where = { ...where,
      permission
    };
  }

  const memberships = await _models.CollectionGroup.findAll({
    where,
    order: [["createdAt", "DESC"]],
    offset: ctx.state.pagination.offset,
    limit: ctx.state.pagination.limit,
    include: [{
      model: _models.Group,
      as: "group",
      where: groupWhere,
      required: true
    }]
  });
  ctx.body = {
    pagination: ctx.state.pagination,
    data: {
      collectionGroupMemberships: memberships.map(_presenters.presentCollectionGroupMembership),
      groups: memberships.map(membership => (0, _presenters.presentGroup)(membership.group))
    }
  };
});
router.post("collections.add_user", (0, _authentication.default)(), async ctx => {
  const {
    id,
    userId,
    permission = "read_write"
  } = ctx.body;
  (0, _validation.assertUuid)(id, "id is required");
  (0, _validation.assertUuid)(userId, "userId is required");
  const collection = await _models.Collection.scope({
    method: ["withMembership", ctx.state.user.id]
  }).findByPk(id);
  (0, _policies.authorize)(ctx.state.user, "update", collection);
  const user = await _models.User.findByPk(userId);
  (0, _policies.authorize)(ctx.state.user, "read", user);
  let membership = await _models.CollectionUser.findOne({
    where: {
      collectionId: id,
      userId
    }
  });

  if (!membership) {
    membership = await _models.CollectionUser.create({
      collectionId: id,
      userId,
      permission,
      createdById: ctx.state.user.id
    });
  } else if (permission) {
    membership.permission = permission;
    await membership.save();
  }

  await _models.Event.create({
    name: "collections.add_user",
    userId,
    collectionId: collection.id,
    teamId: collection.teamId,
    actorId: ctx.state.user.id,
    data: {
      name: user.name
    },
    ip: ctx.request.ip
  });
  ctx.body = {
    data: {
      users: [(0, _presenters.presentUser)(user)],
      memberships: [(0, _presenters.presentMembership)(membership)]
    }
  };
});
router.post("collections.remove_user", (0, _authentication.default)(), async ctx => {
  const {
    id,
    userId
  } = ctx.body;
  (0, _validation.assertUuid)(id, "id is required");
  (0, _validation.assertUuid)(userId, "userId is required");
  const collection = await _models.Collection.scope({
    method: ["withMembership", ctx.state.user.id]
  }).findByPk(id);
  (0, _policies.authorize)(ctx.state.user, "update", collection);
  const user = await _models.User.findByPk(userId);
  (0, _policies.authorize)(ctx.state.user, "read", user);
  await collection.$remove("user", user);
  await _models.Event.create({
    name: "collections.remove_user",
    userId,
    collectionId: collection.id,
    teamId: collection.teamId,
    actorId: ctx.state.user.id,
    data: {
      name: user.name
    },
    ip: ctx.request.ip
  });
  ctx.body = {
    success: true
  };
}); // DEPRECATED: Use collection.memberships which has pagination, filtering and permissions

router.post("collections.users", (0, _authentication.default)(), async ctx => {
  const {
    id
  } = ctx.body;
  (0, _validation.assertUuid)(id, "id is required");
  const {
    user
  } = ctx.state;
  const collection = await _models.Collection.scope({
    method: ["withMembership", user.id]
  }).findByPk(id);
  (0, _policies.authorize)(user, "read", collection);
  const users = await collection.$get("users");
  ctx.body = {
    data: users.map(user => (0, _presenters.presentUser)(user))
  };
});
router.post("collections.memberships", (0, _authentication.default)(), (0, _pagination.default)(), async ctx => {
  const {
    id,
    query,
    permission
  } = ctx.body;
  (0, _validation.assertUuid)(id, "id is required");
  const {
    user
  } = ctx.state;
  const collection = await _models.Collection.scope({
    method: ["withMembership", user.id]
  }).findByPk(id);
  (0, _policies.authorize)(user, "read", collection);
  let where = {
    collectionId: id
  };
  let userWhere;

  if (query) {
    userWhere = {
      name: {
        [_sequelize.Op.iLike]: `%${query}%`
      }
    };
  }

  if (permission) {
    where = { ...where,
      permission
    };
  }

  const memberships = await _models.CollectionUser.findAll({
    where,
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
      memberships: memberships.map(_presenters.presentMembership),
      users: memberships.map(membership => (0, _presenters.presentUser)(membership.user))
    }
  };
});
router.post("collections.export", (0, _authentication.default)(), async ctx => {
  const {
    id
  } = ctx.body;
  (0, _validation.assertUuid)(id, "id is required");
  const {
    user
  } = ctx.state;
  const team = await _models.Team.findByPk(user.teamId);
  (0, _policies.authorize)(user, "export", team);
  const collection = await _models.Collection.scope({
    method: ["withMembership", user.id]
  }).findByPk(id);
  (0, _policies.authorize)(user, "read", collection);
  const fileOperation = await _sequelize2.sequelize.transaction(async transaction => {
    return (0, _collectionExporter.default)({
      collection,
      user,
      team,
      ip: ctx.request.ip,
      transaction
    });
  });
  ctx.body = {
    success: true,
    data: {
      fileOperation: (0, _presenters.presentFileOperation)(fileOperation)
    }
  };
});
router.post("collections.export_all", (0, _authentication.default)(), async ctx => {
  const {
    user
  } = ctx.state;
  const team = await _models.Team.findByPk(user.teamId);
  (0, _policies.authorize)(user, "export", team);
  const fileOperation = await _sequelize2.sequelize.transaction(async transaction => {
    return (0, _collectionExporter.default)({
      user,
      team,
      ip: ctx.request.ip,
      transaction
    });
  });
  ctx.body = {
    success: true,
    data: {
      fileOperation: (0, _presenters.presentFileOperation)(fileOperation)
    }
  };
});
router.post("collections.update", (0, _authentication.default)(), async ctx => {
  const {
    id,
    name,
    description,
    icon,
    permission,
    color,
    sort,
    sharing
  } = ctx.body;

  if (color) {
    (0, _validation.assertHexColor)(color, "Invalid hex value (please use format #FFFFFF)");
  }

  const {
    user
  } = ctx.state;
  const collection = await _models.Collection.scope({
    method: ["withMembership", user.id]
  }).findByPk(id);
  (0, _policies.authorize)(user, "update", collection); // we're making this collection have no default access, ensure that the current
  // user has a read-write membership so that at least they can edit it

  if (permission !== "read_write" && collection.permission === "read_write") {
    await _models.CollectionUser.findOrCreate({
      where: {
        collectionId: collection.id,
        userId: user.id
      },
      defaults: {
        permission: "read_write",
        createdById: user.id
      }
    });
  }

  let privacyChanged = false;
  let sharingChanged = false;

  if (name !== undefined) {
    collection.name = name.trim();
  }

  if (description !== undefined) {
    collection.description = description;
  }

  if (icon !== undefined) {
    collection.icon = icon;
  }

  if (color !== undefined) {
    collection.color = color;
  }

  if (permission !== undefined) {
    // frontend sends empty string
    (0, _validation.assertIn)(permission, ["read_write", "read", "", null], "Invalid permission");
    privacyChanged = permission !== collection.permission;
    collection.permission = permission ? permission : null;
  }

  if (sharing !== undefined) {
    sharingChanged = sharing !== collection.sharing;
    collection.sharing = sharing;
  }

  if (sort !== undefined) {
    collection.sort = sort;
  }

  await collection.save();
  await _models.Event.create({
    name: "collections.update",
    collectionId: collection.id,
    teamId: collection.teamId,
    actorId: user.id,
    data: {
      name
    },
    ip: ctx.request.ip
  });

  if (privacyChanged || sharingChanged) {
    await _models.Event.create({
      name: "collections.permission_changed",
      collectionId: collection.id,
      teamId: collection.teamId,
      actorId: user.id,
      data: {
        privacyChanged,
        sharingChanged
      },
      ip: ctx.request.ip
    });
  } // must reload to update collection membership for correct policy calculation
  // if the privacy level has changed. Otherwise skip this query for speed.


  if (privacyChanged || sharingChanged) {
    await collection.reload();
    const team = await _models.Team.findByPk(user.teamId);

    if (collection.permission === null && (team === null || team === void 0 ? void 0 : team.defaultCollectionId) === collection.id) {
      await (0, _teamUpdater.default)({
        params: {
          defaultCollectionId: null
        },
        ip: ctx.request.ip,
        user,
        team
      });
    }
  }

  ctx.body = {
    data: (0, _presenters.presentCollection)(collection),
    policies: (0, _presenters.presentPolicies)(user, [collection])
  };
});
router.post("collections.list", (0, _authentication.default)(), (0, _pagination.default)(), async ctx => {
  const {
    user
  } = ctx.state;
  const collectionIds = await user.collectionIds();
  const where = {
    teamId: user.teamId,
    id: collectionIds
  };
  const collections = await _models.Collection.scope({
    method: ["withMembership", user.id]
  }).findAll({
    where,
    order: [["updatedAt", "DESC"]],
    offset: ctx.state.pagination.offset,
    limit: ctx.state.pagination.limit
  });
  const nullIndex = collections.findIndex(collection => collection.index === null);

  if (nullIndex !== -1) {
    const indexedCollections = await (0, _indexing.collectionIndexing)(user.teamId);
    collections.forEach(collection => {
      collection.index = indexedCollections[collection.id];
    });
  }

  ctx.body = {
    pagination: ctx.state.pagination,
    data: collections.map(_presenters.presentCollection),
    policies: (0, _presenters.presentPolicies)(user, collections)
  };
});
router.post("collections.delete", (0, _authentication.default)(), async ctx => {
  const {
    id
  } = ctx.body;
  const {
    user
  } = ctx.state;
  (0, _validation.assertUuid)(id, "id is required");
  const collection = await _models.Collection.scope({
    method: ["withMembership", user.id]
  }).findByPk(id);
  const team = await _models.Team.findByPk(user.teamId);
  (0, _policies.authorize)(user, "delete", collection);
  const total = await _models.Collection.count();

  if (total === 1) {
    throw (0, _errors.ValidationError)("Cannot delete last collection");
  }

  await collection.destroy();

  if (team && team.defaultCollectionId === collection.id) {
    await (0, _teamUpdater.default)({
      params: {
        defaultCollectionId: null
      },
      ip: ctx.request.ip,
      user,
      team
    });
  }

  await _models.Event.create({
    name: "collections.delete",
    collectionId: collection.id,
    teamId: collection.teamId,
    actorId: user.id,
    data: {
      name: collection.name
    },
    ip: ctx.request.ip
  });
  ctx.body = {
    success: true
  };
});
router.post("collections.move", (0, _authentication.default)(), async ctx => {
  const id = ctx.body.id;
  let index = ctx.body.index;
  (0, _validation.assertPresent)(index, "index is required");
  (0, _validation.assertIndexCharacters)(index);
  (0, _validation.assertUuid)(id, "id must be a uuid");
  const {
    user
  } = ctx.state;
  const collection = await _models.Collection.findByPk(id);
  (0, _policies.authorize)(user, "move", collection);
  index = await (0, _removeIndexCollision.default)(user.teamId, index);
  await collection.update({
    index
  });
  await _models.Event.create({
    name: "collections.move",
    collectionId: collection.id,
    teamId: collection.teamId,
    actorId: user.id,
    data: {
      index
    },
    ip: ctx.request.ip
  });
  ctx.body = {
    success: true,
    data: {
      index
    }
  };
});
var _default = router;
exports.default = _default;