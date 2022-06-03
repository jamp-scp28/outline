"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DOCUMENT_VERSION = void 0;

var _removeMarkdown = _interopRequireDefault(require("@tommoor/remove-markdown"));

var _invariant = _interopRequireDefault(require("invariant"));

var _lodash = require("lodash");

var _randomstring = _interopRequireDefault(require("randomstring"));

var _sequelize = require("sequelize");

var _sequelizeTypescript = require("sequelize-typescript");

var _slateMdSerializer = _interopRequireDefault(require("slate-md-serializer"));

var _isUUID = _interopRequireDefault(require("validator/lib/isUUID"));

var _constants = require("./../../shared/constants");

var _getTasks = _interopRequireDefault(require("./../../shared/utils/getTasks"));

var _parseTitle = _interopRequireDefault(require("./../../shared/utils/parseTitle"));

var _unescape = _interopRequireDefault(require("./../../shared/utils/unescape"));

var _urlHelpers = require("./../../shared/utils/urlHelpers");

var _slugify = _interopRequireDefault(require("./../utils/slugify"));

var _Backlink = _interopRequireDefault(require("./Backlink"));

var _Collection = _interopRequireDefault(require("./Collection"));

var _Revision = _interopRequireDefault(require("./Revision"));

var _Star = _interopRequireDefault(require("./Star"));

var _Team = _interopRequireDefault(require("./Team"));

var _User = _interopRequireDefault(require("./User"));

var _View = _interopRequireDefault(require("./View"));

var _ParanoidModel = _interopRequireDefault(require("./base/ParanoidModel"));

