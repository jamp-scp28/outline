"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createMiddleware;

var _koaPassport = _interopRequireDefault(require("@outlinewiki/koa-passport"));

var _env = _interopRequireDefault(require("./../env"));

var _Logger = _interopRequireDefault(require("./../logging/Logger"));

var _authentication = require("./../utils/authentication");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createMiddleware(providerName) {
  return function passportMiddleware(ctx) {
    return _koaPassport.default.authorize(providerName, {
      session: false
    }, async (err, user, result) => {
      if (err) {
        _Logger.default.error("Error during authentication", err);

        if (err.id) {
          const notice = err.id.replace(/_/g, "-");
          return ctx.redirect(`${err.redirectUrl || "/"}?notice=${notice}`);
        }

        if (_env.default.ENVIRONMENT === "development") {
          throw err;
        }

        return ctx.redirect(`/?notice=auth-error`);
      } // Passport.js may invoke this callback with err=null and user=null in
      // the event that error=access_denied is received from the OAuth server.
      // I'm not sure why this exception to the rule exists, but it does:
      // https://github.com/jaredhanson/passport-oauth2/blob/e20f26aad60ed54f0e7952928cbb64979ef8da2b/lib/strategy.js#L135


      if (!user) {
        return ctx.redirect(`/?notice=auth-error`);
      } // Handle errors from Azure which come in the format: message, Trace ID,
      // Correlation ID, Timestamp in these two query string parameters.


      const {
        error,
        error_description
      } = ctx.request.query;

      if (error && error_description) {
        _Logger.default.error("Error from Azure during authentication", // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string | string[]' is not assign... Remove this comment to see the full error message
        new Error(error_description)); // Display only the descriptive message to the user, log the rest
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'split' does not exist on type 'string | ... Remove this comment to see the full error message


        const description = error_description.split("Trace ID")[0];
        return ctx.redirect(`/?notice=auth-error&description=${description}`);
      }

      if (result.user.isSuspended) {
        return ctx.redirect("/?notice=suspended");
      }

      await (0, _authentication.signIn)(ctx, result.user, result.team, providerName, result.isNewUser, result.isNewTeam);
    })(ctx);
  };
}