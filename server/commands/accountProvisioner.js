"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _invariant = _interopRequireDefault(require("invariant"));

var _sequelize = require("sequelize");

var _WelcomeEmail = _interopRequireDefault(require("./../emails/templates/WelcomeEmail"));

var _errors = require("./../errors");

var _tracing = require("./../logging/tracing");

var _models = require("./../models");

var _teamCreator = _interopRequireDefault(require("./teamCreator"));

var _userCreator = _interopRequireDefault(require("./userCreator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function accountProvisioner({
  ip,
  user: userParams,
  team: teamParams,
  authenticationProvider: authenticationProviderParams,
  authentication: authenticationParams
}) {
  let result;

  try {
    result = await (0, _teamCreator.default)({
      name: teamParams.name,
      domain: teamParams.domain,
      subdomain: teamParams.subdomain,
      avatarUrl: teamParams.avatarUrl,
      authenticationProvider: authenticationProviderParams
    });
  } catch (err) {
    throw (0, _errors.AuthenticationError)(err.message);
  }

  (0, _invariant.default)(result, "Team creator result must exist");
  const {
    authenticationProvider,
    team,
    isNewTeam
  } = result;

  if (!authenticationProvider.enabled) {
    throw (0, _errors.AuthenticationProviderDisabledError)();
  }

  try {
    const result = await (0, _userCreator.default)({
      name: userParams.name,
      email: userParams.email,
      username: userParams.username,
      isAdmin: isNewTeam || undefined,
      avatarUrl: userParams.avatarUrl,
      teamId: team.id,
      ip,
      authentication: { ...authenticationParams,
        authenticationProviderId: authenticationProvider.id
      }
    });
    const {
      isNewUser,
      user
    } = result;

    if (isNewUser) {
      await _WelcomeEmail.default.schedule({
        to: user.email,
        teamUrl: team.url
      });
    }

    if (isNewUser || isNewTeam) {
      let provision = isNewTeam; // accounts for the case where a team is provisioned, but the user creation
      // failed. In this case we have a valid previously created team but no
      // onboarding collection.

      if (!isNewTeam) {
        const count = await _models.Collection.count({
          where: {
            teamId: team.id
          }
        });
        provision = count === 0;
      }

      if (provision) {
        await team.provisionFirstCollection(user.id);
      }
    }

    return {
      user,
      team,
      isNewUser,
      isNewTeam
    };
  } catch (err) {
    if (err instanceof _sequelize.UniqueConstraintError) {
      const exists = await _models.User.findOne({
        where: {
          email: userParams.email,
          teamId: team.id
        }
      });

      if (exists) {
        throw (0, _errors.EmailAuthenticationRequiredError)("Email authentication required", team.url);
      } else {
        throw (0, _errors.AuthenticationError)(err.message, team.url);
      }
    }

    throw err;
  }
}

var _default = _tracing.APM.traceFunction({
  serviceName: "command",
  spanName: "accountProvisioner"
})(accountProvisioner);

exports.default = _default;