var _Fix = _interopRequireDefault(require("./decorators/Fix"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _dec45, _dec46, _dec47, _dec48, _dec49, _dec50, _dec51, _dec52, _dec53, _dec54, _dec55, _dec56, _dec57, _dec58, _dec59, _dec60, _dec61, _dec62, _dec63, _dec64, _dec65, _dec66, _dec67, _dec68, _dec69, _dec70, _dec71, _dec72, _dec73, _dec74, _dec75, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _descriptor22, _descriptor23, _descriptor24, _descriptor25, _descriptor26, _descriptor27, _descriptor28, _descriptor29, _descriptor30, _descriptor31;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

const serializer = new _slateMdSerializer.default();
const DOCUMENT_VERSION = 2;
exports.DOCUMENT_VERSION = DOCUMENT_VERSION;
let Document = (_dec = (0, _sequelizeTypescript.DefaultScope)(() => ({
  attributes: {
    exclude: ["state"]
  },
  include: [{
    model: _User.default,
    as: "createdBy",
    paranoid: false
  }, {
    model: _User.default,
    as: "updatedBy",
    paranoid: false
  }],
  where: {
    publishedAt: {
      [_sequelize.Op.ne]: null
    }
  }
})), _dec2 = (0, _sequelizeTypescript.Scopes)(() => ({
  withCollectionPermissions: (userId, paranoid = true) => {
    if (userId) {
      return {
        include: [{
          attributes: ["id", "permission", "sharing", "teamId", "deletedAt"],
          model: _Collection.default.scope({
            method: ["withMembership", userId]
          }),
          as: "collection",
          paranoid
        }]
      };
    }

    return {
      include: [{
        attributes: ["id", "permission", "sharing", "teamId", "deletedAt"],
        model: _Collection.default,
        as: "collection",
        paranoid
      }]
    };
  },
  withoutState: {
    attributes: {
      exclude: ["state"]
    }
  },
  withCollection: {
    include: [{
      model: _Collection.default,
      as: "collection"
    }]
  },
  withState: {
    attributes: {
      // resets to include the state column
      exclude: []
    }
  },
  withDrafts: {
    include: [{
      model: _User.default,
      as: "createdBy",
      paranoid: false
    }, {
      model: _User.default,
      as: "updatedBy",
      paranoid: false
    }]
  },
  withViews: userId => {
    if (!userId) {
      return {};
    }

    return {
      include: [{
        model: _View.default,
        as: "views",
        where: {
          userId
        },
        required: false,
        separate: true
      }]
    };
  }
})), _dec3 = (0, _sequelizeTypescript.Table)({
  tableName: "documents",
  modelName: "document"
}), _dec4 = Reflect.metadata("design:type", String), _dec5 = (0, _sequelizeTypescript.Length)({
  min: 0,
  max: _constants.MAX_TITLE_LENGTH,
  msg: `Document title must be less than ${_constants.MAX_TITLE_LENGTH} characters`
}), _dec6 = Reflect.metadata("design:type", String), _dec7 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.ARRAY(_sequelizeTypescript.DataType.STRING)), _dec8 = Reflect.metadata("design:type", Array), _dec9 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.SMALLINT), _dec10 = Reflect.metadata("design:type", Number), _dec11 = Reflect.metadata("design:type", Boolean), _dec12 = Reflect.metadata("design:type", Boolean), _dec13 = Reflect.metadata("design:type", String), _dec14 = Reflect.metadata("design:type", String), _dec15 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.TEXT), _dec16 = Reflect.metadata("design:type", String), _dec17 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.BLOB), _dec18 = Reflect.metadata("design:type", typeof Uint8Array === "undefined" ? Object : Uint8Array), _dec19 = (0, _sequelizeTypescript.Default)(false), _dec20 = Reflect.metadata("design:type", Boolean), _dec21 = (0, _sequelizeTypescript.Default)(0), _dec22 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.INTEGER), _dec23 = Reflect.metadata("design:type", Number), _dec24 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec25 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec26 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.ARRAY(_sequelizeTypescript.DataType.UUID)), _dec27 = Reflect.metadata("design:type", Array), _dec28 = Reflect.metadata("design:type", Function), _dec29 = Reflect.metadata("design:paramtypes", [Object, typeof _sequelize.SaveOptions === "undefined" ? Object : _sequelize.SaveOptions]), _dec30 = Reflect.metadata("design:type", Function), _dec31 = Reflect.metadata("design:paramtypes", [Object]), _dec32 = Reflect.metadata("design:type", Function), _dec33 = Reflect.metadata("design:paramtypes", [Object]), _dec34 = Reflect.metadata("design:type", Function), _dec35 = Reflect.metadata("design:paramtypes", [Object]), _dec36 = Reflect.metadata("design:type", Function), _dec37 = Reflect.metadata("design:paramtypes", [Object]), _dec38 = (0, _sequelizeTypescript.BelongsTo)(() => Document, "parentDocumentId"), _dec39 = Reflect.metadata("design:type", Object), _dec40 = (0, _sequelizeTypescript.ForeignKey)(() => Document), _dec41 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.UUID), _dec42 = Reflect.metadata("design:type", String), _dec43 = (0, _sequelizeTypescript.BelongsTo)(() => _User.default, "lastModifiedById"), _dec44 = Reflect.metadata("design:type", typeof _User.default === "undefined" ? Object : _User.default), _dec45 = (0, _sequelizeTypescript.ForeignKey)(() => _User.default), _dec46 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.UUID), _dec47 = Reflect.metadata("design:type", String), _dec48 = (0, _sequelizeTypescript.BelongsTo)(() => _User.default, "createdById"), _dec49 = Reflect.metadata("design:type", typeof _User.default === "undefined" ? Object : _User.default), _dec50 = (0, _sequelizeTypescript.ForeignKey)(() => _User.default), _dec51 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.UUID), _dec52 = Reflect.metadata("design:type", String), _dec53 = (0, _sequelizeTypescript.BelongsTo)(() => Document, "templateId"), _dec54 = Reflect.metadata("design:type", Object), _dec55 = (0, _sequelizeTypescript.ForeignKey)(() => Document), _dec56 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.UUID), _dec57 = Reflect.metadata("design:type", String), _dec58 = (0, _sequelizeTypescript.BelongsTo)(() => _Team.default, "teamId"), _dec59 = Reflect.metadata("design:type", typeof _Team.default === "undefined" ? Object : _Team.default), _dec60 = (0, _sequelizeTypescript.ForeignKey)(() => _Team.default), _dec61 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.UUID), _dec62 = Reflect.metadata("design:type", String), _dec63 = (0, _sequelizeTypescript.BelongsTo)(() => _Collection.default, "collectionId"), _dec64 = Reflect.metadata("design:type", typeof _Collection.default === "undefined" ? Object : _Collection.default), _dec65 = (0, _sequelizeTypescript.ForeignKey)(() => _Collection.default), _dec66 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.UUID), _dec67 = Reflect.metadata("design:type", String), _dec68 = (0, _sequelizeTypescript.HasMany)(() => _Revision.default), _dec69 = Reflect.metadata("design:type", Array), _dec70 = (0, _sequelizeTypescript.HasMany)(() => _Backlink.default), _dec71 = Reflect.metadata("design:type", Array), _dec72 = (0, _sequelizeTypescript.HasMany)(() => _Star.default), _dec73 = Reflect.metadata("design:type", Array), _dec74 = (0, _sequelizeTypescript.HasMany)(() => _View.default), _dec75 = Reflect.metadata("design:type", Array), _dec(_class = _dec2(_class = _dec3(_class = (0, _Fix.default)(_class = (_class2 = class Document extends _ParanoidModel.default {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "urlId", _descriptor, this);

    _initializerDefineProperty(this, "title", _descriptor2, this);

    _initializerDefineProperty(this, "previousTitles", _descriptor3, this);

    _initializerDefineProperty(this, "version", _descriptor4, this);

    _initializerDefineProperty(this, "template", _descriptor5, this);

    _initializerDefineProperty(this, "fullWidth", _descriptor6, this);

    _initializerDefineProperty(this, "editorVersion", _descriptor7, this);

    _initializerDefineProperty(this, "emoji", _descriptor8, this);

    _initializerDefineProperty(this, "text", _descriptor9, this);

    _initializerDefineProperty(this, "state", _descriptor10, this);

    _initializerDefineProperty(this, "isWelcome", _descriptor11, this);

    _initializerDefineProperty(this, "revisionCount", _descriptor12, this);

    _initializerDefineProperty(this, "archivedAt", _descriptor13, this);

    _initializerDefineProperty(this, "publishedAt", _descriptor14, this);

    _initializerDefineProperty(this, "collaboratorIds", _descriptor15, this);

    _initializerDefineProperty(this, "parentDocument", _descriptor16, this);

    _initializerDefineProperty(this, "parentDocumentId", _descriptor17, this);

    _initializerDefineProperty(this, "updatedBy", _descriptor18, this);

    _initializerDefineProperty(this, "lastModifiedById", _descriptor19, this);

    _initializerDefineProperty(this, "createdBy", _descriptor20, this);

    _initializerDefineProperty(this, "createdById", _descriptor21, this);

    _initializerDefineProperty(this, "document", _descriptor22, this);

    _initializerDefineProperty(this, "templateId", _descriptor23, this);

    _initializerDefineProperty(this, "team", _descriptor24, this);

    _initializerDefineProperty(this, "teamId", _descriptor25, this);

    _initializerDefineProperty(this, "collection", _descriptor26, this);

    _initializerDefineProperty(this, "collectionId", _descriptor27, this);

    _initializerDefineProperty(this, "revisions", _descriptor28, this);

    _initializerDefineProperty(this, "backlinks", _descriptor29, this);

    _initializerDefineProperty(this, "starred", _descriptor30, this);

    _initializerDefineProperty(this, "views", _descriptor31, this);

    _defineProperty(this, "toMarkdown", () => {
      const text = (0, _unescape.default)(this.text);

      if (this.version) {
        return `# ${this.title}\n\n${text}`;
      }

      return text;
    });

    _defineProperty(this, "migrateVersion", () => {
      let migrated = false; // migrate from document version 0 -> 1

      if (!this.version) {
        // removing the title from the document text attribute
        this.text = this.text.replace(/^#\s(.*)\n/, "");
        this.version = 1;
        migrated = true;
      } // migrate from document version 1 -> 2


      if (this.version === 1) {
        const nodes = serializer.deserialize(this.text);
        this.text = serializer.serialize(nodes, {
          version: 2
        });
        this.version = 2;
        migrated = true;
      }

      if (migrated) {
        return this.save({
          silent: true,
          hooks: false
        });
      }

      return undefined;
    });

    _defineProperty(this, "getChildDocumentIds", async (where, options) => {
      const getChildDocumentIds = async (...parentDocumentId) => {
        const childDocuments = await this.constructor.findAll({
          attributes: ["id"],
          where: {
            parentDocumentId,
            ...where
          },
          ...options
        });
        const childDocumentIds = childDocuments.map(doc => doc.id);

        if (childDocumentIds.length > 0) {
          return [...childDocumentIds, ...(await getChildDocumentIds(...childDocumentIds))];
        }

        return childDocumentIds;
      };

      return getChildDocumentIds(this.id);
    });

    _defineProperty(this, "archiveWithChildren", async (userId, options) => {
      const archivedAt = new Date(); // Helper to archive all child documents for a document

      const archiveChildren = async parentDocumentId => {
        const childDocuments = await this.constructor.findAll({
          where: {
            parentDocumentId
          }
        });
        childDocuments.forEach(async child => {
          await archiveChildren(child.id);
          child.archivedAt = archivedAt;
          child.lastModifiedById = userId;
          await child.save(options);
        });
      };

      await archiveChildren(this.id);
      this.archivedAt = archivedAt;
      this.lastModifiedById = userId;
      return this.save(options);
    });

    _defineProperty(this, "publish", async (userId, {
      transaction
    }) => {
      // If the document is already published then calling publish should act like
      // a regular save
      if (this.publishedAt) {
        return this.save({
          transaction
        });
      }

      if (!this.template) {
        const collection = await _Collection.default.findByPk(this.collectionId, {
          transaction,
          lock: _sequelize.Transaction.LOCK.UPDATE
        });

        if (collection) {
          await collection.addDocumentToStructure(this, 0, {
            transaction
          });
          this.collection = collection;
        }
      }

      this.lastModifiedById = userId;
      this.publishedAt = new Date();
      return this.save({
        transaction
      });
    });

    _defineProperty(this, "unpublish", async userId => {
      // If the document is already a draft then calling unpublish should act like
      // a regular save
      if (!this.publishedAt) {
        return this.save();
      }

      await this.sequelize.transaction(async transaction => {
        const collection = await _Collection.default.findByPk(this.collectionId, {
          transaction,
          lock: transaction.LOCK.UPDATE
        });

        if (collection) {
          await collection.removeDocumentInStructure(this, {
            transaction
          });
          this.collection = collection;
        }
      }); // unpublishing a document converts the ownership to yourself, so that it
      // will appear in your drafts rather than the original creators

      this.createdById = userId;
      this.lastModifiedById = userId;
      this.publishedAt = null;
      return this.save();
    });

    _defineProperty(this, "archive", async userId => {
      await this.sequelize.transaction(async transaction => {
        const collection = await _Collection.default.findByPk(this.collectionId, {
          transaction,
          lock: transaction.LOCK.UPDATE
        });

        if (collection) {
          await collection.removeDocumentInStructure(this, {
            transaction
          });
          this.collection = collection;
        }
      });
      await this.archiveWithChildren(userId);
      return this;
    });

    _defineProperty(this, "unarchive", async userId => {
      await this.sequelize.transaction(async transaction => {
        const collection = await _Collection.default.findByPk(this.collectionId, {
          transaction,
          lock: transaction.LOCK.UPDATE
        }); // check to see if the documents parent hasn't been archived also
        // If it has then restore the document to the collection root.

        if (this.parentDocumentId) {
          const parent = await this.constructor.findOne({
            where: {
              id: this.parentDocumentId,
              archivedAt: {
                [_sequelize.Op.is]: null
              }
            }
          });

          if (!parent) {
            this.parentDocumentId = null;
          }
        }

        if (!this.template && collection) {
          await collection.addDocumentToStructure(this, undefined, {
            transaction
          });
          this.collection = collection;
        }
      });

      if (this.deletedAt) {
        await this.restore();
      }

      this.archivedAt = null;
      this.lastModifiedById = userId;
      await this.save();
      return this;
    });

    _defineProperty(this, "delete", userId => {
      return this.sequelize.transaction(async transaction => {
        if (!this.archivedAt && !this.template) {
          // delete any children and remove from the document structure
          const collection = await _Collection.default.findByPk(this.collectionId, {
            transaction,
            lock: transaction.LOCK.UPDATE
          });
          await (collection === null || collection === void 0 ? void 0 : collection.deleteDocument(this, {
            transaction
          }));
        } else {
          await this.destroy({
            transaction
          });
        }

        await _Revision.default.destroy({
          where: {
            documentId: this.id
          },
          transaction
        });
        await this.update({
          lastModifiedById: userId
        }, {
          transaction
        });
        return this;
      });
    });

    _defineProperty(this, "getTimestamp", () => {
      return Math.round(new Date(this.updatedAt).getTime() / 1000);
    });

    _defineProperty(this, "getSummary", () => {
      const plain = (0, _removeMarkdown.default)((0, _unescape.default)(this.text), {
        stripHTML: false
      });
      const lines = (0, _lodash.compact)(plain.split("\n"));
      const notEmpty = lines.length >= 1;

      if (this.version) {
        return notEmpty ? lines[0] : "";
      }

      return notEmpty ? lines[1] : "";
    });

    _defineProperty(this, "toJSON", () => {
      // Warning: only use for new documents as order of children is
      // handled in the collection's documentStructure
      return {
        id: this.id,
        title: this.title,
        url: this.url,
        children: []
      };
    });
  }

  // getters
  get url() {
    if (!this.title) {
      return `/doc/untitled-${this.urlId}`;
    }

    const slugifiedTitle = (0, _slugify.default)(this.title);
    return `/doc/${slugifiedTitle}-${this.urlId}`;
  }

  get tasks() {
    return (0, _getTasks.default)(this.text || "");
  } // hooks


  static async updateTitleInCollectionStructure(model, {
    transaction
  }) {
    // templates, drafts, and archived documents don't appear in the structure
    // and so never need to be updated when the title changes
    if (model.archivedAt || model.template || !model.publishedAt || !model.changed("title")) {
      return;
    }

    const collection = await _Collection.default.findByPk(model.collectionId, {
      transaction,
      lock: _sequelize.Transaction.LOCK.UPDATE
    });

    if (!collection) {
      return;
    }

    await collection.updateDocument(model, {
      transaction
    });
    model.collection = collection;
  }

  static async addDocumentToCollectionStructure(model) {
    if (model.archivedAt || model.template || !model.publishedAt) {
      return;
    }

    return this.sequelize.transaction(async transaction => {
      const collection = await _Collection.default.findByPk(model.collectionId, {
        transaction,
        lock: transaction.LOCK.UPDATE
      });

      if (!collection) {
        return;
      }

      await collection.addDocumentToStructure(model, 0, {
        transaction
      });
      model.collection = collection;
    });
  }

  static createUrlId(model) {
    return model.urlId = model.urlId || _randomstring.default.generate(10);
  }

  static setDocumentVersion(model) {
    if (model.version === undefined) {
      model.version = DOCUMENT_VERSION;
    }

    return this.processUpdate(model);
  }

  static processUpdate(model) {
    const {
      emoji
    } = (0, _parseTitle.default)(model.text); // emoji in the title is split out for easier display

    model.emoji = emoji || null; // ensure documents have a title

    model.title = model.title || "";

    if (model.previous("title") && model.previous("title") !== model.title) {
      if (!model.previousTitles) {
        model.previousTitles = [];
      }

      model.previousTitles = (0, _lodash.uniq)(model.previousTitles.concat(model.previous("title")));
    } // add the current user as a collaborator on this doc


    if (!model.collaboratorIds) {
      model.collaboratorIds = [];
    }

    model.collaboratorIds = (0, _lodash.uniq)(model.collaboratorIds.concat(model.lastModifiedById)); // increment revision

    model.revisionCount += 1;
  } // associations


  static defaultScopeWithUser(userId) {
    const collectionScope = {
      method: ["withCollectionPermissions", userId]
    };
    const viewScope = {
      method: ["withViews", userId]
    };
    return this.scope(["defaultScope", collectionScope, viewScope]);
  }

  static async findByPk(id, options = {}) {
    // allow default preloading of collection membership if `userId` is passed in find options
    // almost every endpoint needs the collection membership to determine policy permissions.
    const scope = this.scope(["withoutState", "withDrafts", {
      method: ["withCollectionPermissions", options.userId, options.paranoid]
    }, {
      method: ["withViews", options.userId]
    }]);

    if ((0, _isUUID.default)(id)) {
      return scope.findOne({
        where: {
          id
        },
        ...options
      });
    }

    const match = id.match(_urlHelpers.SLUG_URL_REGEX);

    if (match) {
      return scope.findOne({
        where: {
          urlId: match[1]
        },
        ...options
      });
    }

    return undefined;
  }

  static async searchForTeam(team, query, options = {}) {
    var _options$share;

    const wildcardQuery = `${escape(query)}:*`;
    const {
      snippetMinWords = 20,
      snippetMaxWords = 30,
      limit = 15,
      offset = 0
    } = options; // restrict to specific collection if provided
    // enables search in private collections if specified

    let collectionIds;

    if (options.collectionId) {
      collectionIds = [options.collectionId];
    } else {
      collectionIds = await team.collectionIds();
    } // short circuit if no relevant collections


    if (!collectionIds.length) {
      return {
        results: [],
        totalCount: 0
      };
    } // restrict to documents in the tree of a shared document when one is provided


    let documentIds;

    if ((_options$share = options.share) !== null && _options$share !== void 0 && _options$share.includeChildDocuments) {
      const sharedDocument = await options.share.$get("document");
      (0, _invariant.default)(sharedDocument, "Cannot find document for share");
      const childDocumentIds = await sharedDocument.getChildDocumentIds({
        archivedAt: {
          [_sequelize.Op.is]: null
        }
      });
      documentIds = [sharedDocument.id, ...childDocumentIds];
    }

    const documentClause = documentIds ? `"id" IN(:documentIds) AND` : ""; // Build the SQL query to get result documentIds, ranking, and search term context

    const whereClause = `
  "searchVector" @@ to_tsquery('english', :query) AND
    "teamId" = :teamId AND
    "collectionId" IN(:collectionIds) AND
    ${documentClause}
    "deletedAt" IS NULL AND
    "publishedAt" IS NOT NULL
  `;
    const selectSql = `
    SELECT
      id,
      ts_rank(documents."searchVector", to_tsquery('english', :query)) as "searchRanking",
      ts_headline('english', "text", to_tsquery('english', :query), 'MaxFragments=1, MinWords=:snippetMinWords, MaxWords=:snippetMaxWords') as "searchContext"
    FROM documents
    WHERE ${whereClause}
    ORDER BY
      "searchRanking" DESC,
      "updatedAt" DESC
    LIMIT :limit
    OFFSET :offset;
  `;
    const countSql = `
    SELECT COUNT(id)
    FROM documents
    WHERE ${whereClause}
  `;
    const queryReplacements = {
      teamId: team.id,
      query: wildcardQuery,
      collectionIds,
      documentIds,
      snippetMinWords,
      snippetMaxWords
    };
    const resultsQuery = this.sequelize.query(selectSql, {
      type: _sequelize.QueryTypes.SELECT,
      replacements: { ...queryReplacements,
        limit,
        offset
      }
    });
    const countQuery = this.sequelize.query(countSql, {
      type: _sequelize.QueryTypes.SELECT,
      replacements: queryReplacements
    });
    const [results, [{
      count
    }]] = await Promise.all([resultsQuery, countQuery]); // Final query to get associated document data

    const documents = await this.findAll({
      where: {
        id: (0, _lodash.map)(results, "id"),
        teamId: team.id
      },
      include: [{
        model: _Collection.default,
        as: "collection"
      }]
    });
    return {
      results: (0, _lodash.map)(results, result => ({
        ranking: result.searchRanking,
        context: (0, _removeMarkdown.default)((0, _unescape.default)(result.searchContext), {
          stripHTML: false
        }),
        document: (0, _lodash.find)(documents, {
          id: result.id
        })
      })),
      totalCount: count
    };
  }

  static async searchForUser(user, query, options = {}) {
    const {
      snippetMinWords = 20,
      snippetMaxWords = 30,
      limit = 15,
      offset = 0
    } = options;
    const wildcardQuery = `${escape(query)}:*`; // Ensure we're filtering by the users accessible collections. If
    // collectionId is passed as an option it is assumed that the authorization
    // has already been done in the router

    let collectionIds;

    if (options.collectionId) {
      collectionIds = [options.collectionId];
    } else {
      collectionIds = await user.collectionIds();
    } // If the user has access to no collections then shortcircuit the rest of this


    if (!collectionIds.length) {
      return {
        results: [],
        totalCount: 0
      };
    }

    let dateFilter;

    if (options.dateFilter) {
      dateFilter = `1 ${options.dateFilter}`;
    } // Build the SQL query to get documentIds, ranking, and search term context


    const whereClause = `
  "searchVector" @@ to_tsquery('english', :query) AND
    "teamId" = :teamId AND
    "collectionId" IN(:collectionIds) AND
    ${options.dateFilter ? '"updatedAt" > now() - interval :dateFilter AND' : ""}
    ${options.collaboratorIds ? '"collaboratorIds" @> ARRAY[:collaboratorIds]::uuid[] AND' : ""}
    ${options.includeArchived ? "" : '"archivedAt" IS NULL AND'}
    "deletedAt" IS NULL AND
    ${options.includeDrafts ? '("publishedAt" IS NOT NULL OR "createdById" = :userId)' : '"publishedAt" IS NOT NULL'}
  `;
    const selectSql = `
  SELECT
    id,
    ts_rank(documents."searchVector", to_tsquery('english', :query)) as "searchRanking",
    ts_headline('english', "text", to_tsquery('english', :query), 'MaxFragments=1, MinWords=:snippetMinWords, MaxWords=:snippetMaxWords') as "searchContext"
  FROM documents
  WHERE ${whereClause}
  ORDER BY
    "searchRanking" DESC,
    "updatedAt" DESC
  LIMIT :limit
  OFFSET :offset;
  `;
    const countSql = `
    SELECT COUNT(id)
    FROM documents
    WHERE ${whereClause}
  `;
    const queryReplacements = {
      teamId: user.teamId,
      userId: user.id,
      collaboratorIds: options.collaboratorIds,
      query: wildcardQuery,
      collectionIds,
      dateFilter,
      snippetMinWords,
      snippetMaxWords
    };
    const resultsQuery = this.sequelize.query(selectSql, {
      type: _sequelize.QueryTypes.SELECT,
      replacements: { ...queryReplacements,
        limit,
        offset
      }
    });
    const countQuery = this.sequelize.query(countSql, {
      type: _sequelize.QueryTypes.SELECT,
      replacements: queryReplacements
    });
    const [results, [{
      count
    }]] = await Promise.all([resultsQuery, countQuery]); // Final query to get associated document data

    const documents = await this.scope(["withoutState", "withDrafts", {
      method: ["withViews", user.id]
    }, {
      method: ["withCollectionPermissions", user.id]
    }]).findAll({
      where: {
        teamId: user.teamId,
        id: (0, _lodash.map)(results, "id")
      }
    });
    return {
      results: (0, _lodash.map)(results, result => ({
        ranking: result.searchRanking,
        context: (0, _removeMarkdown.default)((0, _unescape.default)(result.searchContext), {
          stripHTML: false
        }),
        document: (0, _lodash.find)(documents, {
          id: result.id
        })
      })),
      totalCount: count
    };
  } // instance methods


}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "urlId", [_sequelizeTypescript.PrimaryKey, _sequelizeTypescript.Column, _dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "title", [_dec5, _sequelizeTypescript.Column, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "previousTitles", [_dec7, _dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "version", [_dec9, _dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "template", [_sequelizeTypescript.Column, _dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "fullWidth", [_sequelizeTypescript.Column, _dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "editorVersion", [_sequelizeTypescript.Column, _dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "emoji", [_sequelizeTypescript.Column, _dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "text", [_dec15, _dec16], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "state", [_dec17, _dec18], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "isWelcome", [_dec19, _sequelizeTypescript.Column, _dec20], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "revisionCount", [_dec21, _dec22, _dec23], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "archivedAt", [_sequelizeTypescript.Column, _dec24], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "publishedAt", [_sequelizeTypescript.Column, _dec25], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "collaboratorIds", [_dec26, _dec27], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return [];
  }
}), _applyDecoratedDescriptor(_class2, "updateTitleInCollectionStructure", [_sequelizeTypescript.BeforeSave, _dec28, _dec29], Object.getOwnPropertyDescriptor(_class2, "updateTitleInCollectionStructure"), _class2), _applyDecoratedDescriptor(_class2, "addDocumentToCollectionStructure", [_sequelizeTypescript.AfterCreate, _dec30, _dec31], Object.getOwnPropertyDescriptor(_class2, "addDocumentToCollectionStructure"), _class2), _applyDecoratedDescriptor(_class2, "createUrlId", [_sequelizeTypescript.BeforeValidate, _dec32, _dec33], Object.getOwnPropertyDescriptor(_class2, "createUrlId"), _class2), _applyDecoratedDescriptor(_class2, "setDocumentVersion", [_sequelizeTypescript.BeforeCreate, _dec34, _dec35], Object.getOwnPropertyDescriptor(_class2, "setDocumentVersion"), _class2), _applyDecoratedDescriptor(_class2, "processUpdate", [_sequelizeTypescript.BeforeUpdate, _dec36, _dec37], Object.getOwnPropertyDescriptor(_class2, "processUpdate"), _class2), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "parentDocument", [_dec38, _dec39], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "parentDocumentId", [_dec40, _dec41, _dec42], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "updatedBy", [_dec43, _dec44], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor19 = _applyDecoratedDescriptor(_class2.prototype, "lastModifiedById", [_dec45, _dec46, _dec47], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor20 = _applyDecoratedDescriptor(_class2.prototype, "createdBy", [_dec48, _dec49], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor21 = _applyDecoratedDescriptor(_class2.prototype, "createdById", [_dec50, _dec51, _dec52], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor22 = _applyDecoratedDescriptor(_class2.prototype, "document", [_dec53, _dec54], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor23 = _applyDecoratedDescriptor(_class2.prototype, "templateId", [_dec55, _dec56, _dec57], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor24 = _applyDecoratedDescriptor(_class2.prototype, "team", [_dec58, _dec59], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor25 = _applyDecoratedDescriptor(_class2.prototype, "teamId", [_dec60, _dec61, _dec62], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor26 = _applyDecoratedDescriptor(_class2.prototype, "collection", [_dec63, _dec64], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor27 = _applyDecoratedDescriptor(_class2.prototype, "collectionId", [_dec65, _dec66, _dec67], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor28 = _applyDecoratedDescriptor(_class2.prototype, "revisions", [_dec68, _dec69], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor29 = _applyDecoratedDescriptor(_class2.prototype, "backlinks", [_dec70, _dec71], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor30 = _applyDecoratedDescriptor(_class2.prototype, "starred", [_dec72, _dec73], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor31 = _applyDecoratedDescriptor(_class2.prototype, "views", [_dec74, _dec75], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class) || _class) || _class) || _class);

function escape(query) {
  // replace "\" with escaped "\\" because sequelize.escape doesn't do it
  // https://github.com/sequelize/sequelize/issues/2950
  return Document.sequelize.escape(query).replace(/\\/g, "\\\\");
}

var _default = Document;
exports.default = _default;