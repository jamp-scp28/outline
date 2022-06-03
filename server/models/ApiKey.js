"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _randomstring = _interopRequireDefault(require("randomstring"));

var _sequelizeTypescript = require("sequelize-typescript");

var _User = _interopRequireDefault(require("./User"));

var _ParanoidModel = _interopRequireDefault(require("./base/ParanoidModel"));

var _Fix = _interopRequireDefault(require("./decorators/Fix"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let ApiKey = (_dec = (0, _sequelizeTypescript.Table)({
  tableName: "apiKeys",
  modelName: "apiKey"
}), _dec2 = Reflect.metadata("design:type", String), _dec3 = Reflect.metadata("design:type", String), _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [Object]), _dec6 = (0, _sequelizeTypescript.BelongsTo)(() => _User.default, "userId"), _dec7 = Reflect.metadata("design:type", typeof _User.default === "undefined" ? Object : _User.default), _dec8 = (0, _sequelizeTypescript.ForeignKey)(() => _User.default), _dec9 = Reflect.metadata("design:type", String), _dec(_class = (0, _Fix.default)(_class = (_class2 = class ApiKey extends _ParanoidModel.default {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "name", _descriptor, this);

    _initializerDefineProperty(this, "secret", _descriptor2, this);

    _initializerDefineProperty(this, "user", _descriptor3, this);

    _initializerDefineProperty(this, "userId", _descriptor4, this);
  }

  // hooks
  static async generateSecret(model) {
    if (!model.secret) {
      model.secret = _randomstring.default.generate(38);
    }
  } // associations


}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "name", [_sequelizeTypescript.Column, _dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "secret", [_sequelizeTypescript.Unique, _sequelizeTypescript.Column, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2, "generateSecret", [_sequelizeTypescript.BeforeValidate, _dec4, _dec5], Object.getOwnPropertyDescriptor(_class2, "generateSecret"), _class2), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "user", [_dec6, _dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "userId", [_dec8, _sequelizeTypescript.Column, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class) || _class);
var _default = ApiKey;
exports.default = _default;