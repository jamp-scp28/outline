"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.UserFlag = void 0;

var _crypto = _interopRequireDefault(require("crypto"));

var _dateFns = require("date-fns");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _sequelize = require("sequelize");

var _sequelizeTypescript = require("sequelize-typescript");

var _uuid = require("uuid");

var _i18n = require("./../../shared/i18n");

var _color = require("./../../shared/utils/color");

var _env = _interopRequireDefault(require("./../env"));

var _Logger = _interopRequireDefault(require("./../logging/Logger"));

var _s = require("./../utils/s3");

var _errors = require("../errors");

var _ApiKey = _interopRequireDefault(require("./ApiKey"));

var _Collection = _interopRequireDefault(require("./Collection"));

var _NotificationSetting = _interopRequireDefault(require("./NotificationSetting"));

var _Star = _interopRequireDefault(require("./Star"));

var _Team = _interopRequireDefault(require("./Team"));

var _UserAuthentication = _interopRequireDefault(require("./UserAuthentication"));

var _ParanoidModel = _interopRequireDefault(require("./base/ParanoidModel"));

var _Encrypted = _interopRequireWildcard(require("./decorators/Encrypted"));

var _Fix = _interopRequireDefault(require("./decorators/Fix"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _init, _init2, _init3, _init4, _class3, _temp;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

/**
 * Flags that are available for setting on the user.
 */
let UserFlag;
exports.UserFlag = UserFlag;

(function (UserFlag) {
  UserFlag["InviteSent"] = "inviteSent";
  UserFlag["InviteReminderSent"] = "inviteReminderSent";
})(UserFlag || (exports.UserFlag = UserFlag = {}));

let User = (_dec = (0, _sequelizeTypescript.Scopes)(() => ({
  withAuthentications: {
    include: [{
      model: _UserAuthentication.default,
      as: "authentications"
    }]
  },
  withTeam: {
    include: [{
      model: _Team.default,
      as: "team",
      required: true
    }]
  },
  withInvitedBy: {
    include: [{
      model: User,
      as: "invitedBy",
      required: true
    }]
  },
  invited: {
    where: {
      lastActiveAt: {
        [_sequelize.Op.is]: null
      }
    }
  }
})), _dec2 = (0, _sequelizeTypescript.Table)({
  tableName: "users",
  modelName: "user"
}), _dec3 = Reflect.metadata("design:type", String), _dec4 = Reflect.metadata("design:type", String), _dec5 = Reflect.metadata("design:type", String), _dec6 = (0, _sequelizeTypescript.Default)(false), _dec7 = Reflect.metadata("design:type", Boolean), _dec8 = (0, _sequelizeTypescript.Default)(false), _dec9 = Reflect.metadata("design:type", Boolean), _dec10 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.BLOB), _dec11 = Reflect.metadata("design:type", Function), _dec12 = Reflect.metadata("design:paramtypes", []), _dec13 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec14 = Reflect.metadata("design:type", String), _dec15 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec16 = Reflect.metadata("design:type", String), _dec17 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec18 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec19 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.JSONB), _dec20 = Reflect.metadata("design:type", Object), _dec21 = (0, _sequelizeTypescript.Default)(_env.default.DEFAULT_LANGUAGE), _dec22 = (0, _sequelizeTypescript.IsIn)([_i18n.languages]), _dec23 = Reflect.metadata("design:type", String), _dec24 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.STRING), _dec25 = Reflect.metadata("design:type", Function), _dec26 = Reflect.metadata("design:paramtypes", []), _dec27 = (0, _sequelizeTypescript.HasOne)(() => User, "suspendedById"), _dec28 = Reflect.metadata("design:type", Object), _dec29 = (0, _sequelizeTypescript.ForeignKey)(() => User), _dec30 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.UUID), _dec31 = Reflect.metadata("design:type", String), _dec32 = (0, _sequelizeTypescript.HasOne)(() => User, "invitedById"), _dec33 = Reflect.metadata("design:type", Object), _dec34 = (0, _sequelizeTypescript.ForeignKey)(() => User), _dec35 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.UUID), _dec36 = Reflect.metadata("design:type", String), _dec37 = (0, _sequelizeTypescript.BelongsTo)(() => _Team.default), _dec38 = Reflect.metadata("design:type", typeof _Team.default === "undefined" ? Object : _Team.default), _dec39 = (0, _sequelizeTypescript.ForeignKey)(() => _Team.default), _dec40 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.UUID), _dec41 = Reflect.metadata("design:type", String), _dec42 = (0, _sequelizeTypescript.HasMany)(() => _UserAuthentication.default), _dec43 = Reflect.metadata("design:type", Array), _dec(_class = _dec2(_class = (0, _Fix.default)(_class = (_class2 = (_temp = _class3 = class User extends _ParanoidModel.default {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "email", _descriptor, this);

    _initializerDefineProperty(this, "username", _descriptor2, this);

    _initializerDefineProperty(this, "name", _descriptor3, this);

    _initializerDefineProperty(this, "isAdmin", _descriptor4, this);

    _initializerDefineProperty(this, "isViewer", _descriptor5, this);

    _initializerDefineProperty(this, "lastActiveAt", _descriptor6, this);

    _initializerDefineProperty(this, "lastActiveIp", _descriptor7, this);

    _initializerDefineProperty(this, "lastSignedInAt", _descriptor8, this);

    _initializerDefineProperty(this, "lastSignedInIp", _descriptor9, this);

    _initializerDefineProperty(this, "lastSigninEmailSentAt", _descriptor10, this);

    _initializerDefineProperty(this, "suspendedAt", _descriptor11, this);

    _initializerDefineProperty(this, "flags", _descriptor12, this);

    _initializerDefineProperty(this, "language", _descriptor13, this);

    _initializerDefineProperty(this, "suspendedBy", _descriptor14, this);

    _initializerDefineProperty(this, "suspendedById", _descriptor15, this);

    _initializerDefineProperty(this, "invitedBy", _descriptor16, this);

    _initializerDefineProperty(this, "invitedById", _descriptor17, this);

    _initializerDefineProperty(this, "team", _descriptor18, this);

    _initializerDefineProperty(this, "teamId", _descriptor19, this);

    _initializerDefineProperty(this, "authentications", _descriptor20, this);

    _defineProperty(this, "setFlag", (flag, value = true) => {
      if (!this.flags) {
        this.flags = {};
      }

      this.flags[flag] = value ? 1 : 0;
      this.changed("flags", true);
      return this.flags;
    });

    _defineProperty(this, "getFlag", flag => {
      var _this$flags;

      return ((_this$flags = this.flags) === null || _this$flags === void 0 ? void 0 : _this$flags[flag]) ?? 0;
    });

    _defineProperty(this, "incrementFlag", (flag, value = 1) => {
      if (!this.flags) {
        this.flags = {};
      }

      this.flags[flag] = (this.flags[flag] ?? 0) + value;
      this.changed("flags", true);
      return this.flags;
    });

    _defineProperty(this, "collectionIds", async (options = {}) => {
      const collectionStubs = await _Collection.default.scope({
        method: ["withMembership", this.id]
      }).findAll({
        attributes: ["id", "permission"],
        where: {
          teamId: this.teamId
        },
        paranoid: true,
        ...options
      });
      return collectionStubs.filter(c => c.permission === "read" || c.permission === "read_write" || c.memberships.length > 0 || c.collectionGroupMemberships.length > 0).map(c => c.id);
    });

    _defineProperty(this, "updateActiveAt", (ip, force = false) => {
      const fiveMinutesAgo = (0, _dateFns.subMinutes)(new Date(), 5); // ensure this is updated only every few minutes otherwise
      // we'll be constantly writing to the DB as API requests happen

      if (!this.lastActiveAt || this.lastActiveAt < fiveMinutesAgo || force) {
        this.lastActiveAt = new Date();
        this.lastActiveIp = ip;
        return this.save({
          hooks: false
        });
      }

      return this;
    });

    _defineProperty(this, "updateSignedIn", ip => {
      this.lastSignedInAt = new Date();
      this.lastSignedInIp = ip;
      return this.save({
        hooks: false
      });
    });

    _defineProperty(this, "getJwtToken", expiresAt => {
      return _jsonwebtoken.default.sign({
        id: this.id,
        expiresAt: expiresAt ? expiresAt.toISOString() : undefined,
        type: "session"
      }, this.jwtSecret);
    });

    _defineProperty(this, "getTransferToken", () => {
      return _jsonwebtoken.default.sign({
        id: this.id,
        createdAt: new Date().toISOString(),
        expiresAt: (0, _dateFns.addMinutes)(new Date(), 1).toISOString(),
        type: "transfer"
      }, this.jwtSecret);
    });

    _defineProperty(this, "getEmailSigninToken", () => {
      return _jsonwebtoken.default.sign({
        id: this.id,
        createdAt: new Date().toISOString(),
        type: "email-signin"
      }, this.jwtSecret);
    });

    _defineProperty(this, "demote", async (teamId, to) => {
      const res = await this.constructor.findAndCountAll({
        where: {
          teamId,
          isAdmin: true,
          id: {
            [_sequelize.Op.ne]: this.id
          }
        },
        limit: 1
      });

      if (res.count >= 1) {
        if (to === "member") {
          return this.update({
            isAdmin: false,
            isViewer: false
          });
        } else if (to === "viewer") {
          return this.update({
            isAdmin: false,
            isViewer: true
          });
        }

        return undefined;
      } else {
        throw (0, _errors.ValidationError)("At least one admin is required");
      }
    });

    _defineProperty(this, "promote", () => {
      return this.update({
        isAdmin: true,
        isViewer: false
      });
    });

    _defineProperty(this, "activate", () => {
      return this.update({
        suspendedById: null,
        suspendedAt: null
      });
    });
  }

  get jwtSecret() {
    return (0, _Encrypted.getEncryptedColumn)(this, "jwtSecret");
  }

  set jwtSecret(value) {
    (0, _Encrypted.setEncryptedColumn)(this, "jwtSecret", value);
  }

  get avatarUrl() {
    const original = this.getDataValue("avatarUrl");

    if (original) {
      return original;
    }

    const color = this.color.replace(/^#/, "");
    const initial = this.name ? this.name[0] : "?";

    const hash = _crypto.default.createHash("md5").update(this.email || "").digest("hex");

    return `${_env.default.DEFAULT_AVATAR_HOST}/avatar/${hash}/${initial}.png?c=${color}`;
  }

  set avatarUrl(value) {
    this.setDataValue("avatarUrl", value);
  } // associations


  // getters
  get isSuspended() {
    return !!this.suspendedAt;
  }

  get isInvited() {
    return !this.lastActiveAt;
  }

  get color() {
    return (0, _color.stringToColor)(this.id);
  } // instance methods

  /**
   * User flags are for storing information on a user record that is not visible
   * to the user itself.
   *
   * @param flag The flag to set
   * @param value Set the flag to true/false
   * @returns The current user flags
   */


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

}, _defineProperty(_class3, "removeIdentifyingInfo", async (model, options) => {
  await _NotificationSetting.default.destroy({
    where: {
      userId: model.id
    },
    transaction: options.transaction
  });
  await _ApiKey.default.destroy({
    where: {
      userId: model.id
    },
    transaction: options.transaction
  });
  await _Star.default.destroy({
    where: {
      userId: model.id
    },
    transaction: options.transaction
  });
  await _UserAuthentication.default.destroy({
    where: {
      userId: model.id
    },
    transaction: options.transaction
  });
  model.email = null;
  model.name = "Unknown";
  model.avatarUrl = null;
  model.username = null;
  model.lastActiveIp = null;
  model.lastSignedInIp = null; // this shouldn't be needed once this issue is resolved:
  // https://github.com/sequelize/sequelize/issues/9318

  await model.save({
    hooks: false,
    transaction: options.transaction
  });
}), _defineProperty(_class3, "uploadAvatar", async model => {
  const endpoint = (0, _s.publicS3Endpoint)();
  const {
    avatarUrl
  } = model;

  if (avatarUrl && !avatarUrl.startsWith("/api") && !avatarUrl.startsWith(endpoint) && !avatarUrl.startsWith(_env.default.DEFAULT_AVATAR_HOST)) {
    try {
      const newUrl = await (0, _s.uploadToS3FromUrl)(avatarUrl, `avatars/${model.id}/${(0, _uuid.v4)()}`, "public-read");

      if (newUrl) {
        model.avatarUrl = newUrl;
      }
    } catch (err) {
      _Logger.default.error("Couldn't upload user avatar image to S3", err, {
        url: avatarUrl
      });
    }
  }
}), _defineProperty(_class3, "setRandomJwtSecret", model => {
  model.jwtSecret = _crypto.default.randomBytes(64).toString("hex");
}), _defineProperty(_class3, "subscribeToNotifications", async (model, options) => {
  await Promise.all([_NotificationSetting.default.findOrCreate({
    where: {
      userId: model.id,
      teamId: model.teamId,
      event: "documents.update"
    },
    transaction: options.transaction
  }), _NotificationSetting.default.findOrCreate({
    where: {
      userId: model.id,
      teamId: model.teamId,
      event: "emails.onboarding"
    },
    transaction: options.transaction
  }), _NotificationSetting.default.findOrCreate({
    where: {
      userId: model.id,
      teamId: model.teamId,
      event: "emails.features"
    },
    transaction: options.transaction
  })]);
}), _defineProperty(_class3, "getCounts", async function (teamId) {
  const countSql = `
      SELECT 
        COUNT(CASE WHEN "suspendedAt" IS NOT NULL THEN 1 END) as "suspendedCount",
        COUNT(CASE WHEN "isAdmin" = true THEN 1 END) as "adminCount",
        COUNT(CASE WHEN "isViewer" = true THEN 1 END) as "viewerCount",
        COUNT(CASE WHEN "lastActiveAt" IS NULL THEN 1 END) as "invitedCount",
        COUNT(CASE WHEN "suspendedAt" IS NULL AND "lastActiveAt" IS NOT NULL THEN 1 END) as "activeCount",
        COUNT(*) as count
      FROM users
      WHERE "deletedAt" IS NULL
      AND "teamId" = :teamId
    `;
  const [results] = await this.sequelize.query(countSql, {
    type: _sequelize.QueryTypes.SELECT,
    replacements: {
      teamId
    }
  });
  const counts = results;
  return {
    active: parseInt(counts.activeCount),
    admins: parseInt(counts.adminCount),
    viewers: parseInt(counts.viewerCount),
    all: parseInt(counts.count),
    invited: parseInt(counts.invitedCount),
    suspended: parseInt(counts.suspendedCount)
  };
}), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "email", [_sequelizeTypescript.IsEmail, _sequelizeTypescript.Column, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "username", [_sequelizeTypescript.Column, _dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "name", [_sequelizeTypescript.Column, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "isAdmin", [_dec6, _sequelizeTypescript.Column, _dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "isViewer", [_dec8, _sequelizeTypescript.Column, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "jwtSecret", [_dec10, _Encrypted.default, _dec11, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "jwtSecret"), _class2.prototype), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "lastActiveAt", [_sequelizeTypescript.Column, _dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "lastActiveIp", [_sequelizeTypescript.IsIP, _sequelizeTypescript.Column, _dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "lastSignedInAt", [_sequelizeTypescript.Column, _dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "lastSignedInIp", [_sequelizeTypescript.IsIP, _sequelizeTypescript.Column, _dec16], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "lastSigninEmailSentAt", [_sequelizeTypescript.Column, _dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "suspendedAt", [_sequelizeTypescript.Column, _dec18], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "flags", [_dec19, _dec20], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "language", [_dec21, _dec22, _sequelizeTypescript.Column, _dec23], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "avatarUrl", [_dec24, _dec25, _dec26], Object.getOwnPropertyDescriptor(_class2.prototype, "avatarUrl"), _class2.prototype), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "suspendedBy", [_dec27, _dec28], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "suspendedById", [_dec29, _dec30, _dec31], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "invitedBy", [_dec32, _dec33], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "invitedById", [_dec34, _dec35, _dec36], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "team", [_dec37, _dec38], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor19 = _applyDecoratedDescriptor(_class2.prototype, "teamId", [_dec39, _dec40, _dec41], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor20 = _applyDecoratedDescriptor(_class2.prototype, "authentications", [_dec42, _dec43], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2, "removeIdentifyingInfo", [_sequelizeTypescript.BeforeDestroy], (_init = Object.getOwnPropertyDescriptor(_class2, "removeIdentifyingInfo"), _init = _init ? _init.value : undefined, {
  enumerable: true,
  configurable: true,
  writable: true,
  initializer: function () {
    return _init;
  }
}), _class2), _applyDecoratedDescriptor(_class2, "uploadAvatar", [_sequelizeTypescript.BeforeSave], (_init2 = Object.getOwnPropertyDescriptor(_class2, "uploadAvatar"), _init2 = _init2 ? _init2.value : undefined, {
  enumerable: true,
  configurable: true,
  writable: true,
  initializer: function () {
    return _init2;
  }
}), _class2), _applyDecoratedDescriptor(_class2, "setRandomJwtSecret", [_sequelizeTypescript.BeforeCreate], (_init3 = Object.getOwnPropertyDescriptor(_class2, "setRandomJwtSecret"), _init3 = _init3 ? _init3.value : undefined, {
  enumerable: true,
  configurable: true,
  writable: true,
  initializer: function () {
    return _init3;
  }
}), _class2), _applyDecoratedDescriptor(_class2, "subscribeToNotifications", [_sequelizeTypescript.AfterCreate], (_init4 = Object.getOwnPropertyDescriptor(_class2, "subscribeToNotifications"), _init4 = _init4 ? _init4.value : undefined, {
  enumerable: true,
  configurable: true,
  writable: true,
  initializer: function () {
    return _init4;
  }
}), _class2)), _class2)) || _class) || _class) || _class);
var _default = User;
exports.default = _default;