"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelizeTypescript = require("sequelize-typescript");

var _Collection = _interopRequireDefault(require("./Collection"));

var _User = _interopRequireDefault(require("./User"));

var _Fix = _interopRequireDefault(require("./decorators/Fix"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let CollectionUser = (_dec = (0, _sequelizeTypescript.Table)({
  tableName: "collection_users",
  modelName: "collection_user"
}), _dec2 = (0, _sequelizeTypescript.Default)("read_write"), _dec3 = (0, _sequelizeTypescript.IsIn)([["read", "read_write", "maintainer"]]), _dec4 = Reflect.metadata("design:type", String), _dec5 = (0, _sequelizeTypescript.BelongsTo)(() => _Collection.default, "collectionId"), _dec6 = Reflect.metadata("design:type", typeof _Collection.default === "undefined" ? Object : _Collection.default), _dec7 = (0, _sequelizeTypescript.ForeignKey)(() => _Collection.default), _dec8 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.UUID), _dec9 = Reflect.metadata("design:type", String), _dec10 = (0, _sequelizeTypescript.BelongsTo)(() => _User.default, "userId"), _dec11 = Reflect.metadata("design:type", typeof _User.default === "undefined" ? Object : _User.default), _dec12 = (0, _sequelizeTypescript.ForeignKey)(() => _User.default), _dec13 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.UUID), _dec14 = Reflect.metadata("design:type", String), _dec15 = (0, _sequelizeTypescript.BelongsTo)(() => _User.default, "createdById"), _dec16 = Reflect.metadata("design:type", typeof _User.default === "undefined" ? Object : _User.default), _dec17 = (0, _sequelizeTypescript.ForeignKey)(() => _User.default), _dec18 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.UUID), _dec19 = Reflect.metadata("design:type", String), _dec(_class = (0, _Fix.default)(_class = (_class2 = class CollectionUser extends _sequelizeTypescript.Model {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "permission", _descriptor, this);

    _initializerDefineProperty(this, "collection", _descriptor2, this);

    _initializerDefineProperty(this, "collectionId", _descriptor3, this);

    _initializerDefineProperty(this, "user", _descriptor4, this);

    _initializerDefineProperty(this, "userId", _descriptor5, this);

    _initializerDefineProperty(this, "createdBy", _descriptor6, this);

    _initializerDefineProperty(this, "createdById", _descriptor7, this);
  }

}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "permission", [_dec2, _dec3, _sequelizeTypescript.Column, _dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "collection", [_dec5, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "collectionId", [_dec7, _dec8, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "user", [_dec10, _dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "userId", [_dec12, _dec13, _dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "createdBy", [_dec15, _dec16], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "createdById", [_dec17, _dec18, _dec19], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class) || _class);
var _default = CollectionUser;
exports.default = _default;