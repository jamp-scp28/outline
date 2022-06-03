"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.config = void 0;

var _koaPassport = _interopRequireDefault(require("@outlinewiki/koa-passport"));

var _passportAzureAdOauth = require("@outlinewiki/passport-azure-ad-oauth2");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _accountProvisioner = _interopRequireDefault(require("./../../../commands/accountProvisioner"));

var _env = _interopRequireDefault(require("./../../../env"));

var _errors = require("./../../../errors");

var _passport = _interopRequireDefault(require("./../../../middlewares/passport"));

var _passport2 = require("./../../../utils/passport");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _koaRouter.default();
const providerName = "azure";
const scopes = [];
const config = {
  name: "Microsoft",
  enabled: !!_env.default.AZURE_CLIENT_ID
};
exports.config = config;

if (_env.default.AZURE_CLIENT_ID && _env.default.AZURE_CLIENT_SECRET) {
  const strategy = new _passportAzureAdOauth.Strategy({
    clientID: _env.default.AZURE_CLIENT_ID,
    clientSecret: _env.default.AZURE_CLIENT_SECRET,
    callbackURL: `${_env.default.URL}/auth/azure.callback`,
    useCommonEndpoint: true,
    passReqToCallback: true,
    resource: _env.default.AZURE_RESOURCE_APP_ID,
    // @ts-expect-error StateStore
    store: new _passport2.StateStore(),
    scope: scopes
  }, async function (req, accessToken, refreshToken, params, _profile, done) {
    try {
      // see docs for what the fields in profile represent here:
      // https://docs.microsoft.com/en-us/azure/active-directory/develop/access-tokens
      const profile = _jsonwebtoken.default.decode(params.id_token);

      const [profileResponse, organizationResponse] = await Promise.all([// Load the users profile from the Microsoft Graph API
      // https://docs.microsoft.com/en-us/graph/api/resources/users?view=graph-rest-1.0
      (0, _passport2.request)(`https://graph.microsoft.com/v1.0/me`, accessToken), // Load the organization profile from the Microsoft Graph API
      // https://docs.microsoft.com/en-us/graph/api/organization-get?view=graph-rest-1.0
      (0, _passport2.request)(`https://graph.microsoft.com/v1.0/organization`, accessToken)]);

      if (!profileResponse) {
        throw (0, _errors.MicrosoftGraphError)("Unable to load user profile from Microsoft Graph API");
      }

      if (!organizationResponse) {
        throw (0, _errors.MicrosoftGraphError)("Unable to load organization info from Microsoft Graph API");
      }

      const organization = organizationResponse.value[0];
      const email = profile.email || profileResponse.mail;

      if (!email) {
        throw (0, _errors.MicrosoftGraphError)("'email' property is required but could not be found in user profile.");
      }

      const domain = email.split("@")[1];
      const subdomain = domain.split(".")[0];
      const teamName = organization.displayName;
      const result = await (0, _accountProvisioner.default)({
        ip: req.ip,
        team: {
          name: teamName,
          domain,
          subdomain
        },
        user: {
          name: profile.name,
          email,
          avatarUrl: profile.picture
        },
        authenticationProvider: {
          name: providerName,
          providerId: profile.tid
        },
        authentication: {
          providerId: profile.oid,
          accessToken,
          refreshToken,
          scopes
        }
      });
      return done(null, result.user, result);
    } catch (err) {
      return done(err, null);
    }
  });

  _koaPassport.default.use(strategy);

  router.get("azure", _koaPassport.default.authenticate(providerName));
  router.get("azure.callback", (0, _passport.default)(providerName));
}

var _default = router;
exports.default = _default;