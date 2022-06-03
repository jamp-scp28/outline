"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _url = require("url");

var _util = _interopRequireDefault(require("util"));

var _sequelize = require("sequelize");

var _sequelizeTypescript = require("sequelize-typescript");

var _uuid = require("uuid");

var _domains = require("./../../shared/utils/domains");

var _env = _interopRequireDefault(require("./../env"));

var _Logger = _interopRequireDefault(require("./../logging/Logger"));

var _avatars = require("./../utils/avatars");

var _s = require("./../utils/s3");

var _AuthenticationProvider = _interopRequireDefault(require("./AuthenticationProvider"));

var _Collection = _interopRequireDefault(require("./Collection"));

var _Document = _interopRequireDefault(require("./Document"));

var _TeamDomain = _interopRequireDefault(require("./TeamDomain"));

var _User = _interopRequireDefault(require("./User"));

var _ParanoidModel = _interopRequireDefault(require("./base/ParanoidModel"));

var _Fix = _interopRequireDefault(require("./decorators/Fix"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _init, _class3, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

const readFile = _util.default.promisify(_fs.default.readFile);

let Team = (_dec = (0, _sequelizeTypescript.Scopes)(() => ({
  withAuthenticationProviders: {
    include: [{
      model: _AuthenticationProvider.default,
      as: "authenticationProviders"
    }]
  }
})), _dec2 = (0, _sequelizeTypescript.Table)({
  tableName: "teams",
  modelName: "team"
}), _dec3 = Reflect.metadata("design:type", String), _dec4 = (0, _sequelizeTypescript.Length)({
  min: 4,
  max: 32,
  msg: "Must be between 4 and 32 characters"
}), _dec5 = (0, _sequelizeTypescript.Is)({
  args: [/^[a-z\d-]+$/, "i"],
  msg: "Must be only alphanumeric and dashes"
}), _dec6 = (0, _sequelizeTypescript.NotIn)({
  args: [_domains.RESERVED_SUBDOMAINS],
  msg: "You chose a restricted word, please try another."
}), _dec7 = Reflect.metadata("design:type", String), _dec8 = Reflect.metadata("design:type", String), _dec9 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.UUID), _dec10 = Reflect.metadata("design:type", String), _dec11 = Reflect.metadata("design:type", String), _dec12 = (0, _sequelizeTypescript.Default)(true), _dec13 = Reflect.metadata("design:type", Boolean), _dec14 = (0, _sequelizeTypescript.Default)(false), _dec15 = Reflect.metadata("design:type", Boolean), _dec16 = (0, _sequelizeTypescript.Default)(true), _dec17 = (0, _sequelizeTypescript.Column)(_sequelizeTypescript.DataType.JSONB), _dec18 = Reflect.metadata("design:type", Object), _dec19 = (0, _sequelizeTypescript.Default)(true), _dec20 = Reflect.metadata("design:type", Boolean), _dec21 = (0, _sequelizeTypescript.Default)(true), _dec22 = Reflect.metadata("design:type", Boolean), _dec23 = (0, _sequelizeTypescript.Default)(true), _dec24 = Reflect.metadata("design:type", Boolean), _dec25 = (0, _sequelizeTypescript.Default)(true), _dec26 = Reflect.metadata("design:type", Boolean), _dec27 = (0, _sequelizeTypescript.Default)("member"), _dec28 = (0, _sequelizeTypescript.IsIn)([["viewer", "member"]]), _dec29 = Reflect.metadata("design:type", String), _dec30 = (0, _sequelizeTypescript.HasMany)(() => _Collection.default), _dec31 = Reflect.metadata("design:type", Array), _dec32 = (0, _sequelizeTypescript.HasMany)(() => _Document.default), _dec33 = Reflect.metadata("design:type", Array), _dec34 = (0, _sequelizeTypescript.HasMany)(() => _User.default), _dec35 = Reflect.metadata("design:type", Array), _dec36 = (0, _sequelizeTypescript.HasMany)(() => _AuthenticationProvider.default), _dec37 = Reflect.metadata("design:type", Array), _dec38 = (0, _sequelizeTypescript.HasMany)(() => _TeamDomain.default), _dec39 = Reflect.metadata("design:type", Array), _dec(_class = _dec2(_class = (0, _Fix.default)(_class = (_class2 = (_temp = _class3 = class Team extends _ParanoidModel.default {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "name", _descriptor, this);

    _initializerDefineProperty(this, "subdomain", _descriptor2, this);

    _initializerDefineProperty(this, "domain", _descriptor3, this);

    _initializerDefineProperty(this, "defaultCollectionId", _descriptor4, this);

    _initializerDefineProperty(this, "avatarUrl", _descriptor5, this);

    _initializerDefineProperty(this, "sharing", _descriptor6, this);

    _initializerDefineProperty(this, "inviteRequired", _descriptor7, this);

    _initializerDefineProperty(this, "signupQueryParams", _descriptor8, this);

    _initializerDefineProperty(this, "guestSignin", _descriptor9, this);

    _initializerDefineProperty(this, "documentEmbeds", _descriptor10, this);

    _initializerDefineProperty(this, "memberCollectionCreate", _descriptor11, this);

    _initializerDefineProperty(this, "collaborativeEditing", _descriptor12, this);

    _initializerDefineProperty(this, "defaultUserRole", _descriptor13, this);

    _defineProperty(this, "provisionSubdomain", async function (requestedSubdomain, options = {}) {
      if (this.subdomain) {
        return this.subdomain;
      }

      let subdomain = requestedSubdomain;
      let append = 0;

      for (;;) {
        try {
          await this.update({
            subdomain
          }, options);
          break;
        } catch (err) {
          // subdomain was invalid or already used, try again
          subdomain = `${requestedSubdomain}${++append}`;
        }
      }

      return subdomain;
    });

    _defineProperty(this, "provisionFirstCollection", async userId => {
      await this.sequelize.transaction(async transaction => {
        const collection = await _Collection.default.create({
          name: "Welcome",
          description: "This collection is a quick guide to what Outline is all about. Feel free to delete this collection once your team is up to speed with the basics!",
          teamId: this.id,
          createdById: userId,
          sort: _Collection.default.DEFAULT_SORT,
          permission: "read_write"
        }, {
          transaction
        }); // For the first collection we go ahead and create some intitial documents to get
        // the team started. You can edit these in /server/onboarding/x.md

        const onboardingDocs = ["Integrations & API", "Our Editor", "Getting Started", "What is Outline"];

        for (const title of onboardingDocs) {
          const text = await readFile(_path.default.join(process.cwd(), "server", "onboarding", `${title}.md`), "utf8");
          const document = await _Document.default.create({
            version: 2,
            isWelcome: true,
            parentDocumentId: null,
            collectionId: collection.id,
            teamId: collection.teamId,
            userId: collection.createdById,
            lastModifiedById: collection.createdById,
            createdById: collection.createdById,
            title,
            text
          }, {
            transaction
          });
          await document.publish(collection.createdById, {
            transaction
          });
        }
      });
    });

    _defineProperty(this, "collectionIds", async function (paranoid = true) {
      const models = await _Collection.default.findAll({
        attributes: ["id"],
        where: {
          teamId: this.id,
          permission: {
            [_sequelize.Op.ne]: null
          }
        },
        paranoid
      });
      return models.map(c => c.id);
    });

    _defineProperty(this, "isDomainAllowed", async function (domain) {
      const allowedDomains = (await this.$get("allowedDomains")) || [];
      return allowedDomains.length === 0 || allowedDomains.map(d => d.name).includes(domain);
    });

    _initializerDefineProperty(this, "collections", _descriptor14, this);

    _initializerDefineProperty(this, "documents", _descriptor15, this);

    _initializerDefineProperty(this, "users", _descriptor16, this);

    _initializerDefineProperty(this, "authenticationProviders", _descriptor17, this);

    _initializerDefineProperty(this, "allowedDomains", _descriptor18, this);
  }

  // getters

  /**
   * Returns whether the team has email login enabled. For self-hosted installs
   * this also considers whether SMTP connection details have been configured.
   *
   * @return {boolean} Whether to show email login options
   */
  get emailSigninEnabled() {
    return this.guestSignin && (!!_env.default.SMTP_HOST || _env.default.ENVIRONMENT === "development");
  }

  get url() {
    if (this.domain) {
      return `https://${this.domain}`;
    }

    if (!this.subdomain || !_env.default.SUBDOMAINS_ENABLED) {
      return _env.default.URL;
    }

    const url = new _url.URL(_env.default.URL);
    url.host = `${this.subdomain}.${(0, _domains.stripSubdomain)(url.host)}`;
    return url.href.replace(/\/$/, "");
  }

  get logoUrl() {
    return this.avatarUrl || (0, _avatars.generateAvatarUrl)({
      id: this.id,
      name: this.name
    });
  } // TODO: Move to command


}, _defineProperty(_class3, "uploadAvatar", async model => {
  const endpoint = (0, _s.publicS3Endpoint)();
  const {
    avatarUrl
  } = model;

  if (avatarUrl && !avatarUrl.startsWith("/api") && !avatarUrl.startsWith(endpoint)) {
    try {
      const newUrl = await (0, _s.uploadToS3FromUrl)(avatarUrl, `avatars/${model.id}/${(0, _uuid.v4)()}`, "public-read");

      if (newUrl) {
        model.avatarUrl = newUrl;
      }
    } catch (err) {
      _Logger.default.error("Error uploading avatar to S3", err, {
        url: avatarUrl
      });
    }
  }
}), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "name", [_sequelizeTypescript.Column, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "subdomain", [_sequelizeTypescript.IsLowercase, _sequelizeTypescript.Unique, _dec4, _dec5, _dec6, _sequelizeTypescript.Column, _dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "domain", [_sequelizeTypescript.Unique, _sequelizeTypescript.Column, _dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "defaultCollectionId", [_dec9, _dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "avatarUrl", [_sequelizeTypescript.Column, _dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "sharing", [_dec12, _sequelizeTypescript.Column, _dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "inviteRequired", [_dec14, _sequelizeTypescript.Column, _dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "signupQueryParams", [_dec16, _dec17, _dec18], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "guestSignin", [_dec19, _sequelizeTypescript.Column, _dec20], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "documentEmbeds", [_dec21, _sequelizeTypescript.Column, _dec22], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "memberCollectionCreate", [_dec23, _sequelizeTypescript.Column, _dec24], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "collaborativeEditing", [_dec25, _sequelizeTypescript.Column, _dec26], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "defaultUserRole", [_dec27, _dec28, _sequelizeTypescript.Column, _dec29], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "collections", [_dec30, _dec31], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "documents", [_dec32, _dec33], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "users", [_dec34, _dec35], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "authenticationProviders", [_dec36, _dec37], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "allowedDomains", [_dec38, _dec39], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2, "uploadAvatar", [_sequelizeTypescript.BeforeSave], (_init = Object.getOwnPropertyDescriptor(_class2, "uploadAvatar"), _init = _init ? _init.value : undefined, {
  enumerable: true,
  configurable: true,
  writable: true,
  initializer: function () {
    return _init;
  }
}), _class2)), _class2)) || _class) || _class) || _class);
var _default = Team;
exports.default = _default;