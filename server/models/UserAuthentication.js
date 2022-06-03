"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelizeTypescript = require("sequelize-typescript");

var _AuthenticationProvider = _interopRequireDefault(require("./AuthenticationProvider"));

var _User = _interopRequireDefault(require("./User"));

var _BaseModel = _interopRequireDefault(require("./base/BaseModel"));

var _Encrypted = _interopRequireWildcard(require("./decorators/Encrypted"));

var _Fix = _interopRequireDefault(require("./decorators/Fix"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let UserAuthentication = (_dec = (0, _sequelizeTypescript.Table)({
  tableName: "user_authentications",
  modelName: "user_authentication"
}), _dec2 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.ARRAY(_sequelizeTypescript.DataType.STRING)), _dec3 = Reflect.metadata("design:type", Array), _dec4 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.BLOB), _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", []), _dec7 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.BLOB), _dec8 = Reflect.metadata("design:type", Function), _dec9 = Reflect.metadata("design:paramtypes", []), _dec10 = Reflect.metadata("design:type", String), _dec11 = (0, _sequelizeTypescript.BelongsTo)(() => _User.default, "userId"), _dec12 = Reflect.metadata("design:type", typeof _User.default === "undefined" ? Object : _User.default), _dec13 = (0, _sequelizeTypescript.ForeignKey)(() => _User.default), _dec14 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.UUID), _dec15 = Reflect.metadata("design:type", String), _dec16 = (0, _sequelizeTypescript.BelongsTo)(() => _AuthenticationProvider.default, "providerId"), _dec17 = Reflect.metadata("design:type", typeof _AuthenticationProvider.default === "undefined" ? Object : _AuthenticationProvider.default), _dec18 = (0, _sequelizeTypescript.ForeignKey)(() => _AuthenticationProvider.default), _dec19 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.UUID), _dec20 = Reflect.metadata("design:type", String), _dec(_class = (0, _Fix.default)(_class = (_class2 = class UserAuthentication extends _BaseModel.default {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "scopes", _descriptor, this);

    _initializerDefineProperty(this, "providerId", _descriptor2, this);

    _initializerDefineProperty(this, "user", _descriptor3, this);

    _initializerDefineProperty(this, "userId", _descriptor4, this);

    _initializerDefineProperty(this, "authenticationProvider", _descriptor5, this);

    _initializerDefineProperty(this, "authenticationProviderId", _descriptor6, this);
  }

  get accessToken() {
    return (0, _Encrypted.getEncryptedColumn)(this, "accessToken");
  }

  set accessToken(value) {
    (0, _Encrypted.setEncryptedColumn)(this, "accessToken", value);
  }

  get refreshToken() {
    return (0, _Encrypted.getEncryptedColumn)(this, "refreshToken");
  }

  set refreshToken(value) {
    (0, _Encrypted.setEncryptedColumn)(this, "refreshToken", value);
  }

}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "scopes", [_dec2, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "accessToken", [_dec4, _Encrypted.default, _dec5, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "accessToken"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "refreshToken", [_dec7, _Encrypted.default, _dec8, _dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "refreshToken"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "providerId", [_sequelizeTypescript.Column, _dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "user", [_dec11, _dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "userId", [_dec13, _dec14, _dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "authenticationProvider", [_dec16, _dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "authenticationProviderId", [_dec18, _sequelizeTypescript.Unique, _dec19, _dec20], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class) || _class);
var _default = UserAuthentication;
exports.default = _default;