"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _sequelize = require("sequelize");

var _starCreator = _interopRequireDefault(require("./../../commands/starCreator"));

var _starDestroyer = _interopRequireDefault(require("./../../commands/starDestroyer"));

var _starUpdater = _interopRequireDefault(require("./../../commands/starUpdater"));

var _sequelize2 = require("./../../database/sequelize");

var _authentication = _interopRequireDefault(require("./../../middlewares/authentication"));

var _models = require("./../../models");

var _policies = require("./../../policies");

var _presenters = require("./../../presenters");

var _indexing = require("./../../utils/indexing");

var _validation = require("./../../validation");

var _pagination = _interopRequireDefault(require("./middlewares/pagination"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _koaRouter.default();
router.post("stars.create", (0, _authentication.default)(), async ctx => {
  const {
    documentId,
    collectionId
  } = ctx.body;
  const {
    index
  } = ctx.body;
  const {
    user
  } = ctx.state;
  (0, _validation.assertUuid)(documentId || collectionId, "documentId or collectionId is required");

  if (documentId) {
    const document = await _models.Document.findByPk(documentId, {
      userId: user.id
    });
    (0, _policies.authorize)(user, "star", document);
  }

  if (collectionId) {
    const collection = await _models.Collection.scope({
      method: ["withMembership", user.id]
    }).findByPk(collectionId);
    (0, _policies.authorize)(user, "star", collection);
  }

  if (index) {
    (0, _validation.assertIndexCharacters)(index);
  }

  const star = await _sequelize2.sequelize.transaction(async transaction => (0, _starCreator.default)({
    user,
    documentId,
    collectionId,
    ip: ctx.request.ip,
    index,
    transaction
  }));
  ctx.body = {
    data: (0, _presenters.presentStar)(star),
    policies: (0, _presenters.presentPolicies)(user, [star])
  };
});
router.post("stars.list", (0, _authentication.default)(), (0, _pagination.default)(), async ctx => {
  const {
    user
  } = ctx.state;
  const [stars, collectionIds] = await Promise.all([_models.Star.findAll({
    where: {
      userId: user.id
    },
    order: [_sequelize.Sequelize.literal('"star"."index" collate "C"'), ["updatedAt", "DESC"]],
    offset: ctx.state.pagination.offset,
    limit: ctx.state.pagination.limit
  }), user.collectionIds()]);
  const nullIndex = stars.findIndex(star => star.index === null);

  if (nullIndex !== -1) {
    const indexedStars = await (0, _indexing.starIndexing)(user.id);
    stars.forEach(star => {
      star.index = indexedStars[star.id];
    });
  }

  const documentIds = stars.map(star => star.documentId).filter(Boolean);
  const documents = documentIds.length ? await _models.Document.defaultScopeWithUser(user.id).findAll({
    where: {
      id: documentIds,
      collectionId: collectionIds
    }
  }) : [];
  const policies = (0, _presenters.presentPolicies)(user, [...documents, ...stars]);
  ctx.body = {
    pagination: ctx.state.pagination,
    data: {
      stars: stars.map(_presenters.presentStar),
      documents: await Promise.all(documents.map(document => (0, _presenters.presentDocument)(document)))
    },
    policies
  };
});
router.post("stars.update", (0, _authentication.default)(), async ctx => {
  const {
    id,
    index
  } = ctx.body;
  (0, _validation.assertUuid)(id, "id is required");
  (0, _validation.assertIndexCharacters)(index);
  const {
    user
  } = ctx.state;
  let star = await _models.Star.findByPk(id);
  (0, _policies.authorize)(user, "update", star);
  star = await (0, _starUpdater.default)({
    user,
    star,
    ip: ctx.request.ip,
    index
  });
  ctx.body = {
    data: (0, _presenters.presentStar)(star),
    policies: (0, _presenters.presentPolicies)(user, [star])
  };
});
router.post("stars.delete", (0, _authentication.default)(), async ctx => {
  const {
    id
  } = ctx.body;
  (0, _validation.assertUuid)(id, "id is required");
  const {
    user
  } = ctx.state;
  const star = await _models.Star.findByPk(id);
  (0, _policies.authorize)(user, "delete", star);
  await (0, _starDestroyer.default)({
    user,
    star,
    ip: ctx.request.ip
  });
  ctx.body = {
    success: true
  };
});
var _default = router;
exports.default = _default;