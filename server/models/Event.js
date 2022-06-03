"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = require("sequelize");

var _sequelizeTypescript = require("sequelize-typescript");

var _queues = require("../queues");

var _Collection = _interopRequireDefault(require("./Collection"));

var _Document = _interopRequireDefault(require("./Document"));

var _Team = _interopRequireDefault(require("./Team"));

var _User = _interopRequireDefault(require("./User"));

var _BaseModel = _interopRequireDefault(require("./base/BaseModel"));

var _Fix = _interopRequireDefault(require("./decorators/Fix"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _class3, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let Event = (_dec = (0, _sequelizeTypescript.Table)({
  tableName: "events",
  modelName: "event"
}), _dec2 = (0, _sequelizeTypescript.IsUUID)(4), _dec3 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.UUID), _dec4 = Reflect.metadata("design:type", String), _dec5 = Reflect.metadata("design:type", String), _dec6 = Reflect.metadata("design:type", String), _dec7 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.JSONB), _dec8 = Reflect.metadata("design:type", typeof Record === "undefined" ? Object : Record), _dec9 = Reflect.metadata("design:type", Function), _dec10 = Reflect.metadata("design:paramtypes", [Object]), _dec11 = Reflect.metadata("design:type", Function), _dec12 = Reflect.metadata("design:paramtypes", [Object, typeof _sequelize.SaveOptions === "undefined" ? Object : _sequelize.SaveOptions]), _dec13 = (0, _sequelizeTypescript.BelongsTo)(() => _User.default, "userId"), _dec14 = Reflect.metadata("design:type", typeof _User.default === "undefined" ? Object : _User.default), _dec15 = (0, _sequelizeTypescript.ForeignKey)(() => _User.default), _dec16 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.UUID), _dec17 = Reflect.metadata("design:type", String), _dec18 = (0, _sequelizeTypescript.BelongsTo)(() => _Document.default, "documentId"), _dec19 = Reflect.metadata("design:type", typeof _Document.default === "undefined" ? Object : _Document.default), _dec20 = (0, _sequelizeTypescript.ForeignKey)(() => _Document.default), _dec21 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.UUID), _dec22 = Reflect.metadata("design:type", String), _dec23 = (0, _sequelizeTypescript.BelongsTo)(() => _User.default, "actorId"), _dec24 = Reflect.metadata("design:type", typeof _User.default === "undefined" ? Object : _User.default), _dec25 = (0, _sequelizeTypescript.ForeignKey)(() => _User.default), _dec26 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.UUID), _dec27 = Reflect.metadata("design:type", String), _dec28 = (0, _sequelizeTypescript.BelongsTo)(() => _Collection.default, "collectionId"), _dec29 = Reflect.metadata("design:type", typeof _Collection.default === "undefined" ? Object : _Collection.default), _dec30 = (0, _sequelizeTypescript.ForeignKey)(() => _Collection.default), _dec31 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.UUID), _dec32 = Reflect.metadata("design:type", String), _dec33 = (0, _sequelizeTypescript.BelongsTo)(() => _Team.default, "teamId"), _dec34 = Reflect.metadata("design:type", typeof _Team.default === "undefined" ? Object : _Team.default), _dec35 = (0, _sequelizeTypescript.ForeignKey)(() => _Team.default), _dec36 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.UUID), _dec37 = Reflect.metadata("design:type", String), _dec(_class = (0, _Fix.default)(_class = (_class2 = (_temp = _class3 = class Event extends _BaseModel.default {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "modelId", _descriptor, this);

    _initializerDefineProperty(this, "name", _descriptor2, this);

    _initializerDefineProperty(this, "ip", _descriptor3, this);

    _initializerDefineProperty(this, "data", _descriptor4, this);

    _initializerDefineProperty(this, "user", _descriptor5, this);

    _initializerDefineProperty(this, "userId", _descriptor6, this);

    _initializerDefineProperty(this, "document", _descriptor7, this);

    _initializerDefineProperty(this, "documentId", _descriptor8, this);

    _initializerDefineProperty(this, "actor", _descriptor9, this);

    _initializerDefineProperty(this, "actorId", _descriptor10, this);

    _initializerDefineProperty(this, "collection", _descriptor11, this);

    _initializerDefineProperty(this, "collectionId", _descriptor12, this);

    _initializerDefineProperty(this, "team", _descriptor13, this);

    _initializerDefineProperty(this, "teamId", _descriptor14, this);
  }

  // hooks
  static cleanupIp(model) {
    if (model.ip) {
      // cleanup IPV6 representations of IPV4 addresses
      model.ip = model.ip.replace(/^::ffff:/, "");
    }
  }

  static async enqueue(model, options) {
    if (options.transaction) {
      options.transaction.afterCommit(() => void _queues.globalEventQueue.add(model));
      return;
    }

    void _queues.globalEventQueue.add(model);
  } // associations


  /*
   * Schedule can be used to send events into the event system without recording
   * them in the database or audit trail – consider using a task instead.
   */
  static schedule(event) {
    const now = new Date();

    _queues.globalEventQueue.add(this.build({
      createdAt: now,
      updatedAt: now,
      ...event
    }));
  }

}, _defineProperty(_class3, "ACTIVITY_EVENTS", ["collections.create", "collections.delete", "collections.move", "collections.permission_changed", "documents.publish", "documents.archive", "documents.unarchive", "documents.move", "documents.delete", "documents.permanent_delete", "documents.restore", "revisions.create", "users.create"]), _defineProperty(_class3, "AUDIT_EVENTS", ["api_keys.create", "api_keys.delete", "authenticationProviders.update", "collections.create", "collections.update", "collections.permission_changed", "collections.move", "collections.add_user", "collections.remove_user", "collections.add_group", "collections.remove_group", "collections.delete", "collections.export_all", "documents.create", "documents.publish", "documents.update", "documents.archive", "documents.unarchive", "documents.move", "documents.delete", "documents.permanent_delete", "documents.restore", "groups.create", "groups.update", "groups.delete", "pins.create", "pins.update", "pins.delete", "revisions.create", "shares.create", "shares.update", "shares.revoke", "teams.update", "users.create", "users.update", "users.signin", "users.promote", "users.demote", "users.invite", "users.suspend", "users.activate", "users.delete"]), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "modelId", [_dec2, _dec3, _dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "name", [_sequelizeTypescript.Column, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "ip", [_sequelizeTypescript.IsIP, _sequelizeTypescript.Column, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "data", [_dec7, _dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2, "cleanupIp", [_sequelizeTypescript.BeforeCreate, _dec9, _dec10], Object.getOwnPropertyDescriptor(_class2, "cleanupIp"), _class2), _applyDecoratedDescriptor(_class2, "enqueue", [_sequelizeTypescript.AfterSave, _dec11, _dec12], Object.getOwnPropertyDescriptor(_class2, "enqueue"), _class2), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "user", [_dec13, _dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "userId", [_dec15, _dec16, _dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "document", [_dec18, _dec19], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "documentId", [_dec20, _dec21, _dec22], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "actor", [_dec23, _dec24], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "actorId", [_dec25, _dec26, _dec27], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "collection", [_dec28, _dec29], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "collectionId", [_dec30, _dec31, _dec32], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "team", [_dec33, _dec34], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "teamId", [_dec35, _dec36, _dec37], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class) || _class);
var _default = Event;
exports.default = _default;