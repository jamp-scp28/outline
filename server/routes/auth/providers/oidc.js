"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.config = void 0;

var _koaPassport = _interopRequireDefault(require("@outlinewiki/koa-passport"));

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _lodash = require("lodash");

var _passportOauth = require("passport-oauth2");

var _accountProvisioner = _interopRequireDefault(require("./../../../commands/accountProvisioner"));

var _env = _interopRequireDefault(require("./../../../env"));

var _errors = require("./../../../errors");

var _passport = _interopRequireDefault(require("./../../../middlewares/passport"));

var _passport2 = require("./../../../utils/passport");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _koaRouter.default();
const providerName = "oidc";
const OIDC_AUTH_URI = _env.default.OIDC_AUTH_URI || "";
const OIDC_TOKEN_URI = _env.default.OIDC_TOKEN_URI || "";
const OIDC_USERINFO_URI = _env.default.OIDC_USERINFO_URI || "";
const config = {
  name: _env.default.OIDC_DISPLAY_NAME,
  enabled: !!_env.default.OIDC_CLIENT_ID
};
exports.config = config;

const scopes = _env.default.OIDC_SCOPES.split(" ");

_passportOauth.Strategy.prototype.userProfile = async function (accessToken, done) {
  try {
    const response = await (0, _passport2.request)(OIDC_USERINFO_URI, accessToken);
    return done(null, response);
  } catch (err) {
    return done(err);
  }
};

if (_env.default.OIDC_CLIENT_ID && _env.default.OIDC_CLIENT_SECRET) {
  _koaPassport.default.use(providerName, new _passportOauth.Strategy({
    authorizationURL: OIDC_AUTH_URI,
    tokenURL: OIDC_TOKEN_URI,
    clientID: _env.default.OIDC_CLIENT_ID,
    clientSecret: _env.default.OIDC_CLIENT_SECRET,
    callbackURL: `${_env.default.URL}/auth/${providerName}.callback`,
    passReqToCallback: true,
    scope: _env.default.OIDC_SCOPES,
    // @ts-expect-error custom state store
    store: new _passport2.StateStore(),
    state: true,
    pkce: false
  }, // OpenID Connect standard profile claims can be found in the official
  // specification.
  // https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims
  // Non-standard claims may be configured by individual identity providers.
  // Any claim supplied in response to the userinfo request will be
  // available on the `profile` parameter
  async function (req, accessToken, refreshToken, profile, done) {
    try {
      if (!profile.email) {
        throw (0, _errors.AuthenticationError)(`An email field was not returned in the profile parameter, but is required.`);
      }

      const parts = profile.email.toLowerCase().split("@");
      const domain = parts.length && parts[1];

      if (!domain) {
        throw (0, _errors.OIDCMalformedUserInfoError)();
      }

      const subdomain = domain.split(".")[0];
      const result = await (0, _accountProvisioner.default)({
        ip: req.ip,
        team: {
          // https://github.com/outline/outline/pull/2388#discussion_r681120223
          name: "Wiki",
          domain,
          subdomain
        },
        user: {
          name: profile.name,
          email: profile.email,
          avatarUrl: profile.picture,
          // Claim name can be overriden using an env variable.
          // Default is 'preferred_username' as per OIDC spec.
          username: (0, _lodash.get)(profile, _env.default.OIDC_USERNAME_CLAIM)
        },
        authenticationProvider: {
          name: providerName,
          providerId: domain
        },
        authentication: {
          providerId: profile.sub,
          accessToken,
          refreshToken,
          scopes
        }
      });
      return done(null, result.user, result);
    } catch (err) {
      return done(err, null);
    }
  }));

  router.get(providerName, _koaPassport.default.authenticate(providerName));
  router.get(`${providerName}.callback`, (0, _passport.default)(providerName));
}

var _default = router;
exports.default = _default;