"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Environment = void 0;

var _classValidator = require("class-validator");

var _i18n = require("./../shared/i18n");

var _validators = require("./utils/validators");

var _Deprecated = _interopRequireDefault(require("./models/decorators/Deprecated"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _dec45, _dec46, _dec47, _dec48, _dec49, _dec50, _dec51, _dec52, _dec53, _dec54, _dec55, _dec56, _dec57, _dec58, _dec59, _dec60, _dec61, _dec62, _dec63, _dec64, _dec65, _dec66, _dec67, _dec68, _dec69, _dec70, _dec71, _dec72, _dec73, _dec74, _dec75, _dec76, _dec77, _dec78, _dec79, _dec80, _dec81, _dec82, _dec83, _dec84, _dec85, _dec86, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _descriptor22, _descriptor23, _descriptor24, _descriptor25, _descriptor26, _descriptor27, _descriptor28, _descriptor29, _descriptor30, _descriptor31, _descriptor32, _descriptor33, _descriptor34, _descriptor35, _descriptor36, _descriptor37, _descriptor38, _descriptor39, _descriptor40, _descriptor41, _descriptor42, _descriptor43, _descriptor44, _descriptor45, _descriptor46;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

/* eslint-disable @typescript-eslint/no-var-requires */
// Load the process environment variables
require("dotenv").config({
  silent: true
});

let Environment = (_dec = (0, _classValidator.IsIn)(["development", "production", "staging", "test"]), _dec2 = (0, _classValidator.IsByteLength)(32, 64), _dec3 = (0, _classValidator.IsNotEmpty)(), _dec4 = (0, _classValidator.IsNotEmpty)(), _dec5 = (0, _classValidator.IsUrl)({
  require_tld: false,
  allow_underscores: true,
  protocols: ["postgres"]
}), _dec6 = (0, _classValidator.IsOptional)(), _dec7 = (0, _classValidator.IsUrl)({
  require_tld: false,
  allow_underscores: true,
  protocols: ["postgres", "postgresql"]
}), _dec8 = (0, _classValidator.IsNumber)(), _dec9 = (0, _classValidator.IsOptional)(), _dec10 = (0, _classValidator.IsNumber)(), _dec11 = (0, _classValidator.IsOptional)(), _dec12 = (0, _classValidator.IsIn)(["disable", "allow", "require", "prefer", "verify-ca", "verify-full"]), _dec13 = (0, _classValidator.IsOptional)(), _dec14 = (0, _classValidator.IsNotEmpty)(), _dec15 = (0, _classValidator.IsNotEmpty)(), _dec16 = (0, _classValidator.IsUrl)({
  require_tld: false
}), _dec17 = (0, _classValidator.IsOptional)(), _dec18 = (0, _classValidator.IsUrl)(), _dec19 = (0, _classValidator.IsUrl)({
  require_tld: false,
  protocols: ["http", "https", "ws", "wss"]
}), _dec20 = (0, _classValidator.IsOptional)(), _dec21 = (0, _classValidator.IsNumber)(), _dec22 = (0, _classValidator.IsOptional)(), _dec23 = (0, _classValidator.IsNumber)(), _dec24 = (0, _classValidator.IsOptional)(), _dec25 = (0, _classValidator.IsOptional)(), _dec26 = (0, _validators.CannotUseWithout)("SSL_CERT"), _dec27 = (0, _classValidator.IsOptional)(), _dec28 = (0, _validators.CannotUseWithout)("SSL_KEY"), _dec29 = (0, _classValidator.Equals)("hosted"), _dec30 = (0, _classValidator.IsOptional)(), _dec31 = (0, _classValidator.IsIn)(_i18n.languages), _dec32 = (0, _classValidator.IsBoolean)(), _dec33 = (0, _classValidator.IsBoolean)(), _dec34 = (0, _Deprecated.default)("The community edition of Outline does not support subdomains"), _dec35 = (0, _classValidator.IsBoolean)(), _dec36 = (0, _classValidator.IsNumber)(), _dec37 = (0, _classValidator.IsNumber)(), _dec38 = (0, _classValidator.IsOptional)(), _dec39 = (0, _classValidator.IsEmail)({
  allow_display_name: true,
  allow_ip_domain: true
}), _dec40 = (0, _classValidator.IsOptional)(), _dec41 = (0, _classValidator.IsEmail)({
  allow_display_name: true,
  allow_ip_domain: true
}), _dec42 = (0, _classValidator.IsOptional)(), _dec43 = (0, _classValidator.IsUrl)(), _dec44 = (0, _classValidator.IsOptional)(), _dec45 = (0, _classValidator.IsUrl)(), _dec46 = (0, _classValidator.Contains)("UA-"), _dec47 = (0, _classValidator.IsOptional)(), _dec48 = (0, _classValidator.IsOptional)(), _dec49 = (0, _validators.CannotUseWithout)("GOOGLE_CLIENT_SECRET"), _dec50 = (0, _classValidator.IsOptional)(), _dec51 = (0, _validators.CannotUseWithout)("GOOGLE_CLIENT_ID"), _dec52 = (0, _classValidator.IsOptional)(), _dec53 = (0, _Deprecated.default)("Use SLACK_CLIENT_SECRET instead"), _dec54 = (0, _classValidator.IsOptional)(), _dec55 = (0, _Deprecated.default)("Use SLACK_CLIENT_ID instead"), _dec56 = (0, _classValidator.IsOptional)(), _dec57 = (0, _validators.CannotUseWithout)("SLACK_CLIENT_SECRET"), _dec58 = (0, _classValidator.IsOptional)(), _dec59 = (0, _validators.CannotUseWithout)("SLACK_CLIENT_ID"), _dec60 = (0, _classValidator.IsOptional)(), _dec61 = (0, _validators.CannotUseWithout)("SLACK_CLIENT_ID"), _dec62 = (0, _classValidator.IsOptional)(), _dec63 = (0, _validators.CannotUseWithout)("SLACK_CLIENT_ID"), _dec64 = (0, _classValidator.IsOptional)(), _dec65 = (0, _classValidator.IsBoolean)(), _dec66 = (0, _classValidator.IsOptional)(), _dec67 = (0, _validators.CannotUseWithout)("AZURE_CLIENT_SECRET"), _dec68 = (0, _classValidator.IsOptional)(), _dec69 = (0, _validators.CannotUseWithout)("AZURE_CLIENT_ID"), _dec70 = (0, _classValidator.IsOptional)(), _dec71 = (0, _validators.CannotUseWithout)("AZURE_CLIENT_ID"), _dec72 = (0, _classValidator.IsOptional)(), _dec73 = (0, _validators.CannotUseWithout)("OIDC_CLIENT_SECRET"), _dec74 = (0, _validators.CannotUseWithout)("OIDC_AUTH_URI"), _dec75 = (0, _validators.CannotUseWithout)("OIDC_TOKEN_URI"), _dec76 = (0, _validators.CannotUseWithout)("OIDC_USERINFO_URI"), _dec77 = (0, _validators.CannotUseWithout)("OIDC_DISPLAY_NAME"), _dec78 = (0, _classValidator.IsOptional)(), _dec79 = (0, _validators.CannotUseWithout)("OIDC_CLIENT_ID"), _dec80 = (0, _classValidator.MaxLength)(50), _dec81 = (0, _classValidator.IsOptional)(), _dec82 = (0, _classValidator.IsUrl)({
  require_tld: false,
  allow_underscores: true
}), _dec83 = (0, _classValidator.IsOptional)(), _dec84 = (0, _classValidator.IsUrl)({
  require_tld: false,
  allow_underscores: true
}), _dec85 = (0, _classValidator.IsOptional)(), _dec86 = (0, _classValidator.IsUrl)({
  require_tld: false,
  allow_underscores: true
}), (_class = class Environment {
  constructor() {
    _initializerDefineProperty(this, "ENVIRONMENT", _descriptor, this);

    _initializerDefineProperty(this, "SECRET_KEY", _descriptor2, this);

    _initializerDefineProperty(this, "UTILS_SECRET", _descriptor3, this);

    _initializerDefineProperty(this, "DATABASE_URL", _descriptor4, this);

    _initializerDefineProperty(this, "DATABASE_CONNECTION_POOL_URL", _descriptor5, this);

    _initializerDefineProperty(this, "DATABASE_CONNECTION_POOL_MIN", _descriptor6, this);

    _initializerDefineProperty(this, "DATABASE_CONNECTION_POOL_MAX", _descriptor7, this);

    _initializerDefineProperty(this, "PGSSLMODE", _descriptor8, this);

    _initializerDefineProperty(this, "REDIS_URL", _descriptor9, this);

    _initializerDefineProperty(this, "URL", _descriptor10, this);

    _initializerDefineProperty(this, "CDN_URL", _descriptor11, this);

    _initializerDefineProperty(this, "COLLABORATION_URL", _descriptor12, this);

    _initializerDefineProperty(this, "PORT", _descriptor13, this);

    _defineProperty(this, "DEBUG", `${process.env.DEBUG}`);

    _initializerDefineProperty(this, "WEB_CONCURRENCY", _descriptor14, this);

    _initializerDefineProperty(this, "SSL_KEY", _descriptor15, this);

    _initializerDefineProperty(this, "SSL_CERT", _descriptor16, this);

    _initializerDefineProperty(this, "DEPLOYMENT", _descriptor17, this);

    _defineProperty(this, "TEAM_LOGO", process.env.TEAM_LOGO);

    _initializerDefineProperty(this, "DEFAULT_LANGUAGE", _descriptor18, this);

    _defineProperty(this, "SERVICES", process.env.SERVICES ?? "collaboration,websockets,worker,web");

    _initializerDefineProperty(this, "FORCE_HTTPS", _descriptor19, this);

    _initializerDefineProperty(this, "SUBDOMAINS_ENABLED", _descriptor20, this);

    _initializerDefineProperty(this, "TELEMETRY", _descriptor21, this);

    _initializerDefineProperty(this, "MAXIMUM_IMPORT_SIZE", _descriptor22, this);

    _defineProperty(this, "ALLOWED_DOMAINS", process.env.ALLOWED_DOMAINS ?? process.env.GOOGLE_ALLOWED_DOMAINS);

    _defineProperty(this, "SMTP_HOST", process.env.SMTP_HOST);

    _initializerDefineProperty(this, "SMTP_PORT", _descriptor23, this);

    _defineProperty(this, "SMTP_USERNAME", process.env.SMTP_USERNAME);

    _defineProperty(this, "SMTP_PASSWORD", process.env.SMTP_PASSWORD);

    _initializerDefineProperty(this, "SMTP_FROM_EMAIL", _descriptor24, this);

    _initializerDefineProperty(this, "SMTP_REPLY_EMAIL", _descriptor25, this);

    _defineProperty(this, "SMTP_TLS_CIPHERS", this.toOptionalString(process.env.SMTP_TLS_CIPHERS));

    _defineProperty(this, "SMTP_SECURE", this.toBoolean(process.env.SMTP_SECURE ?? "true"));

    _initializerDefineProperty(this, "SENTRY_DSN", _descriptor26, this);

    _defineProperty(this, "RELEASE", this.toOptionalString(process.env.RELEASE));

    _initializerDefineProperty(this, "DEFAULT_AVATAR_HOST", _descriptor27, this);

    _initializerDefineProperty(this, "GOOGLE_ANALYTICS_ID", _descriptor28, this);

    _defineProperty(this, "DD_API_KEY", process.env.DD_API_KEY);

    _initializerDefineProperty(this, "GOOGLE_CLIENT_ID", _descriptor29, this);

    _initializerDefineProperty(this, "GOOGLE_CLIENT_SECRET", _descriptor30, this);

    _initializerDefineProperty(this, "SLACK_SECRET", _descriptor31, this);

    _initializerDefineProperty(this, "SLACK_KEY", _descriptor32, this);

    _initializerDefineProperty(this, "SLACK_CLIENT_ID", _descriptor33, this);

    _initializerDefineProperty(this, "SLACK_CLIENT_SECRET", _descriptor34, this);

    _initializerDefineProperty(this, "SLACK_VERIFICATION_TOKEN", _descriptor35, this);

    _initializerDefineProperty(this, "SLACK_APP_ID", _descriptor36, this);

    _initializerDefineProperty(this, "SLACK_MESSAGE_ACTIONS", _descriptor37, this);

    _initializerDefineProperty(this, "AZURE_CLIENT_ID", _descriptor38, this);

    _initializerDefineProperty(this, "AZURE_CLIENT_SECRET", _descriptor39, this);

    _initializerDefineProperty(this, "AZURE_RESOURCE_APP_ID", _descriptor40, this);

    _initializerDefineProperty(this, "OIDC_CLIENT_ID", _descriptor41, this);

    _initializerDefineProperty(this, "OIDC_CLIENT_SECRET", _descriptor42, this);

    _initializerDefineProperty(this, "OIDC_DISPLAY_NAME", _descriptor43, this);

    _initializerDefineProperty(this, "OIDC_AUTH_URI", _descriptor44, this);

    _initializerDefineProperty(this, "OIDC_TOKEN_URI", _descriptor45, this);

    _initializerDefineProperty(this, "OIDC_USERINFO_URI", _descriptor46, this);

    _defineProperty(this, "OIDC_USERNAME_CLAIM", process.env.OIDC_USERNAME_CLAIM ?? "preferred_username");

    _defineProperty(this, "OIDC_SCOPES", process.env.OIDC_SCOPES ?? "openid profile email");

    this.validationPromise = (0, _classValidator.validate)(this);
  }
  /**
   * Allows waiting on the environment to be validated.
   *
   * @returns A promise that resolves when the environment is validated.
   */


  validate() {
    return this.validationPromise;
  }
  /**
   * The current envionment name.
   */


  toOptionalString(value) {
    return value ? value : undefined;
  }

  toOptionalNumber(value) {
    return value ? parseInt(value, 10) : undefined;
  }
  /**
   * Convert a string to a boolean. Supports the following:
   *
   * 0 = false
   * 1 = true
   * "true" = true
   * "false" = false
   * "" = false
   *
   * @param value The string to convert
   * @returns A boolean
   */


  toBoolean(value) {
    return value ? !!JSON.parse(value) : false;
  }

}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "ENVIRONMENT", [_dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return process.env.NODE_ENV ?? "production";
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "SECRET_KEY", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return `${process.env.SECRET_KEY}`;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "UTILS_SECRET", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return `${process.env.UTILS_SECRET}`;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "DATABASE_URL", [_dec4, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return `${process.env.DATABASE_URL}`;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "DATABASE_CONNECTION_POOL_URL", [_dec6, _dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return this.toOptionalString(process.env.DATABASE_CONNECTION_POOL_URL);
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "DATABASE_CONNECTION_POOL_MIN", [_dec8, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return this.toOptionalNumber(process.env.DATABASE_CONNECTION_POOL_MIN);
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, "DATABASE_CONNECTION_POOL_MAX", [_dec10, _dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return this.toOptionalNumber(process.env.DATABASE_CONNECTION_POOL_MAX);
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, "PGSSLMODE", [_dec12, _dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return process.env.PGSSLMODE;
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class.prototype, "REDIS_URL", [_dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return process.env.REDIS_URL;
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class.prototype, "URL", [_dec15, _dec16], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return `${process.env.URL}`;
  }
}), _descriptor11 = _applyDecoratedDescriptor(_class.prototype, "CDN_URL", [_dec17, _dec18], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return this.toOptionalString(process.env.CDN_URL);
  }
}), _descriptor12 = _applyDecoratedDescriptor(_class.prototype, "COLLABORATION_URL", [_dec19, _dec20], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return this.toOptionalString(process.env.COLLABORATION_URL);
  }
}), _descriptor13 = _applyDecoratedDescriptor(_class.prototype, "PORT", [_dec21, _dec22], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return this.toOptionalNumber(process.env.PORT);
  }
}), _descriptor14 = _applyDecoratedDescriptor(_class.prototype, "WEB_CONCURRENCY", [_dec23, _dec24], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return this.toOptionalNumber(process.env.WEB_CONCURRENCY);
  }
}), _descriptor15 = _applyDecoratedDescriptor(_class.prototype, "SSL_KEY", [_dec25, _dec26], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return this.toOptionalString(process.env.SSL_KEY);
  }
}), _descriptor16 = _applyDecoratedDescriptor(_class.prototype, "SSL_CERT", [_dec27, _dec28], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return this.toOptionalString(process.env.SSL_CERT);
  }
}), _descriptor17 = _applyDecoratedDescriptor(_class.prototype, "DEPLOYMENT", [_dec29, _dec30], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return this.toOptionalString(process.env.DEPLOYMENT);
  }
}), _descriptor18 = _applyDecoratedDescriptor(_class.prototype, "DEFAULT_LANGUAGE", [_dec31], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return process.env.DEFAULT_LANGUAGE ?? "en_US";
  }
}), _descriptor19 = _applyDecoratedDescriptor(_class.prototype, "FORCE_HTTPS", [_dec32], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return this.toBoolean(process.env.FORCE_HTTPS ?? "false");
  }
}), _descriptor20 = _applyDecoratedDescriptor(_class.prototype, "SUBDOMAINS_ENABLED", [_dec33, _dec34], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return this.toBoolean(process.env.SUBDOMAINS_ENABLED ?? "false");
  }
}), _descriptor21 = _applyDecoratedDescriptor(_class.prototype, "TELEMETRY", [_dec35], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return this.toBoolean(process.env.ENABLE_UPDATES ?? process.env.TELEMETRY ?? "true");
  }
}), _descriptor22 = _applyDecoratedDescriptor(_class.prototype, "MAXIMUM_IMPORT_SIZE", [_dec36], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return this.toOptionalNumber(process.env.MAXIMUM_IMPORT_SIZE) ?? 5120000;
  }
}), _descriptor23 = _applyDecoratedDescriptor(_class.prototype, "SMTP_PORT", [_dec37, _dec38], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return this.toOptionalNumber(process.env.SMTP_PORT);
  }
}), _descriptor24 = _applyDecoratedDescriptor(_class.prototype, "SMTP_FROM_EMAIL", [_dec39, _dec40], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return this.toOptionalString(process.env.SMTP_FROM_EMAIL);
  }
}), _descriptor25 = _applyDecoratedDescriptor(_class.prototype, "SMTP_REPLY_EMAIL", [_dec41, _dec42], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return this.toOptionalString(process.env.SMTP_REPLY_EMAIL);
  }
}), _descriptor26 = _applyDecoratedDescriptor(_class.prototype, "SENTRY_DSN", [_dec43, _dec44], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return this.toOptionalString(process.env.SENTRY_DSN);
  }
}), _descriptor27 = _applyDecoratedDescriptor(_class.prototype, "DEFAULT_AVATAR_HOST", [_dec45], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return process.env.DEFAULT_AVATAR_HOST ?? "https://tiley.herokuapp.com";
  }
}), _descriptor28 = _applyDecoratedDescriptor(_class.prototype, "GOOGLE_ANALYTICS_ID", [_dec46, _dec47], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return this.toOptionalString(process.env.GOOGLE_ANALYTICS_ID);
  }
}), _descriptor29 = _applyDecoratedDescriptor(_class.prototype, "GOOGLE_CLIENT_ID", [_dec48, _dec49], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return this.toOptionalString(process.env.GOOGLE_CLIENT_ID);
  }
}), _descriptor30 = _applyDecoratedDescriptor(_class.prototype, "GOOGLE_CLIENT_SECRET", [_dec50, _dec51], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return this.toOptionalString(process.env.GOOGLE_CLIENT_SECRET);
  }
}), _descriptor31 = _applyDecoratedDescriptor(_class.prototype, "SLACK_SECRET", [_dec52, _dec53], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return this.toOptionalString(process.env.SLACK_SECRET);
  }
}), _descriptor32 = _applyDecoratedDescriptor(_class.prototype, "SLACK_KEY", [_dec54, _dec55], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return this.toOptionalString(process.env.SLACK_KEY);
  }
}), _descriptor33 = _applyDecoratedDescriptor(_class.prototype, "SLACK_CLIENT_ID", [_dec56, _dec57], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return this.toOptionalString(process.env.SLACK_CLIENT_ID ?? process.env.SLACK_KEY);
  }
}), _descriptor34 = _applyDecoratedDescriptor(_class.prototype, "SLACK_CLIENT_SECRET", [_dec58, _dec59], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return this.toOptionalString(process.env.SLACK_CLIENT_SECRET ?? process.env.SLACK_SECRET);
  }
}), _descriptor35 = _applyDecoratedDescriptor(_class.prototype, "SLACK_VERIFICATION_TOKEN", [_dec60, _dec61], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return this.toOptionalString(process.env.SLACK_VERIFICATION_TOKEN);
  }
}), _descriptor36 = _applyDecoratedDescriptor(_class.prototype, "SLACK_APP_ID", [_dec62, _dec63], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return this.toOptionalString(process.env.SLACK_APP_ID);
  }
}), _descriptor37 = _applyDecoratedDescriptor(_class.prototype, "SLACK_MESSAGE_ACTIONS", [_dec64, _dec65], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return this.toBoolean(process.env.SLACK_MESSAGE_ACTIONS ?? "false");
  }
}), _descriptor38 = _applyDecoratedDescriptor(_class.prototype, "AZURE_CLIENT_ID", [_dec66, _dec67], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return this.toOptionalString(process.env.AZURE_CLIENT_ID);
  }
}), _descriptor39 = _applyDecoratedDescriptor(_class.prototype, "AZURE_CLIENT_SECRET", [_dec68, _dec69], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return this.toOptionalString(process.env.AZURE_CLIENT_SECRET);
  }
}), _descriptor40 = _applyDecoratedDescriptor(_class.prototype, "AZURE_RESOURCE_APP_ID", [_dec70, _dec71], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return this.toOptionalString(process.env.AZURE_RESOURCE_APP_ID);
  }
}), _descriptor41 = _applyDecoratedDescriptor(_class.prototype, "OIDC_CLIENT_ID", [_dec72, _dec73, _dec74, _dec75, _dec76, _dec77], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return this.toOptionalString(process.env.OIDC_CLIENT_ID);
  }
}), _descriptor42 = _applyDecoratedDescriptor(_class.prototype, "OIDC_CLIENT_SECRET", [_dec78, _dec79], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return this.toOptionalString(process.env.OIDC_CLIENT_SECRET);
  }
}), _descriptor43 = _applyDecoratedDescriptor(_class.prototype, "OIDC_DISPLAY_NAME", [_dec80], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return process.env.OIDC_DISPLAY_NAME ?? "OpenID Connect";
  }
}), _descriptor44 = _applyDecoratedDescriptor(_class.prototype, "OIDC_AUTH_URI", [_dec81, _dec82], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return this.toOptionalString(process.env.OIDC_AUTH_URI);
  }
}), _descriptor45 = _applyDecoratedDescriptor(_class.prototype, "OIDC_TOKEN_URI", [_dec83, _dec84], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return this.toOptionalString(process.env.OIDC_TOKEN_URI);
  }
}), _descriptor46 = _applyDecoratedDescriptor(_class.prototype, "OIDC_USERINFO_URI", [_dec85, _dec86], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return this.toOptionalString(process.env.OIDC_USERINFO_URI);
  }
})), _class));
exports.Environment = Environment;
const env = new Environment();
var _default = env;
exports.default = _default;