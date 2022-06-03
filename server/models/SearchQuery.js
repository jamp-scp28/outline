"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelizeTypescript = require("sequelize-typescript");

var _Team = _interopRequireDefault(require("./Team"));

var _User = _interopRequireDefault(require("./User"));

var _Fix = _interopRequireDefault(require("./decorators/Fix"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let SearchQuery = (_dec = (0, _sequelizeTypescript.Table)({
  tableName: "search_queries",
  modelName: "search_query",
  updatedAt: false
}), _dec2 = (0, _sequelizeTypescript.IsUUID)(4), _dec3 = (0, _sequelizeTypescript.Default)(_sequelizeTypescript.DataType.UUIDV4), _dec4 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.UUID), _dec5 = Reflect.metadata("design:type", String), _dec6 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec7 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.ENUM("slack", "app", "api")), _dec8 = Reflect.metadata("design:type", String), _dec9 = Reflect.metadata("design:type", Number), _dec10 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.STRING), _dec11 = Reflect.metadata("design:type", Function), _dec12 = Reflect.metadata("design:paramtypes", [String]), _dec13 = (0, _sequelizeTypescript.BelongsTo)(() => _User.default, "userId"), _dec14 = Reflect.metadata("design:type", typeof _User.default === "undefined" ? Object : _User.default), _dec15 = (0, _sequelizeTypescript.ForeignKey)(() => _User.default), _dec16 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.UUID), _dec17 = Reflect.metadata("design:type", String), _dec18 = (0, _sequelizeTypescript.BelongsTo)(() => _Team.default, "teamId"), _dec19 = Reflect.metadata("design:type", typeof _Team.default === "undefined" ? Object : _Team.default), _dec20 = (0, _sequelizeTypescript.ForeignKey)(() => _Team.default), _dec21 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.UUID), _dec22 = Reflect.metadata("design:type", String), _dec(_class = (0, _Fix.default)(_class = (_class2 = class SearchQuery extends _sequelizeTypescript.Model {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "id", _descriptor, this);

    _initializerDefineProperty(this, "createdAt", _descriptor2, this);

    _initializerDefineProperty(this, "source", _descriptor3, this);

    _initializerDefineProperty(this, "results", _descriptor4, this);

    _initializerDefineProperty(this, "user", _descriptor5, this);

    _initializerDefineProperty(this, "userId", _descriptor6, this);

    _initializerDefineProperty(this, "team", _descriptor7, this);

    _initializerDefineProperty(this, "teamId", _descriptor8, this);
  }

  set query(value) {
    this.setDataValue("query", value.substring(0, 255));
  }

  get query() {
    return this.getDataValue("query");
  } // associations


}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "id", [_dec2, _sequelizeTypescript.PrimaryKey, _dec3, _dec4, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "createdAt", [_sequelizeTypescript.CreatedAt, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "source", [_dec7, _dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "results", [_sequelizeTypescript.Column, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "query", [_dec10, _dec11, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "query"), _class2.prototype), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "user", [_dec13, _dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "userId", [_dec15, _dec16, _dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "team", [_dec18, _dec19], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "teamId", [_dec20, _dec21, _dec22], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class) || _class);
var _default = SearchQuery;
exports.default = _default;