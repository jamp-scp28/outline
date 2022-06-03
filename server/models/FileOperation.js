"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.FileOperationType = exports.FileOperationState = exports.FileOperationFormat = void 0;

var _sequelizeTypescript = require("sequelize-typescript");

var _s = require("./../utils/s3");

var _Collection = _interopRequireDefault(require("./Collection"));

var _Team = _interopRequireDefault(require("./Team"));

var _User = _interopRequireDefault(require("./User"));

var _BaseModel = _interopRequireDefault(require("./base/BaseModel"));

var _Fix = _interopRequireDefault(require("./decorators/Fix"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let FileOperationType;
exports.FileOperationType = FileOperationType;

(function (FileOperationType) {
  FileOperationType["Import"] = "import";
  FileOperationType["Export"] = "export";
})(FileOperationType || (exports.FileOperationType = FileOperationType = {}));

let FileOperationFormat;
exports.FileOperationFormat = FileOperationFormat;

(function (FileOperationFormat) {
  FileOperationFormat["MarkdownZip"] = "outline-markdown";
  FileOperationFormat["Notion"] = "notion";
})(FileOperationFormat || (exports.FileOperationFormat = FileOperationFormat = {}));

let FileOperationState;
exports.FileOperationState = FileOperationState;

(function (FileOperationState) {
  FileOperationState["Creating"] = "creating";
  FileOperationState["Uploading"] = "uploading";
  FileOperationState["Complete"] = "complete";
  FileOperationState["Error"] = "error";
  FileOperationState["Expired"] = "expired";
})(FileOperationState || (exports.FileOperationState = FileOperationState = {}));

let FileOperation = (_dec = (0, _sequelizeTypescript.DefaultScope)(() => ({
  include: [{
    model: _User.default,
    as: "user",
    paranoid: false
  }, {
    model: _Collection.default,
    as: "collection",
    paranoid: false
  }]
})), _dec2 = (0, _sequelizeTypescript.Table)({
  tableName: "file_operations",
  modelName: "file_operation"
}), _dec3 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.ENUM("import", "export")), _dec4 = Reflect.metadata("design:type", typeof FileOperationType === "undefined" ? Object : FileOperationType), _dec5 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.STRING), _dec6 = Reflect.metadata("design:type", typeof FileOperationFormat === "undefined" ? Object : FileOperationFormat), _dec7 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.ENUM("creating", "uploading", "complete", "error", "expired")), _dec8 = Reflect.metadata("design:type", typeof FileOperationState === "undefined" ? Object : FileOperationState), _dec9 = Reflect.metadata("design:type", String), _dec10 = Reflect.metadata("design:type", String), _dec11 = Reflect.metadata("design:type", String), _dec12 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.BIGINT), _dec13 = Reflect.metadata("design:type", Number), _dec14 = Reflect.metadata("design:type", Function), _dec15 = Reflect.metadata("design:paramtypes", [Object]), _dec16 = (0, _sequelizeTypescript.BelongsTo)(() => _User.default, "userId"), _dec17 = Reflect.metadata("design:type", typeof _User.default === "undefined" ? Object : _User.default), _dec18 = (0, _sequelizeTypescript.ForeignKey)(() => _User.default), _dec19 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.UUID), _dec20 = Reflect.metadata("design:type", String), _dec21 = (0, _sequelizeTypescript.BelongsTo)(() => _Team.default, "teamId"), _dec22 = Reflect.metadata("design:type", typeof _Team.default === "undefined" ? Object : _Team.default), _dec23 = (0, _sequelizeTypescript.ForeignKey)(() => _Team.default), _dec24 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.UUID), _dec25 = Reflect.metadata("design:type", String), _dec26 = (0, _sequelizeTypescript.BelongsTo)(() => _Collection.default, "collectionId"), _dec27 = Reflect.metadata("design:type", typeof _Collection.default === "undefined" ? Object : _Collection.default), _dec28 = (0, _sequelizeTypescript.ForeignKey)(() => _Collection.default), _dec29 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.UUID), _dec30 = Reflect.metadata("design:type", String), _dec(_class = _dec2(_class = (0, _Fix.default)(_class = (_class2 = class FileOperation extends _BaseModel.default {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "type", _descriptor, this);

    _initializerDefineProperty(this, "format", _descriptor2, this);

    _initializerDefineProperty(this, "state", _descriptor3, this);

    _initializerDefineProperty(this, "key", _descriptor4, this);

    _initializerDefineProperty(this, "url", _descriptor5, this);

    _initializerDefineProperty(this, "error", _descriptor6, this);

    _initializerDefineProperty(this, "size", _descriptor7, this);

    _defineProperty(this, "expire", async function () {
      this.state = "expired";
      await (0, _s.deleteFromS3)(this.key);
      await this.save();
    });

    _initializerDefineProperty(this, "user", _descriptor8, this);

    _initializerDefineProperty(this, "userId", _descriptor9, this);

    _initializerDefineProperty(this, "team", _descriptor10, this);

    _initializerDefineProperty(this, "teamId", _descriptor11, this);

    _initializerDefineProperty(this, "collection", _descriptor12, this);

    _initializerDefineProperty(this, "collectionId", _descriptor13, this);
  }

  get buffer() {
    return (0, _s.getFileByKey)(this.key);
  } // hooks


  static async deleteFileFromS3(model) {
    await (0, _s.deleteFromS3)(model.key);
  } // associations


}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "type", [_dec3, _dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "format", [_dec5, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "state", [_dec7, _dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "key", [_sequelizeTypescript.Column, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "url", [_sequelizeTypescript.Column, _dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "error", [_sequelizeTypescript.Column, _dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "size", [_dec12, _dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2, "deleteFileFromS3", [_sequelizeTypescript.BeforeDestroy, _dec14, _dec15], Object.getOwnPropertyDescriptor(_class2, "deleteFileFromS3"), _class2), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "user", [_dec16, _dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "userId", [_dec18, _dec19, _dec20], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "team", [_dec21, _dec22], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "teamId", [_dec23, _dec24, _dec25], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "collection", [_dec26, _dec27], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "collectionId", [_dec28, _dec29, _dec30], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class) || _class) || _class);
var _default = FileOperation;
exports.default = _default;