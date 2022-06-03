"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _sequelizeTypescript = require("sequelize-typescript");

var _s = require("./../utils/s3");

var _Document = _interopRequireDefault(require("./Document"));

var _Team = _interopRequireDefault(require("./Team"));

var _User = _interopRequireDefault(require("./User"));

var _BaseModel = _interopRequireDefault(require("./base/BaseModel"));

var _Fix = _interopRequireDefault(require("./decorators/Fix"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let Attachment = (_dec = (0, _sequelizeTypescript.Table)({
  tableName: "attachments",
  modelName: "attachment"
}), _dec2 = Reflect.metadata("design:type", String), _dec3 = Reflect.metadata("design:type", String), _dec4 = Reflect.metadata("design:type", String), _dec5 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.BIGINT), _dec6 = Reflect.metadata("design:type", Number), _dec7 = (0, _sequelizeTypescript.Default)("public-read"), _dec8 = (0, _sequelizeTypescript.IsIn)([["private", "public-read"]]), _dec9 = Reflect.metadata("design:type", String), _dec10 = Reflect.metadata("design:type", Function), _dec11 = Reflect.metadata("design:paramtypes", [Object]), _dec12 = (0, _sequelizeTypescript.BelongsTo)(() => _Team.default, "teamId"), _dec13 = Reflect.metadata("design:type", typeof _Team.default === "undefined" ? Object : _Team.default), _dec14 = (0, _sequelizeTypescript.ForeignKey)(() => _Team.default), _dec15 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.UUID), _dec16 = Reflect.metadata("design:type", String), _dec17 = (0, _sequelizeTypescript.BelongsTo)(() => _Document.default, "documentId"), _dec18 = Reflect.metadata("design:type", typeof _Document.default === "undefined" ? Object : _Document.default), _dec19 = (0, _sequelizeTypescript.ForeignKey)(() => _Document.default), _dec20 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.UUID), _dec21 = Reflect.metadata("design:type", String), _dec22 = (0, _sequelizeTypescript.BelongsTo)(() => _User.default, "userId"), _dec23 = Reflect.metadata("design:type", typeof _User.default === "undefined" ? Object : _User.default), _dec24 = (0, _sequelizeTypescript.ForeignKey)(() => _User.default), _dec25 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.UUID), _dec26 = Reflect.metadata("design:type", String), _dec(_class = (0, _Fix.default)(_class = (_class2 = class Attachment extends _BaseModel.default {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "key", _descriptor, this);

    _initializerDefineProperty(this, "url", _descriptor2, this);

    _initializerDefineProperty(this, "contentType", _descriptor3, this);

    _initializerDefineProperty(this, "size", _descriptor4, this);

    _initializerDefineProperty(this, "acl", _descriptor5, this);

    _initializerDefineProperty(this, "team", _descriptor6, this);

    _initializerDefineProperty(this, "teamId", _descriptor7, this);

    _initializerDefineProperty(this, "document", _descriptor8, this);

    _initializerDefineProperty(this, "documentId", _descriptor9, this);

    _initializerDefineProperty(this, "user", _descriptor10, this);

    _initializerDefineProperty(this, "userId", _descriptor11, this);
  }

  // getters
  get name() {
    return _path.default.parse(this.key).base;
  }

  get redirectUrl() {
    return `/api/attachments.redirect?id=${this.id}`;
  }

  get isPrivate() {
    return this.acl === "private";
  }

  get buffer() {
    return (0, _s.getFileByKey)(this.key);
  }
  /**
   * Use this instead of url which will be deleted soon, the column is unneccessary
   * and was not updated with the migraiton to the new s3 bucket.
   */


  get canonicalUrl() {
    return `${(0, _s.publicS3Endpoint)()}/${this.key}`;
  } // hooks


  static async deleteAttachmentFromS3(model) {
    await (0, _s.deleteFromS3)(model.key);
  } // associations


  static async findAllInBatches(query, callback) {
    if (!query.offset) {
      query.offset = 0;
    }

    if (!query.limit) {
      query.limit = 10;
    }

    let results;

    do {
      results = await this.findAll(query);
      await callback(results, query);
      query.offset += query.limit;
    } while (results.length >= query.limit);
  }

}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "key", [_sequelizeTypescript.Column, _dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "url", [_sequelizeTypescript.Column, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "contentType", [_sequelizeTypescript.Column, _dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "size", [_dec5, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "acl", [_dec7, _dec8, _sequelizeTypescript.Column, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2, "deleteAttachmentFromS3", [_sequelizeTypescript.BeforeDestroy, _dec10, _dec11], Object.getOwnPropertyDescriptor(_class2, "deleteAttachmentFromS3"), _class2), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "team", [_dec12, _dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "teamId", [_dec14, _dec15, _dec16], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "document", [_dec17, _dec18], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "documentId", [_dec19, _dec20, _dec21], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "user", [_dec22, _dec23], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "userId", [_dec24, _dec25, _dec26], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class) || _class);
var _default = Attachment;
exports.default = _default;