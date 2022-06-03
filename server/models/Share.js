"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelizeTypescript = require("sequelize-typescript");

var _Collection = _interopRequireDefault(require("./Collection"));

var _Document = _interopRequireDefault(require("./Document"));

var _Team = _interopRequireDefault(require("./Team"));

var _User = _interopRequireDefault(require("./User"));

var _BaseModel = _interopRequireDefault(require("./base/BaseModel"));

var _Fix = _interopRequireDefault(require("./decorators/Fix"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let Share = (_dec = (0, _sequelizeTypescript.DefaultScope)(() => ({
  include: [{
    association: "user",
    paranoid: false
  }, {
    association: "document",
    required: false
  }, {
    association: "team"
  }]
})), _dec2 = (0, _sequelizeTypescript.Scopes)(() => ({
  withCollectionPermissions: userId => {
    return {
      include: [{
        model: _Document.default.scope("withDrafts"),
        paranoid: true,
        as: "document",
        include: [{
          attributes: ["id", "permission", "sharing", "teamId", "deletedAt"],
          model: _Collection.default.scope({
            method: ["withMembership", userId]
          }),
          as: "collection"
        }]
      }, {
        association: "user",
        paranoid: false
      }, {
        association: "team"
      }]
    };
  }
})), _dec3 = (0, _sequelizeTypescript.Table)({
  tableName: "shares",
  modelName: "share"
}), _dec4 = Reflect.metadata("design:type", Boolean), _dec5 = Reflect.metadata("design:type", Boolean), _dec6 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec7 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec8 = (0, _sequelizeTypescript.BelongsTo)(() => _User.default, "revokedById"), _dec9 = Reflect.metadata("design:type", typeof _User.default === "undefined" ? Object : _User.default), _dec10 = (0, _sequelizeTypescript.ForeignKey)(() => _User.default), _dec11 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.UUID), _dec12 = Reflect.metadata("design:type", String), _dec13 = (0, _sequelizeTypescript.BelongsTo)(() => _User.default, "userId"), _dec14 = Reflect.metadata("design:type", typeof _User.default === "undefined" ? Object : _User.default), _dec15 = (0, _sequelizeTypescript.ForeignKey)(() => _User.default), _dec16 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.UUID), _dec17 = Reflect.metadata("design:type", String), _dec18 = (0, _sequelizeTypescript.BelongsTo)(() => _Team.default, "teamId"), _dec19 = Reflect.metadata("design:type", typeof _Team.default === "undefined" ? Object : _Team.default), _dec20 = (0, _sequelizeTypescript.ForeignKey)(() => _Team.default), _dec21 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.UUID), _dec22 = Reflect.metadata("design:type", String), _dec23 = (0, _sequelizeTypescript.BelongsTo)(() => _Document.default, "documentId"), _dec24 = Reflect.metadata("design:type", typeof _Document.default === "undefined" ? Object : _Document.default), _dec25 = (0, _sequelizeTypescript.ForeignKey)(() => _Document.default), _dec26 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.UUID), _dec27 = Reflect.metadata("design:type", String), _dec(_class = _dec2(_class = _dec3(_class = (0, _Fix.default)(_class = (_class2 = class Share extends _BaseModel.default {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "published", _descriptor, this);

    _initializerDefineProperty(this, "includeChildDocuments", _descriptor2, this);

    _initializerDefineProperty(this, "revokedAt", _descriptor3, this);

    _initializerDefineProperty(this, "lastAccessedAt", _descriptor4, this);

    _initializerDefineProperty(this, "revokedBy", _descriptor5, this);

    _initializerDefineProperty(this, "revokedById", _descriptor6, this);

    _initializerDefineProperty(this, "user", _descriptor7, this);

    _initializerDefineProperty(this, "userId", _descriptor8, this);

    _initializerDefineProperty(this, "team", _descriptor9, this);

    _initializerDefineProperty(this, "teamId", _descriptor10, this);

    _initializerDefineProperty(this, "document", _descriptor11, this);

    _initializerDefineProperty(this, "documentId", _descriptor12, this);
  }

  // getters
  get isRevoked() {
    return !!this.revokedAt;
  } // associations


  revoke(userId) {
    this.revokedAt = new Date();
    this.revokedById = userId;
    return this.save();
  }

}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "published", [_sequelizeTypescript.Column, _dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "includeChildDocuments", [_sequelizeTypescript.Column, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "revokedAt", [_sequelizeTypescript.Column, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "lastAccessedAt", [_sequelizeTypescript.Column, _dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "revokedBy", [_dec8, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "revokedById", [_dec10, _dec11, _dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "user", [_dec13, _dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "userId", [_dec15, _dec16, _dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "team", [_dec18, _dec19], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "teamId", [_dec20, _dec21, _dec22], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "document", [_dec23, _dec24], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "documentId", [_dec25, _dec26, _dec27], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class) || _class) || _class) || _class);
var _default = Share;
exports.default = _default;