"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _invariant = _interopRequireDefault(require("invariant"));

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _sequelize = require("sequelize");

var _pinCreator = _interopRequireDefault(require("./../../commands/pinCreator"));

var _pinDestroyer = _interopRequireDefault(require("./../../commands/pinDestroyer"));

var _pinUpdater = _interopRequireDefault(require("./../../commands/pinUpdater"));

var _authentication = _interopRequireDefault(require("./../../middlewares/authentication"));

var _models = require("./../../models");

var _policies = require("./../../policies");

var _presenters = require("./../../presenters");

var _validation = require("./../../validation");

var _pagination = _interopRequireDefault(require("./middlewares/pagination"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _koaRouter.default();
router.post("pins.create", (0, _authentication.default)(), async ctx => {
  const {
    documentId,
    collectionId
  } = ctx.body;
  const {
    index
  } = ctx.body;
  (0, _validation.assertUuid)(documentId, "documentId is required");
  const {
    user
  } = ctx.state;
  const document = await _models.Document.findByPk(documentId, {
    userId: user.id
  });
  (0, _policies.authorize)(user, "read", document);

  if (collectionId) {
    const collection = await _models.Collection.scope({
      method: ["withMembership", user.id]
    }).findByPk(collectionId);
    (0, _policies.authorize)(user, "update", collection);
    (0, _policies.authorize)(user, "pin", document);
  } else {
    (0, _policies.authorize)(user, "pinToHome", document);
  }

  if (index) {
    (0, _validation.assertIndexCharacters)(index);
  }

  const pin = await (0, _pinCreator.default)({
    user,
    documentId,
    collectionId,
    ip: ctx.request.ip,
    index
  });
  ctx.body = {
    data: (0, _presenters.presentPin)(pin),
    policies: (0, _presenters.presentPolicies)(user, [pin])
  };
});
router.post("pins.list", (0, _authentication.default)(), (0, _pagination.default)(), async ctx => {
  const {
    collectionId
  } = ctx.body;
  const {
    user
  } = ctx.state;
  const [pins, collectionIds] = await Promise.all([_models.Pin.findAll({
    where: { ...(collectionId ? {
        collectionId
      } : {
        collectionId: {
          [_sequelize.Op.is]: null
        }
      }),
      teamId: user.teamId
    },
    order: [_sequelize.Sequelize.literal('"pin"."index" collate "C"'), ["updatedAt", "DESC"]],
    offset: ctx.state.pagination.offset,
    limit: ctx.state.pagination.limit
  }), user.collectionIds()]);
  const documents = await _models.Document.defaultScopeWithUser(user.id).findAll({
    where: {
      id: pins.map(pin => pin.documentId),
      collectionId: collectionIds
    }
  });
  const policies = (0, _presenters.presentPolicies)(user, [...documents, ...pins]);
  ctx.body = {
    pagination: ctx.state.pagination,
    data: {
      pins: pins.map(_presenters.presentPin),
      documents: await Promise.all(documents.map(document => (0, _presenters.presentDocument)(document)))
    },
    policies
  };
});
router.post("pins.update", (0, _authentication.default)(), async ctx => {
  const {
    id,
    index
  } = ctx.body;
  (0, _validation.assertUuid)(id, "id is required");
  (0, _validation.assertIndexCharacters)(index);
  const {
    user
  } = ctx.state;
  let pin = await _models.Pin.findByPk(id);
  (0, _invariant.default)(pin, "pin not found");
  const document = await _models.Document.findByPk(pin.documentId, {
    userId: user.id
  });

  if (pin.collectionId) {
    (0, _policies.authorize)(user, "pin", document);
  } else {
    (0, _policies.authorize)(user, "update", pin);
  }

  pin = await (0, _pinUpdater.default)({
    user,
    pin,
    ip: ctx.request.ip,
    index
  });
  ctx.body = {
    data: (0, _presenters.presentPin)(pin),
    policies: (0, _presenters.presentPolicies)(user, [pin])
  };
});
router.post("pins.delete", (0, _authentication.default)(), async ctx => {
  const {
    id
  } = ctx.body;
  (0, _validation.assertUuid)(id, "id is required");
  const {
    user
  } = ctx.state;
  const pin = await _models.Pin.findByPk(id);
  (0, _invariant.default)(pin, "pin not found");
  const document = await _models.Document.findByPk(pin.documentId, {
    userId: user.id
  });

  if (pin.collectionId) {
    (0, _policies.authorize)(user, "unpin", document);
  } else {
    (0, _policies.authorize)(user, "delete", pin);
  }

  await (0, _pinDestroyer.default)({
    user,
    pin,
    ip: ctx.request.ip
  });
  ctx.body = {
    success: true
  };
});
var _default = router;
exports.default = _default;