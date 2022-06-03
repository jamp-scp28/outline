"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _invariant = _interopRequireDefault(require("invariant"));

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _sequelize = require("sequelize");

var _date = require("./../../../shared/utils/date");

var _documentCreator = _interopRequireDefault(require("./../../commands/documentCreator"));

var _documentImporter = _interopRequireDefault(require("./../../commands/documentImporter"));

var _documentMover = _interopRequireDefault(require("./../../commands/documentMover"));

var _documentPermanentDeleter = _interopRequireDefault(require("./../../commands/documentPermanentDeleter"));

var _documentUpdater = _interopRequireDefault(require("./../../commands/documentUpdater"));

var _sequelize2 = require("./../../database/sequelize");

var _errors = require("./../../errors");

var _authentication = _interopRequireDefault(require("./../../middlewares/authentication"));

var _models = require("./../../models");

var _policies = require("./../../policies");

var _presenters = require("./../../presenters");

var _validation = require("./../../validation");

var _env = _interopRequireDefault(require("../../env"));

var _pagination = _interopRequireDefault(require("./middlewares/pagination"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _koaRouter.default();
router.post("documents.list", (0, _authentication.default)(), (0, _pagination.default)(), async ctx => {
  let {
    sort = "updatedAt"
  } = ctx.body;
  const {
    template,
    backlinkDocumentId,
    parentDocumentId
  } = ctx.body; // collection and user are here for backwards compatibility

  const collectionId = ctx.body.collectionId || ctx.body.collection;
  const createdById = ctx.body.userId || ctx.body.user;
  let direction = ctx.body.direction;

  if (direction !== "ASC") {
    direction = "DESC";
  } // always filter by the current team


  const {
    user
  } = ctx.state;
  let where = {
    teamId: user.teamId,
    archivedAt: {
      [_sequelize.Op.is]: null
    }
  };

  if (template) {
    where = { ...where,
      template: true
    };
  } // if a specific user is passed then add to filters. If the user doesn't
  // exist in the team then nothing will be returned, so no need to check auth


  if (createdById) {
    (0, _validation.assertUuid)(createdById, "user must be a UUID");
    where = { ...where,
      createdById
    };
  }

  let documentIds = []; // if a specific collection is passed then we need to check auth to view it

  if (collectionId) {
    (0, _validation.assertUuid)(collectionId, "collection must be a UUID");
    where = { ...where,
      collectionId
    };
    const collection = await _models.Collection.scope({
      method: ["withMembership", user.id]
    }).findByPk(collectionId);
    (0, _policies.authorize)(user, "read", collection); // index sort is special because it uses the order of the documents in the
    // collection.documentStructure rather than a database column

    if (sort === "index") {
      documentIds = ((collection === null || collection === void 0 ? void 0 : collection.documentStructure) || []).map(node => node.id).slice(ctx.state.pagination.offset, ctx.state.pagination.limit);
      where = { ...where,
        id: documentIds
      };
    } // otherwise, filter by all collections the user has access to

  } else {
    const collectionIds = await user.collectionIds();
    where = { ...where,
      collectionId: collectionIds
    };
  }

  if (parentDocumentId) {
    (0, _validation.assertUuid)(parentDocumentId, "parentDocumentId must be a UUID");
    where = { ...where,
      parentDocumentId
    };
  } // Explicitly passing 'null' as the parentDocumentId allows listing documents
  // that have no parent document (aka they are at the root of the collection)


  if (parentDocumentId === null) {
    where = { ...where,
      parentDocumentId: {
        [_sequelize.Op.is]: null
      }
    };
  }

  if (backlinkDocumentId) {
    (0, _validation.assertUuid)(backlinkDocumentId, "backlinkDocumentId must be a UUID");
    const backlinks = await _models.Backlink.findAll({
      attributes: ["reverseDocumentId"],
      where: {
        documentId: backlinkDocumentId
      }
    });
    where = { ...where,
      id: backlinks.map(backlink => backlink.reverseDocumentId)
    };
  }

  if (sort === "index") {
    sort = "updatedAt";
  }

  (0, _validation.assertSort)(sort, _models.Document);
  const documents = await _models.Document.defaultScopeWithUser(user.id).findAll({
    where,
    order: [[sort, direction]],
    offset: ctx.state.pagination.offset,
    limit: ctx.state.pagination.limit
  }); // index sort is special because it uses the order of the documents in the
  // collection.documentStructure rather than a database column

  if (documentIds.length) {
    documents.sort((a, b) => documentIds.indexOf(a.id) - documentIds.indexOf(b.id));
  }

  const data = await Promise.all(documents.map(document => (0, _presenters.presentDocument)(document)));
  const policies = (0, _presenters.presentPolicies)(user, documents);
  ctx.body = {
    pagination: ctx.state.pagination,
    data,
    policies
  };
});
router.post("documents.archived", (0, _authentication.default)(), (0, _pagination.default)(), async ctx => {
  const {
    sort = "updatedAt"
  } = ctx.body;
  (0, _validation.assertSort)(sort, _models.Document);
  let direction = ctx.body.direction;

  if (direction !== "ASC") {
    direction = "DESC";
  }

  const {
    user
  } = ctx.state;
  const collectionIds = await user.collectionIds();
  const collectionScope = {
    method: ["withCollectionPermissions", user.id]
  };
  const viewScope = {
    method: ["withViews", user.id]
  };
  const documents = await _models.Document.scope(["defaultScope", collectionScope, viewScope]).findAll({
    where: {
      teamId: user.teamId,
      collectionId: collectionIds,
      archivedAt: {
        [_sequelize.Op.ne]: null
      }
    },
    order: [[sort, direction]],
    offset: ctx.state.pagination.offset,
    limit: ctx.state.pagination.limit
  });
  const data = await Promise.all(documents.map(document => (0, _presenters.presentDocument)(document)));
  const policies = (0, _presenters.presentPolicies)(user, documents);
  ctx.body = {
    pagination: ctx.state.pagination,
    data,
    policies
  };
});
router.post("documents.deleted", (0, _authentication.default)(), (0, _pagination.default)(), async ctx => {
  const {
    sort = "deletedAt"
  } = ctx.body;
  (0, _validation.assertSort)(sort, _models.Document);
  let direction = ctx.body.direction;

  if (direction !== "ASC") {
    direction = "DESC";
  }

  const {
    user
  } = ctx.state;
  const collectionIds = await user.collectionIds({
    paranoid: false
  });
  const collectionScope = {
    method: ["withCollectionPermissions", user.id]
  };
  const viewScope = {
    method: ["withViews", user.id]
  };
  const documents = await _models.Document.scope([collectionScope, viewScope]).findAll({
    where: {
      teamId: user.teamId,
      collectionId: collectionIds,
      deletedAt: {
        [_sequelize.Op.ne]: null
      }
    },
    include: [{
      model: _models.User,
      as: "createdBy",
      paranoid: false
    }, {
      model: _models.User,
      as: "updatedBy",
      paranoid: false
    }],
    paranoid: false,
    order: [[sort, direction]],
    offset: ctx.state.pagination.offset,
    limit: ctx.state.pagination.limit
  });
  const data = await Promise.all(documents.map(document => (0, _presenters.presentDocument)(document)));
  const policies = (0, _presenters.presentPolicies)(user, documents);
  ctx.body = {
    pagination: ctx.state.pagination,
    data,
    policies
  };
});
router.post("documents.viewed", (0, _authentication.default)(), (0, _pagination.default)(), async ctx => {
  let {
    direction
  } = ctx.body;
  const {
    sort = "updatedAt"
  } = ctx.body;
  (0, _validation.assertSort)(sort, _models.Document);

  if (direction !== "ASC") {
    direction = "DESC";
  }

  const {
    user
  } = ctx.state;
  const collectionIds = await user.collectionIds();
  const userId = user.id;
  const views = await _models.View.findAll({
    where: {
      userId
    },
    order: [[sort, direction]],
    include: [{
      model: _models.Document,
      required: true,
      where: {
        collectionId: collectionIds
      },
      include: [{
        model: _models.Collection.scope({
          method: ["withMembership", userId]
        }),
        as: "collection"
      }]
    }],
    offset: ctx.state.pagination.offset,
    limit: ctx.state.pagination.limit
  });
  const documents = views.map(view => {
    const document = view.document;
    document.views = [view];
    return document;
  });
  const data = await Promise.all(documents.map(document => (0, _presenters.presentDocument)(document)));
  const policies = (0, _presenters.presentPolicies)(user, documents);
  ctx.body = {
    pagination: ctx.state.pagination,
    data,
    policies
  };
});
router.post("documents.drafts", (0, _authentication.default)(), (0, _pagination.default)(), async ctx => {
  let {
    direction
  } = ctx.body;
  const {
    collectionId,
    dateFilter,
    sort = "updatedAt"
  } = ctx.body;
  (0, _validation.assertSort)(sort, _models.Document);

  if (direction !== "ASC") {
    direction = "DESC";
  }

  const {
    user
  } = ctx.state;

  if (collectionId) {
    (0, _validation.assertUuid)(collectionId, "collectionId must be a UUID");
    const collection = await _models.Collection.scope({
      method: ["withMembership", user.id]
    }).findByPk(collectionId);
    (0, _policies.authorize)(user, "read", collection);
  }

  const collectionIds = collectionId ? [collectionId] : await user.collectionIds();
  const where = {
    createdById: user.id,
    collectionId: collectionIds,
    publishedAt: {
      [_sequelize.Op.is]: null
    }
  };

  if (dateFilter) {
    (0, _validation.assertIn)(dateFilter, ["day", "week", "month", "year"], "dateFilter must be one of day,week,month,year");
    where.updatedAt = {
      [_sequelize.Op.gte]: (0, _date.subtractDate)(new Date(), dateFilter)
    };
  } else {
    delete where.updatedAt;
  }

  const collectionScope = {
    method: ["withCollectionPermissions", user.id]
  };
  const documents = await _models.Document.scope(["defaultScope", collectionScope]).findAll({
    where,
    order: [[sort, direction]],
    offset: ctx.state.pagination.offset,
    limit: ctx.state.pagination.limit
  });
  const data = await Promise.all(documents.map(document => (0, _presenters.presentDocument)(document)));
  const policies = (0, _presenters.presentPolicies)(user, documents);
  ctx.body = {
    pagination: ctx.state.pagination,
    data,
    policies
  };
});

async function loadDocument({
  id,
  shareId,
  user
}) {
  let document;
  let collection;
  let share;

  if (!shareId && !(id && user)) {
    throw (0, _errors.AuthenticationError)(`Authentication or shareId required`);
  }

  if (shareId) {
    share = await _models.Share.findOne({
      where: {
        revokedAt: {
          [_sequelize.Op.is]: null
        },
        id: shareId
      },
      include: [{
        // unscoping here allows us to return unpublished documents
        model: _models.Document.unscoped(),
        include: [{
          model: _models.User,
          as: "createdBy",
          paranoid: false
        }, {
          model: _models.User,
          as: "updatedBy",
          paranoid: false
        }],
        required: true,
        as: "document"
      }]
    });

    if (!share || share.document.archivedAt) {
      throw (0, _errors.InvalidRequestError)("Document could not be found for shareId");
    } // It is possible to pass both an id and a shareId to the documents.info
    // endpoint. In this case we'll load the document based on the `id` and check
    // if the provided share token allows access. This is used by the frontend
    // to navigate nested documents from a single share link.


    if (id) {
      document = await _models.Document.findByPk(id, {
        userId: user ? user.id : undefined,
        paranoid: false
      }); // otherwise, if the user has an authenticated session make sure to load
      // with their details so that we can return the correct policies, they may
      // be able to edit the shared document
    } else if (user) {
      document = await _models.Document.findByPk(share.documentId, {
        userId: user.id,
        paranoid: false
      });
    } else {
      document = share.document;
    }

    (0, _invariant.default)(document, "document not found"); // If the user has access to read the document, we can just update
    // the last access date and return the document without additional checks.

    const canReadDocument = user && (0, _policies.can)(user, "read", document);

    if (canReadDocument) {
      await share.update({
        lastAccessedAt: new Date()
      }); // Cannot use document.collection here as it does not include the
      // documentStructure by default through the relationship.

      collection = await _models.Collection.findByPk(document.collectionId);
      (0, _invariant.default)(collection, "collection not found");
      return {
        document,
        share,
        collection
      };
    } // "published" === on the public internet.
    // We already know that there's either no logged in user or the user doesn't
    // have permission to read the document, so we can throw an error.


    if (!share.published) {
      throw (0, _errors.AuthorizationError)();
    } // It is possible to disable sharing at the collection so we must check


    collection = await _models.Collection.findByPk(document.collectionId);
    (0, _invariant.default)(collection, "collection not found");

    if (!collection.sharing) {
      throw (0, _errors.AuthorizationError)();
    } // If we're attempting to load a document that isn't the document originally
    // shared then includeChildDocuments must be enabled and the document must
    // still be active and nested within the shared document


    if (share.document.id !== document.id) {
      if (!share.includeChildDocuments) {
        throw (0, _errors.AuthorizationError)();
      }

      const childDocumentIds = await share.document.getChildDocumentIds({
        archivedAt: {
          [_sequelize.Op.is]: null
        }
      });

      if (!childDocumentIds.includes(document.id)) {
        throw (0, _errors.AuthorizationError)();
      }
    } // It is possible to disable sharing at the team level so we must check


    const team = await _models.Team.findByPk(document.teamId);
    (0, _invariant.default)(team, "team not found");

    if (!team.sharing) {
      throw (0, _errors.AuthorizationError)();
    }

    await share.update({
      lastAccessedAt: new Date()
    });
  } else {
    document = await _models.Document.findByPk(id, {
      userId: user ? user.id : undefined,
      paranoid: false
    });

    if (!document) {
      throw (0, _errors.NotFoundError)();
    }

    if (document.deletedAt) {
      // don't send data if user cannot restore deleted doc
      user && (0, _policies.authorize)(user, "restore", document);
    } else {
      user && (0, _policies.authorize)(user, "read", document);
    }

    collection = document.collection;
  }

  return {
    document,
    share,
    collection
  };
}

router.post("documents.info", (0, _authentication.default)({
  required: false
}), async ctx => {
  const {
    id,
    shareId,
    apiVersion
  } = ctx.body;
  (0, _validation.assertPresent)(id || shareId, "id or shareId is required");
  const {
    user
  } = ctx.state;
  const {
    document,
    share,
    collection
  } = await loadDocument({
    id,
    shareId,
    user
  });
  const isPublic = (0, _policies.cannot)(user, "read", document);
  const serializedDocument = await (0, _presenters.presentDocument)(document, {
    isPublic
  }); // Passing apiVersion=2 has a single effect, to change the response payload to
  // include document and sharedTree keys.

  const data = apiVersion === 2 ? {
    document: serializedDocument,
    sharedTree: share && share.includeChildDocuments ? collection.getDocumentTree(share.documentId) : undefined
  } : serializedDocument;
  ctx.body = {
    data,
    policies: isPublic ? undefined : (0, _presenters.presentPolicies)(user, [document])
  };
});
router.post("documents.export", (0, _authentication.default)({
  required: false
}), async ctx => {
  const {
    id,
    shareId
  } = ctx.body;
  (0, _validation.assertPresent)(id || shareId, "id or shareId is required");
  const {
    user
  } = ctx.state;
  const {
    document
  } = await loadDocument({
    id,
    shareId,
    user
  });
  ctx.body = {
    data: document.toMarkdown()
  };
});
router.post("documents.restore", (0, _authentication.default)(), async ctx => {
  const {
    id,
    collectionId,
    revisionId
  } = ctx.body;
  (0, _validation.assertPresent)(id, "id is required");
  const {
    user
  } = ctx.state;
  const document = await _models.Document.findByPk(id, {
    userId: user.id,
    paranoid: false
  });

  if (!document) {
    throw (0, _errors.NotFoundError)();
  } // Passing collectionId allows restoring to a different collection than the
  // document was originally within


  if (collectionId) {
    (0, _validation.assertUuid)(collectionId, "collectionId must be a uuid");
    document.collectionId = collectionId;
  }

  const collection = await _models.Collection.scope({
    method: ["withMembership", user.id]
  }).findByPk(document.collectionId); // if the collectionId was provided in the request and isn't valid then it will
  // be caught as a 403 on the authorize call below. Otherwise we're checking here
  // that the original collection still exists and advising to pass collectionId
  // if not.

  if (!collectionId) {
    (0, _validation.assertPresent)(collection, "collectionId is required");
  }

  (0, _policies.authorize)(user, "update", collection);

  if (document.deletedAt) {
    (0, _policies.authorize)(user, "restore", document); // restore a previously deleted document

    await document.unarchive(user.id);
    await _models.Event.create({
      name: "documents.restore",
      documentId: document.id,
      collectionId: document.collectionId,
      teamId: document.teamId,
      actorId: user.id,
      data: {
        title: document.title
      },
      ip: ctx.request.ip
    });
  } else if (document.archivedAt) {
    (0, _policies.authorize)(user, "unarchive", document); // restore a previously archived document

    await document.unarchive(user.id);
    await _models.Event.create({
      name: "documents.unarchive",
      documentId: document.id,
      collectionId: document.collectionId,
      teamId: document.teamId,
      actorId: user.id,
      data: {
        title: document.title
      },
      ip: ctx.request.ip
    });
  } else if (revisionId) {
    // restore a document to a specific revision
    (0, _policies.authorize)(user, "update", document);
    const revision = await _models.Revision.findByPk(revisionId);
    (0, _policies.authorize)(document, "restore", revision);
    document.text = revision.text;
    document.title = revision.title;
    await document.save();
    await _models.Event.create({
      name: "documents.restore",
      documentId: document.id,
      collectionId: document.collectionId,
      teamId: document.teamId,
      actorId: user.id,
      data: {
        title: document.title
      },
      ip: ctx.request.ip
    });
  } else {
    (0, _validation.assertPresent)(revisionId, "revisionId is required");
  }

  ctx.body = {
    data: await (0, _presenters.presentDocument)(document),
    policies: (0, _presenters.presentPolicies)(user, [document])
  };
});
router.post("documents.search_titles", (0, _authentication.default)(), (0, _pagination.default)(), async ctx => {
  const {
    query
  } = ctx.body;
  const {
    offset,
    limit
  } = ctx.state.pagination;
  const {
    user
  } = ctx.state;
  (0, _validation.assertPresent)(query, "query is required");
  const collectionIds = await user.collectionIds();
  const documents = await _models.Document.scope([{
    method: ["withViews", user.id]
  }, {
    method: ["withCollectionPermissions", user.id]
  }]).findAll({
    where: {
      title: {
        [_sequelize.Op.iLike]: `%${query}%`
      },
      collectionId: collectionIds,
      archivedAt: {
        [_sequelize.Op.is]: null
      }
    },
    order: [["updatedAt", "DESC"]],
    include: [{
      model: _models.User,
      as: "createdBy",
      paranoid: false
    }, {
      model: _models.User,
      as: "updatedBy",
      paranoid: false
    }],
    offset,
    limit
  });
  const policies = (0, _presenters.presentPolicies)(user, documents);
  const data = await Promise.all(documents.map(document => (0, _presenters.presentDocument)(document)));
  ctx.body = {
    pagination: ctx.state.pagination,
    data,
    policies
  };
});
router.post("documents.search", (0, _authentication.default)({
  required: false
}), (0, _pagination.default)(), async ctx => {
  const {
    query,
    includeArchived,
    includeDrafts,
    collectionId,
    userId,
    dateFilter,
    shareId
  } = ctx.body;
  (0, _validation.assertNotEmpty)(query, "query is required");
  const {
    offset,
    limit
  } = ctx.state.pagination;
  const snippetMinWords = parseInt(ctx.body.snippetMinWords || 20, 10);
  const snippetMaxWords = parseInt(ctx.body.snippetMaxWords || 30, 10); // this typing is a bit ugly, would be better to use a type like ContextWithState
  // but that doesn't adequately handle cases when auth is optional

  const {
    user
  } = ctx.state;
  let teamId;
  let response;

  if (shareId) {
    const {
      share,
      document
    } = await loadDocument({
      shareId,
      user
    });

    if (!(share !== null && share !== void 0 && share.includeChildDocuments)) {
      throw (0, _errors.InvalidRequestError)("Child documents cannot be searched");
    }

    teamId = share.teamId;
    const team = await _models.Team.findByPk(teamId);
    (0, _invariant.default)(team, "Share must belong to a team");
    response = await _models.Document.searchForTeam(team, query, {
      includeArchived: includeArchived === "true",
      includeDrafts: includeDrafts === "true",
      collectionId: document.collectionId,
      share,
      dateFilter,
      offset,
      limit,
      snippetMinWords,
      snippetMaxWords
    });
  } else {
    if (!user) {
      throw (0, _errors.AuthenticationError)("Authentication error");
    }

    teamId = user.teamId;

    if (collectionId) {
      (0, _validation.assertUuid)(collectionId, "collectionId must be a UUID");
      const collection = await _models.Collection.scope({
        method: ["withMembership", user.id]
      }).findByPk(collectionId);
      (0, _policies.authorize)(user, "read", collection);
    }

    let collaboratorIds = undefined;

    if (userId) {
      (0, _validation.assertUuid)(userId, "userId must be a UUID");
      collaboratorIds = [userId];
    }

    if (dateFilter) {
      (0, _validation.assertIn)(dateFilter, ["day", "week", "month", "year"], "dateFilter must be one of day,week,month,year");
    }

    response = await _models.Document.searchForUser(user, query, {
      includeArchived: includeArchived === "true",
      includeDrafts: includeDrafts === "true",
      collaboratorIds,
      collectionId,
      dateFilter,
      offset,
      limit,
      snippetMinWords,
      snippetMaxWords
    });
  }

  const {
    results,
    totalCount
  } = response;
  const documents = results.map(result => result.document);
  const data = await Promise.all(results.map(async result => {
    const document = await (0, _presenters.presentDocument)(result.document);
    return { ...result,
      document
    };
  })); // When requesting subsequent pages of search results we don't want to record
  // duplicate search query records

  if (offset === 0) {
    _models.SearchQuery.create({
      userId: user === null || user === void 0 ? void 0 : user.id,
      teamId,
      shareId,
      source: ctx.state.authType || "app",
      // we'll consider anything that isn't "api" to be "app"
      query,
      results: totalCount
    });
  }

  ctx.body = {
    pagination: ctx.state.pagination,
    data,
    policies: user ? (0, _presenters.presentPolicies)(user, documents) : null
  };
}); // Deprecated – use stars.create instead

router.post("documents.star", (0, _authentication.default)(), async ctx => {
  const {
    id
  } = ctx.body;
  (0, _validation.assertPresent)(id, "id is required");
  const {
    user
  } = ctx.state;
  const document = await _models.Document.findByPk(id, {
    userId: user.id
  });
  (0, _policies.authorize)(user, "read", document);
  await _models.Star.findOrCreate({
    where: {
      documentId: document.id,
      userId: user.id
    }
  });
  await _models.Event.create({
    name: "documents.star",
    documentId: document.id,
    collectionId: document.collectionId,
    teamId: document.teamId,
    actorId: user.id,
    data: {
      title: document.title
    },
    ip: ctx.request.ip
  });
  ctx.body = {
    success: true
  };
}); // Deprecated – use stars.delete instead

router.post("documents.unstar", (0, _authentication.default)(), async ctx => {
  const {
    id
  } = ctx.body;
  (0, _validation.assertPresent)(id, "id is required");
  const {
    user
  } = ctx.state;
  const document = await _models.Document.findByPk(id, {
    userId: user.id
  });
  (0, _policies.authorize)(user, "read", document);
  await _models.Star.destroy({
    where: {
      documentId: document.id,
      userId: user.id
    }
  });
  await _models.Event.create({
    name: "documents.unstar",
    documentId: document.id,
    collectionId: document.collectionId,
    teamId: document.teamId,
    actorId: user.id,
    data: {
      title: document.title
    },
    ip: ctx.request.ip
  });
  ctx.body = {
    success: true
  };
});
router.post("documents.templatize", (0, _authentication.default)(), async ctx => {
  const {
    id
  } = ctx.body;
  (0, _validation.assertPresent)(id, "id is required");
  const {
    user
  } = ctx.state;
  const original = await _models.Document.findByPk(id, {
    userId: user.id
  });
  (0, _policies.authorize)(user, "update", original);
  const document = await _models.Document.create({
    editorVersion: original.editorVersion,
    collectionId: original.collectionId,
    teamId: original.teamId,
    userId: user.id,
    publishedAt: new Date(),
    lastModifiedById: user.id,
    createdById: user.id,
    template: true,
    title: original.title,
    text: original.text
  });
  await _models.Event.create({
    name: "documents.create",
    documentId: document.id,
    collectionId: document.collectionId,
    teamId: document.teamId,
    actorId: user.id,
    data: {
      title: document.title,
      template: true
    },
    ip: ctx.request.ip
  }); // reload to get all of the data needed to present (user, collection etc)

  const reloaded = await _models.Document.findByPk(document.id, {
    userId: user.id
  });
  (0, _invariant.default)(reloaded, "document not found");
  ctx.body = {
    data: await (0, _presenters.presentDocument)(reloaded),
    policies: (0, _presenters.presentPolicies)(user, [reloaded])
  };
});
router.post("documents.update", (0, _authentication.default)(), async ctx => {
  const {
    id,
    title,
    text,
    fullWidth,
    publish,
    lastRevision,
    templateId,
    append
  } = ctx.body;
  const editorVersion = ctx.headers["x-editor-version"];
  (0, _validation.assertPresent)(id, "id is required");

  if (append) {
    (0, _validation.assertPresent)(text, "Text is required while appending");
  }

  const {
    user
  } = ctx.state;
  let collection;
  const document = await _sequelize2.sequelize.transaction(async transaction => {
    const document = await _models.Document.findByPk(id, {
      userId: user.id,
      transaction
    });
    (0, _policies.authorize)(user, "update", document);
    collection = document.collection;

    if (lastRevision && lastRevision !== document.revisionCount) {
      throw (0, _errors.InvalidRequestError)("Document has changed since last revision");
    }

    return (0, _documentUpdater.default)({
      document,
      user,
      title,
      text,
      fullWidth,
      publish,
      append,
      templateId,
      editorVersion,
      transaction,
      ip: ctx.request.ip
    });
  });
  (0, _invariant.default)(collection, "collection not found");
  document.updatedBy = user;
  document.collection = collection;
  ctx.body = {
    data: await (0, _presenters.presentDocument)(document),
    policies: (0, _presenters.presentPolicies)(user, [document])
  };
});
router.post("documents.move", (0, _authentication.default)(), async ctx => {
  const {
    id,
    collectionId,
    parentDocumentId,
    index
  } = ctx.body;
  (0, _validation.assertUuid)(id, "id must be a uuid");
  (0, _validation.assertUuid)(collectionId, "collectionId must be a uuid");

  if (parentDocumentId) {
    (0, _validation.assertUuid)(parentDocumentId, "parentDocumentId must be a uuid");
  }

  if (index) {
    (0, _validation.assertPositiveInteger)(index, "index must be a positive integer");
  }

  if (parentDocumentId === id) {
    throw (0, _errors.InvalidRequestError)("Infinite loop detected, cannot nest a document inside itself");
  }

  const {
    user
  } = ctx.state;
  const document = await _models.Document.findByPk(id, {
    userId: user.id
  });
  (0, _policies.authorize)(user, "move", document);
  const collection = await _models.Collection.scope({
    method: ["withMembership", user.id]
  }).findByPk(collectionId);
  (0, _policies.authorize)(user, "update", collection);

  if (parentDocumentId) {
    const parent = await _models.Document.findByPk(parentDocumentId, {
      userId: user.id
    });
    (0, _policies.authorize)(user, "update", parent);
  }

  const {
    documents,
    collections,
    collectionChanged
  } = await _sequelize2.sequelize.transaction(async transaction => (0, _documentMover.default)({
    user,
    document,
    collectionId,
    parentDocumentId,
    index,
    ip: ctx.request.ip,
    transaction
  }));
  ctx.body = {
    data: {
      documents: await Promise.all(documents.map(document => (0, _presenters.presentDocument)(document))),
      collections: await Promise.all(collections.map(collection => (0, _presenters.presentCollection)(collection)))
    },
    policies: collectionChanged ? (0, _presenters.presentPolicies)(user, documents) : []
  };
});
router.post("documents.archive", (0, _authentication.default)(), async ctx => {
  const {
    id
  } = ctx.body;
  (0, _validation.assertPresent)(id, "id is required");
  const {
    user
  } = ctx.state;
  const document = await _models.Document.findByPk(id, {
    userId: user.id
  });
  (0, _policies.authorize)(user, "archive", document);
  await document.archive(user.id);
  await _models.Event.create({
    name: "documents.archive",
    documentId: document.id,
    collectionId: document.collectionId,
    teamId: document.teamId,
    actorId: user.id,
    data: {
      title: document.title
    },
    ip: ctx.request.ip
  });
  ctx.body = {
    data: await (0, _presenters.presentDocument)(document),
    policies: (0, _presenters.presentPolicies)(user, [document])
  };
});
router.post("documents.delete", (0, _authentication.default)(), async ctx => {
  const {
    id,
    permanent
  } = ctx.body;
  (0, _validation.assertPresent)(id, "id is required");
  const {
    user
  } = ctx.state;

  if (permanent) {
    const document = await _models.Document.findByPk(id, {
      userId: user.id,
      paranoid: false
    });
    (0, _policies.authorize)(user, "permanentDelete", document);
    await _models.Document.update({
      parentDocumentId: null
    }, {
      where: {
        parentDocumentId: document.id
      },
      paranoid: false
    });
    await (0, _documentPermanentDeleter.default)([document]);
    await _models.Event.create({
      name: "documents.permanent_delete",
      documentId: document.id,
      collectionId: document.collectionId,
      teamId: document.teamId,
      actorId: user.id,
      data: {
        title: document.title
      },
      ip: ctx.request.ip
    });
  } else {
    const document = await _models.Document.findByPk(id, {
      userId: user.id
    });
    (0, _policies.authorize)(user, "delete", document);
    await document.delete(user.id);
    await _models.Event.create({
      name: "documents.delete",
      documentId: document.id,
      collectionId: document.collectionId,
      teamId: document.teamId,
      actorId: user.id,
      data: {
        title: document.title
      },
      ip: ctx.request.ip
    });
  }

  ctx.body = {
    success: true
  };
});
router.post("documents.unpublish", (0, _authentication.default)(), async ctx => {
  const {
    id
  } = ctx.body;
  (0, _validation.assertPresent)(id, "id is required");
  const {
    user
  } = ctx.state;
  const document = await _models.Document.findByPk(id, {
    userId: user.id
  });
  (0, _policies.authorize)(user, "unpublish", document);
  const childDocumentIds = await document.getChildDocumentIds();

  if (childDocumentIds.length > 0) {
    throw (0, _errors.InvalidRequestError)("Cannot unpublish document with child documents");
  }

  await document.unpublish(user.id);
  await _models.Event.create({
    name: "documents.unpublish",
    documentId: document.id,
    collectionId: document.collectionId,
    teamId: document.teamId,
    actorId: user.id,
    data: {
      title: document.title
    },
    ip: ctx.request.ip
  });
  ctx.body = {
    data: await (0, _presenters.presentDocument)(document),
    policies: (0, _presenters.presentPolicies)(user, [document])
  };
});
router.post("documents.import", (0, _authentication.default)(), async ctx => {
  const {
    publish,
    collectionId,
    parentDocumentId,
    index
  } = ctx.body;

  if (!ctx.is("multipart/form-data")) {
    throw (0, _errors.InvalidRequestError)("Request type must be multipart/form-data");
  } // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.


  const file = Object.values(ctx.request.files)[0];
  (0, _validation.assertPresent)(file, "file is required");

  if (_env.default.MAXIMUM_IMPORT_SIZE && file.size > _env.default.MAXIMUM_IMPORT_SIZE) {
    throw (0, _errors.InvalidRequestError)("The selected file was too large to import");
  }

  (0, _validation.assertUuid)(collectionId, "collectionId must be an uuid");

  if (parentDocumentId) {
    (0, _validation.assertUuid)(parentDocumentId, "parentDocumentId must be an uuid");
  }

  if (index) {
    (0, _validation.assertPositiveInteger)(index, "index must be an integer (>=0)");
  }

  const {
    user
  } = ctx.state;
  (0, _policies.authorize)(user, "createDocument", user.team);
  const collection = await _models.Collection.scope({
    method: ["withMembership", user.id]
  }).findOne({
    where: {
      id: collectionId,
      teamId: user.teamId
    }
  });
  (0, _policies.authorize)(user, "publish", collection);
  let parentDocument;

  if (parentDocumentId) {
    parentDocument = await _models.Document.findOne({
      where: {
        id: parentDocumentId,
        collectionId: collection.id
      }
    });
    (0, _policies.authorize)(user, "read", parentDocument, {
      collection
    });
  }

  const content = await _fsExtra.default.readFile(file.path);
  const document = await _sequelize2.sequelize.transaction(async transaction => {
    const {
      text,
      title
    } = await (0, _documentImporter.default)({
      user,
      fileName: file.name,
      mimeType: file.type,
      content,
      ip: ctx.request.ip,
      transaction
    });
    return (0, _documentCreator.default)({
      source: "import",
      title,
      text,
      publish,
      collectionId,
      parentDocumentId,
      index,
      user,
      ip: ctx.request.ip,
      transaction
    });
  });
  document.collection = collection;
  return ctx.body = {
    data: await (0, _presenters.presentDocument)(document),
    policies: (0, _presenters.presentPolicies)(user, [document])
  };
});
router.post("documents.create", (0, _authentication.default)(), async ctx => {
  const {
    title = "",
    text = "",
    publish,
    collectionId,
    parentDocumentId,
    templateId,
    template,
    index
  } = ctx.body;
  const editorVersion = ctx.headers["x-editor-version"];
  (0, _validation.assertUuid)(collectionId, "collectionId must be an uuid");

  if (parentDocumentId) {
    (0, _validation.assertUuid)(parentDocumentId, "parentDocumentId must be an uuid");
  }

  if (index) {
    (0, _validation.assertPositiveInteger)(index, "index must be an integer (>=0)");
  }

  const {
    user
  } = ctx.state;
  (0, _policies.authorize)(user, "createDocument", user.team);
  const collection = await _models.Collection.scope({
    method: ["withMembership", user.id]
  }).findOne({
    where: {
      id: collectionId,
      teamId: user.teamId
    }
  });
  (0, _policies.authorize)(user, "publish", collection);
  let parentDocument;

  if (parentDocumentId) {
    parentDocument = await _models.Document.findOne({
      where: {
        id: parentDocumentId,
        collectionId: collection.id
      }
    });
    (0, _policies.authorize)(user, "read", parentDocument, {
      collection
    });
  }

  let templateDocument;

  if (templateId) {
    templateDocument = await _models.Document.findByPk(templateId, {
      userId: user.id
    });
    (0, _policies.authorize)(user, "read", templateDocument);
  }

  const document = await _sequelize2.sequelize.transaction(async transaction => {
    return (0, _documentCreator.default)({
      title,
      text,
      publish,
      collectionId,
      parentDocumentId,
      templateDocument,
      template,
      index,
      user,
      editorVersion,
      ip: ctx.request.ip,
      transaction
    });
  });
  document.collection = collection;
  return ctx.body = {
    data: await (0, _presenters.presentDocument)(document),
    policies: (0, _presenters.presentPolicies)(user, [document])
  };
});
var _default = router;
exports.default = _default;