"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.config = void 0;

var _dateFns = require("date-fns");

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _lodash = require("lodash");

var _domains = require("./../../../../shared/utils/domains");

var _SigninEmail = _interopRequireDefault(require("./../../../emails/templates/SigninEmail"));

var _WelcomeEmail = _interopRequireDefault(require("./../../../emails/templates/WelcomeEmail"));

var _env = _interopRequireDefault(require("./../../../env"));

var _errors = require("./../../../errors");

var _errorHandling = _interopRequireDefault(require("./../../../middlewares/errorHandling"));

var _methodOverride = _interopRequireDefault(require("./../../../middlewares/methodOverride"));

var _models = require("./../../../models");

var _authentication = require("./../../../utils/authentication");

var _domains2 = require("./../../../utils/domains");

var _jwt = require("./../../../utils/jwt");

var _validation = require("./../../../validation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _koaRouter.default();
const config = {
  name: "Email",
  enabled: true
};
exports.config = config;
router.use((0, _methodOverride.default)());
router.post("email", (0, _errorHandling.default)(), async ctx => {
  const {
    email
  } = ctx.body;
  (0, _validation.assertEmail)(email, "email is required");
  const users = await _models.User.scope("withAuthentications").findAll({
    where: {
      email: email.toLowerCase()
    }
  });

  if (users.length) {
    let team;

    if ((0, _domains2.isCustomDomain)(ctx.request.hostname)) {
      team = await _models.Team.scope("withAuthenticationProviders").findOne({
        where: {
          domain: ctx.request.hostname
        }
      });
    }

    if (_env.default.SUBDOMAINS_ENABLED && (0, _domains.isCustomSubdomain)(ctx.request.hostname) && !(0, _domains2.isCustomDomain)(ctx.request.hostname)) {
      const domain = (0, _domains.parseDomain)(ctx.request.hostname);
      const subdomain = domain ? domain.subdomain : undefined;
      team = await _models.Team.scope("withAuthenticationProviders").findOne({
        where: {
          subdomain
        }
      });
    } // If there are multiple users with this email address then give precedence
    // to the one that is active on this subdomain/domain (if any)


    let user = users.find(user => team && user.teamId === team.id); // A user was found for the email address, but they don't belong to the team
    // that this subdomain belongs to, we load their team and allow the logic to
    // continue

    if (!user) {
      user = users[0];
      team = await _models.Team.scope("withAuthenticationProviders").findByPk(user.teamId);
    }

    if (!team) {
      team = await _models.Team.scope("withAuthenticationProviders").findByPk(user.teamId);
    }

    if (!team) {
      ctx.redirect(`/?notice=auth-error`);
      return;
    } // If the user matches an email address associated with an SSO
    // provider then just forward them directly to that sign-in page


    if (user.authentications.length) {
      const authProvider = (0, _lodash.find)(team.authenticationProviders, {
        id: user.authentications[0].authenticationProviderId
      });
      ctx.body = {
        redirect: `${team.url}/auth/${authProvider === null || authProvider === void 0 ? void 0 : authProvider.name}`
      };
      return;
    }

    if (!team.emailSigninEnabled) {
      throw (0, _errors.AuthorizationError)();
    } // basic rate limit of endpoint to prevent send email abuse


    if (user.lastSigninEmailSentAt && user.lastSigninEmailSentAt > (0, _dateFns.subMinutes)(new Date(), 2)) {
      ctx.body = {
        redirect: `${team.url}?notice=email-auth-ratelimit`,
        message: "Rate limit exceeded",
        success: false
      };
      return;
    } // send email to users registered address with a short-lived token


    await _SigninEmail.default.schedule({
      to: user.email,
      token: user.getEmailSigninToken(),
      teamUrl: team.url
    });
    user.lastSigninEmailSentAt = new Date();
    await user.save();
  } // respond with success regardless of whether an email was sent


  ctx.body = {
    success: true
  };
});
router.get("email.callback", async ctx => {
  const {
    token
  } = ctx.request.query;
  (0, _validation.assertPresent)(token, "token is required");
  let user;

  try {
    user = await (0, _jwt.getUserForEmailSigninToken)(token);
  } catch (err) {
    ctx.redirect(`/?notice=expired-token`);
    return;
  }

  if (!user.team.emailSigninEnabled) {
    return ctx.redirect("/?notice=auth-error");
  }

  if (user.isSuspended) {
    return ctx.redirect("/?notice=suspended");
  }

  if (user.isInvited) {
    await _WelcomeEmail.default.schedule({
      to: user.email,
      teamUrl: user.team.url
    });
  }

  await user.update({
    lastActiveAt: new Date()
  }); // set cookies on response and redirect to team subdomain

  await (0, _authentication.signIn)(ctx, user, user.team, "email", false, false);
});
var _default = router;
exports.default = _default;