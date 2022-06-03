"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dateFns = require("date-fns");

var _sequelize = require("sequelize");

var _sequelizeTypescript = require("sequelize-typescript");

var _constants = require("./../../shared/constants");

var _Document = _interopRequireDefault(require("./Document"));

var _User = _interopRequireDefault(require("./User"));

var _BaseModel = _interopRequireDefault(require("./base/BaseModel"));

var _Fix = _interopRequireDefault(require("./decorators/Fix"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let View = (_dec = (0, _sequelizeTypescript.Table)({
  tableName: "views",
  modelName: "view"
}), _dec2 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec3 = (0, _sequelizeTypescript.Default)(1), _dec4 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.INTEGER), _dec5 = Reflect.metadata("design:type", Number), _dec6 = (0, _sequelizeTypescript.BelongsTo)(() => _User.default, "userId"), _dec7 = Reflect.metadata("design:type", typeof _User.default === "undefined" ? Object : _User.default), _dec8 = (0, _sequelizeTypescript.ForeignKey)(() => _User.default), _dec9 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.UUID), _dec10 = Reflect.metadata("design:type", String), _dec11 = (0, _sequelizeTypescript.BelongsTo)(() => _Document.default, "documentId"), _dec12 = Reflect.metadata("design:type", typeof _Document.default === "undefined" ? Object : _Document.default), _dec13 = (0, _sequelizeTypescript.ForeignKey)(() => _Document.default), _dec14 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.UUID), _dec15 = Reflect.metadata("design:type", String), _dec(_class = (0, _Fix.default)(_class = (_class2 = class View extends _BaseModel.default {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "lastEditingAt", _descriptor, this);

    _initializerDefineProperty(this, "count", _descriptor2, this);

    _initializerDefineProperty(this, "user", _descriptor3, this);

    _initializerDefineProperty(this, "userId", _descriptor4, this);

    _initializerDefineProperty(this, "document", _descriptor5, this);

    _initializerDefineProperty(this, "documentId", _descriptor6, this);
  }

  static async incrementOrCreate(where) {
    const [model, created] = await this.findOrCreate({
      where
    });

    if (!created) {
      model.count += 1;
      model.save();
    }

    return model;
  }

  static async findByDocument(documentId, {
    includeSuspended
  }) {
    return this.findAll({
      where: {
        documentId
      },
      order: [["updatedAt", "DESC"]],
      include: [{
        model: _User.default,
        paranoid: false,
        required: true,
        ...(includeSuspended ? {} : {
          where: {
            suspendedAt: {
              [_sequelize.Op.is]: null
            }
          }
        })
      }]
    });
  }

  static async findRecentlyEditingByDocument(documentId) {
    return this.findAll({
      where: {
        documentId,
        lastEditingAt: {
          [_sequelize.Op.gt]: (0, _dateFns.subMilliseconds)(new Date(), _constants.USER_PRESENCE_INTERVAL * 2)
        }
      },
      order: [["lastEditingAt", "DESC"]]
    });
  }

  static async touch(documentId, userId, isEditing) {
    const [view] = await this.findOrCreate({
      where: {
        userId,
        documentId
      }
    });

    if (isEditing) {
      const lastEditingAt = new Date();
      view.lastEditingAt = lastEditingAt;
      await view.save();
    }

    return view;
  }

}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "lastEditingAt", [_sequelizeTypescript.Column, _dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "count", [_dec3, _dec4, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "user", [_dec6, _dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "userId", [_dec8, _dec9, _dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "document", [_dec11, _dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "documentId", [_dec13, _dec14, _dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class) || _class);
var _default = View;
exports.default = _default;