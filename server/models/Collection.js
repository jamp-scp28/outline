"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = require("lodash");

var _randomstring = _interopRequireDefault(require("randomstring"));

var _sequelize = require("sequelize");

var _sequelizeTypescript = require("sequelize-typescript");

var _isUUID = _interopRequireDefault(require("validator/lib/isUUID"));

var _collections = require("./../../shared/utils/collections");

var _urlHelpers = require("./../../shared/utils/urlHelpers");

var _slugify = _interopRequireDefault(require("./../utils/slugify"));

var _CollectionGroup = _interopRequireDefault(require("./CollectionGroup"));

var _CollectionUser = _interopRequireDefault(require("./CollectionUser"));

var _Document = _interopRequireDefault(require("./Document"));

var _Group = _interopRequireDefault(require("./Group"));

var _GroupUser = _interopRequireDefault(require("./GroupUser"));

var _Team = _interopRequireDefault(require("./Team"));

var _User = _interopRequireDefault(require("./User"));

var _ParanoidModel = _interopRequireDefault(require("./base/ParanoidModel"));

var _Fix = _interopRequireDefault(require("./decorators/Fix"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _dec45, _dec46, _dec47, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _class3, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let Collection = (_dec = (0, _sequelizeTypescript.Scopes)(() => ({
  withAllMemberships: {
    include: [{
      model: _CollectionUser.default,
      as: "memberships",
      required: false
    }, {
      model: _CollectionGroup.default,
      as: "collectionGroupMemberships",
      required: false,
      // use of "separate" property: sequelize breaks when there are
      // nested "includes" with alternating values for "required"
      // see https://github.com/sequelize/sequelize/issues/9869
      separate: true,
      // include for groups that are members of this collection,
      // of which userId is a member of, resulting in:
      // CollectionGroup [inner join] Group [inner join] GroupUser [where] userId
      include: [{
        model: _Group.default,
        as: "group",
        required: true,
        include: [{
          model: _GroupUser.default,
          as: "groupMemberships",
          required: true
        }]
      }]
    }]
  },
  withUser: () => ({
    include: [{
      model: _User.default,
      required: true,
      as: "user"
    }]
  }),
  withMembership: userId => ({
    include: [{
      model: _CollectionUser.default,
      as: "memberships",
      where: {
        userId
      },
      required: false
    }, {
      model: _CollectionGroup.default,
      as: "collectionGroupMemberships",
      required: false,
      // use of "separate" property: sequelize breaks when there are
      // nested "includes" with alternating values for "required"
      // see https://github.com/sequelize/sequelize/issues/9869
      separate: true,
      // include for groups that are members of this collection,
      // of which userId is a member of, resulting in:
      // CollectionGroup [inner join] Group [inner join] GroupUser [where] userId
      include: [{
        model: _Group.default,
        as: "group",
        required: true,
        include: [{
          model: _GroupUser.default,
          as: "groupMemberships",
          required: true,
          where: {
            userId
          }
        }]
      }]
    }]
  })
})), _dec2 = (0, _sequelizeTypescript.Table)({
  tableName: "collections",
  modelName: "collection"
}), _dec3 = Reflect.metadata("design:type", String), _dec4 = Reflect.metadata("design:type", String), _dec5 = Reflect.metadata("design:type", String), _dec6 = Reflect.metadata("design:type", String), _dec7 = Reflect.metadata("design:type", String), _dec8 = Reflect.metadata("design:type", String), _dec9 = (0, _sequelizeTypescript.IsIn)([["read", "read_write"]]), _dec10 = Reflect.metadata("design:type", String), _dec11 = (0, _sequelizeTypescript.Default)(false), _dec12 = Reflect.metadata("design:type", Boolean), _dec13 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.JSONB), _dec14 = Reflect.metadata("design:type", Array), _dec15 = (0, _sequelizeTypescript.Default)(true), _dec16 = Reflect.metadata("design:type", Boolean), _dec17 = (0, _sequelizeTypescript.Default)({
  field: "title",
  direction: "asc"
}), _dec18 = (0, _sequelizeTypescript.Column)({
  type: _sequelizeTypescript.DataType.JSONB,
  validate: {
    isSort(value) {
      if (typeof value !== "object" || !value.direction || !value.field || Object.keys(value).length !== 2) {
        throw new Error("Sort must be an object with field,direction");
      }

      if (!["asc", "desc"].includes(value.direction)) {
        throw new Error("Sort direction must be one of asc,desc");
      }

      if (!["title", "index"].includes(value.field)) {
        throw new Error("Sort field must be one of title,index");
      }
    }

  }
}), _dec19 = Reflect.metadata("design:type", typeof Sort === "undefined" ? Object : Sort), _dec20 = Reflect.metadata("design:type", Function), _dec21 = Reflect.metadata("design:paramtypes", [Object]), _dec22 = Reflect.metadata("design:type", Function), _dec23 = Reflect.metadata("design:paramtypes", [Object]), _dec24 = Reflect.metadata("design:type", Function), _dec25 = Reflect.metadata("design:paramtypes", [Object]), _dec26 = Reflect.metadata("design:type", Function), _dec27 = Reflect.metadata("design:paramtypes", [Object, Object]), _dec28 = (0, _sequelizeTypescript.HasMany)(() => _Document.default, "collectionId"), _dec29 = Reflect.metadata("design:type", Array), _dec30 = (0, _sequelizeTypescript.HasMany)(() => _CollectionUser.default, "collectionId"), _dec31 = Reflect.metadata("design:type", Array), _dec32 = (0, _sequelizeTypescript.HasMany)(() => _CollectionGroup.default, "collectionId"), _dec33 = Reflect.metadata("design:type", Array), _dec34 = (0, _sequelizeTypescript.BelongsToMany)(() => _User.default, () => _CollectionUser.default), _dec35 = Reflect.metadata("design:type", Array), _dec36 = (0, _sequelizeTypescript.BelongsToMany)(() => _Group.default, () => _CollectionGroup.default), _dec37 = Reflect.metadata("design:type", Array), _dec38 = (0, _sequelizeTypescript.BelongsTo)(() => _User.default, "createdById"), _dec39 = Reflect.metadata("design:type", typeof _User.default === "undefined" ? Object : _User.default), _dec40 = (0, _sequelizeTypescript.ForeignKey)(() => _User.default), _dec41 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.UUID), _dec42 = Reflect.metadata("design:type", String), _dec43 = (0, _sequelizeTypescript.BelongsTo)(() => _Team.default, "teamId"), _dec44 = Reflect.metadata("design:type", typeof _Team.default === "undefined" ? Object : _Team.default), _dec45 = (0, _sequelizeTypescript.ForeignKey)(() => _Team.default), _dec46 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.UUID), _dec47 = Reflect.metadata("design:type", String), _dec(_class = _dec2(_class = (0, _Fix.default)(_class = (_class2 = (_temp = _class3 = class Collection extends _ParanoidModel.default {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "urlId", _descriptor, this);

    _initializerDefineProperty(this, "name", _descriptor2, this);

    _initializerDefineProperty(this, "description", _descriptor3, this);

    _initializerDefineProperty(this, "icon", _descriptor4, this);

    _initializerDefineProperty(this, "color", _descriptor5, this);

    _initializerDefineProperty(this, "index", _descriptor6, this);

    _initializerDefineProperty(this, "permission", _descriptor7, this);

    _initializerDefineProperty(this, "maintainerApprovalRequired", _descriptor8, this);

    _initializerDefineProperty(this, "documentStructure", _descriptor9, this);

    _initializerDefineProperty(this, "sharing", _descriptor10, this);

    _initializerDefineProperty(this, "sort", _descriptor11, this);

    _initializerDefineProperty(this, "documents", _descriptor12, this);

    _initializerDefineProperty(this, "memberships", _descriptor13, this);

    _initializerDefineProperty(this, "collectionGroupMemberships", _descriptor14, this);

    _initializerDefineProperty(this, "users", _descriptor15, this);

    _initializerDefineProperty(this, "groups", _descriptor16, this);

    _initializerDefineProperty(this, "user", _descriptor17, this);

    _initializerDefineProperty(this, "createdById", _descriptor18, this);

    _initializerDefineProperty(this, "team", _descriptor19, this);

    _initializerDefineProperty(this, "teamId", _descriptor20, this);

    _defineProperty(this, "getDocumentTree", documentId => {
      if (!this.documentStructure) {
        return null;
      }

      let result;

      const loopChildren = documents => {
        if (result) {
          return;
        }

        documents.forEach(document => {
          if (result) {
            return;
          }

          if (document.id === documentId) {
            result = document;
          } else {
            loopChildren(document.children);
          }
        });
      }; // Technically, sorting the children is presenter-layer work...
      // but the only place it's used passes straight into an API response
      // so the extra indirection is not worthwhile


      loopChildren(this.documentStructure); // if the document is a draft loopChildren will not find it in the structure

      if (!result) {
        return null;
      }

      return { ...result,
        children: (0, _collections.sortNavigationNodes)(result.children, this.sort)
      };
    });

    _defineProperty(this, "deleteDocument", async function (document, options) {
      await this.removeDocumentInStructure(document, options); // Helper to destroy all child documents for a document

      const loopChildren = async (documentId, opts) => {
        const childDocuments = await _Document.default.findAll({
          where: {
            parentDocumentId: documentId
          }
        });
        childDocuments.forEach(async child => {
          await loopChildren(child.id, opts);
          await child.destroy(opts);
        });
      };

      await loopChildren(document.id, options);
      await document.destroy(options);
    });

    _defineProperty(this, "removeDocumentInStructure", async function (document, options) {
      if (!this.documentStructure) {
        return;
      }

      let result;

      const removeFromChildren = async (children, id) => {
        children = await Promise.all(children.map(async childDocument => {
          return { ...childDocument,
            children: await removeFromChildren(childDocument.children, id)
          };
        }));
        const match = (0, _lodash.find)(children, {
          id
        });

        if (match) {
          if (!result) {
            result = [match, (0, _lodash.findIndex)(children, {
              id
            })];
          }

          (0, _lodash.remove)(children, {
            id
          });
        }

        return children;
      };

      this.documentStructure = await removeFromChildren(this.documentStructure, document.id); // Sequelize doesn't seem to set the value with splice on JSONB field
      // https://github.com/sequelize/sequelize/blob/e1446837196c07b8ff0c23359b958d68af40fd6d/src/model.js#L3937

      this.changed("documentStructure", true);

      if ((options === null || options === void 0 ? void 0 : options.save) !== false) {
        await this.save({ ...options,
          fields: ["documentStructure"]
        });
      }

      return result;
    });

    _defineProperty(this, "getDocumentParents", function (documentId) {
      let result;

      const loopChildren = (documents, path = []) => {
        if (result) {
          return;
        }

        documents.forEach(document => {
          if (document.id === documentId) {
            result = path;
          } else {
            loopChildren(document.children, [...path, document.id]);
          }
        });
      };

      if (this.documentStructure) {
        loopChildren(this.documentStructure);
      }

      return result;
    });

    _defineProperty(this, "updateDocument", async function (updatedDocument, options) {
      if (!this.documentStructure) {
        return;
      }

      const {
        id
      } = updatedDocument;

      const updateChildren = documents => {
        return documents.map(document => {
          if (document.id === id) {
            document = { ...updatedDocument.toJSON(),
              children: document.children
            };
          } else {
            document.children = updateChildren(document.children);
          }

          return document;
        });
      };

      this.documentStructure = updateChildren(this.documentStructure); // Sequelize doesn't seem to set the value with splice on JSONB field
      // https://github.com/sequelize/sequelize/blob/e1446837196c07b8ff0c23359b958d68af40fd6d/src/model.js#L3937

      this.changed("documentStructure", true);
      await this.save({
        fields: ["documentStructure"],
        ...options
      });
      return this;
    });

    _defineProperty(this, "addDocumentToStructure", async function (document, index, options = {}) {
      if (!this.documentStructure) {
        this.documentStructure = [];
      } // If moving existing document with children, use existing structure


      const documentJson = { ...document.toJSON(),
        ...options.documentJson
      };

      if (!document.parentDocumentId) {
        // Note: Index is supported on DB level but it's being ignored
        // by the API presentation until we build product support for it.
        this.documentStructure.splice(index !== undefined ? index : this.documentStructure.length, 0, documentJson);
      } else {
        // Recursively place document
        const placeDocument = documentList => {
          return documentList.map(childDocument => {
            if (document.parentDocumentId === childDocument.id) {
              childDocument.children.splice(index !== undefined ? index : childDocument.children.length, 0, documentJson);
            } else {
              childDocument.children = placeDocument(childDocument.children);
            }

            return childDocument;
          });
        };

        this.documentStructure = placeDocument(this.documentStructure);
      } // Sequelize doesn't seem to set the value with splice on JSONB field
      // https://github.com/sequelize/sequelize/blob/e1446837196c07b8ff0c23359b958d68af40fd6d/src/model.js#L3937


      this.changed("documentStructure", true);

      if ((options === null || options === void 0 ? void 0 : options.save) !== false) {
        await this.save({ ...options,
          fields: ["documentStructure"]
        });
      }

      return this;
    });
  }

  // getters
  get url() {
    if (!this.name) {
      return `/collection/untitled-${this.urlId}`;
    }

    return `/collection/${(0, _slugify.default)(this.name)}-${this.urlId}`;
  } // hooks


  static async onBeforeValidate(model) {
    model.urlId = model.urlId || _randomstring.default.generate(10);
  }

  static async onBeforeSave(model) {
    if (model.icon === "collection") {
      model.icon = null;
    }
  }

  static async onAfterDestroy(model) {
    await _Document.default.destroy({
      where: {
        collectionId: model.id,
        archivedAt: {
          [_sequelize.Op.is]: null
        }
      }
    });
  }

  static async onAfterCreate(model, options) {
    if (model.permission !== "read_write") {
      return _CollectionUser.default.findOrCreate({
        where: {
          collectionId: model.id,
          userId: model.createdById
        },
        defaults: {
          permission: "read_write",
          createdById: model.createdById
        },
        transaction: options.transaction
      });
    }

    return undefined;
  } // associations


  /**
   * Returns an array of unique userIds that are members of a collection,
   * either via group or direct membership
   *
   * @param collectionId
   * @returns userIds
   */
  static async membershipUserIds(collectionId) {
    const collection = await this.scope("withAllMemberships").findByPk(collectionId);

    if (!collection) {
      return [];
    }

    const groupMemberships = collection.collectionGroupMemberships.map(cgm => cgm.group.groupMemberships).flat();
    const membershipUserIds = [...groupMemberships, ...collection.memberships].map(membership => membership.userId);
    return (0, _lodash.uniq)(membershipUserIds);
  }
  /**
   * Overrides the standard findByPk behavior to allow also querying by urlId
   *
   * @param id uuid or urlId
   * @returns collection instance
   */


  static async findByPk(id, options = {}) {
    if (typeof id !== "string") {
      return undefined;
    }

    if ((0, _isUUID.default)(id)) {
      return this.findOne({
        where: {
          id
        },
        ...options
      });
    }

    const match = id.match(_urlHelpers.SLUG_URL_REGEX);

    if (match) {
      return this.findOne({
        where: {
          urlId: match[1]
        },
        ...options
      });
    }

    return undefined;
  }
  /**
   * Find the first collection that the specified user has access to.
   *
   * @param user User object
   * @returns collection First collection in the sidebar order
   */


  static async findFirstCollectionForUser(user) {
    const id = await user.collectionIds();
    return this.findOne({
      where: {
        id
      },
      order: [// using LC_COLLATE:"C" because we need byte order to drive the sorting
      _sequelizeTypescript.Sequelize.literal('"collection"."index" collate "C"'), ["updatedAt", "DESC"]]
    });
  }

}, _defineProperty(_class3, "DEFAULT_SORT", {
  field: "index",
  direction: "asc"
}), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "urlId", [_sequelizeTypescript.Unique, _sequelizeTypescript.Column, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "name", [_sequelizeTypescript.Column, _dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "description", [_sequelizeTypescript.Column, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "icon", [_sequelizeTypescript.Column, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "color", [_sequelizeTypescript.Column, _dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "index", [_sequelizeTypescript.Column, _dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "permission", [_dec9, _sequelizeTypescript.Column, _dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "maintainerApprovalRequired", [_dec11, _sequelizeTypescript.Column, _dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "documentStructure", [_dec13, _dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "sharing", [_dec15, _sequelizeTypescript.Column, _dec16], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "sort", [_dec17, _dec18, _dec19], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2, "onBeforeValidate", [_sequelizeTypescript.BeforeValidate, _dec20, _dec21], Object.getOwnPropertyDescriptor(_class2, "onBeforeValidate"), _class2), _applyDecoratedDescriptor(_class2, "onBeforeSave", [_sequelizeTypescript.BeforeSave, _dec22, _dec23], Object.getOwnPropertyDescriptor(_class2, "onBeforeSave"), _class2), _applyDecoratedDescriptor(_class2, "onAfterDestroy", [_sequelizeTypescript.AfterDestroy, _dec24, _dec25], Object.getOwnPropertyDescriptor(_class2, "onAfterDestroy"), _class2), _applyDecoratedDescriptor(_class2, "onAfterCreate", [_sequelizeTypescript.AfterCreate, _dec26, _dec27], Object.getOwnPropertyDescriptor(_class2, "onAfterCreate"), _class2), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "documents", [_dec28, _dec29], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "memberships", [_dec30, _dec31], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "collectionGroupMemberships", [_dec32, _dec33], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "users", [_dec34, _dec35], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "groups", [_dec36, _dec37], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "user", [_dec38, _dec39], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "createdById", [_dec40, _dec41, _dec42], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor19 = _applyDecoratedDescriptor(_class2.prototype, "team", [_dec43, _dec44], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor20 = _applyDecoratedDescriptor(_class2.prototype, "teamId", [_dec45, _dec46, _dec47], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class) || _class) || _class);
var _default = Collection;
exports.default = _default;