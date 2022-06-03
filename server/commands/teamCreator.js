"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _invariant = _interopRequireDefault(require("invariant"));

var _env = _interopRequireDefault(require("./../env"));

var _errors = require("./../errors");

var _Logger = _interopRequireDefault(require("./../logging/Logger"));

var _tracing = require("./../logging/tracing");

var _models = require("./../models");

var _avatars = require("./../utils/avatars");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function teamCreator({
  name,
  domain,
  subdomain,
  avatarUrl,
  authenticationProvider
}) {
  let authP = await _models.AuthenticationProvider.findOne({
    where: authenticationProvider,
    include: [{
      model: _models.Team,
      as: "team",
      required: true
    }]
  }); // This authentication provider already exists which means we have a team and
  // there is nothing left to do but return the existing credentials

  if (authP) {
    return {
      authenticationProvider: authP,
      team: authP.team,
      isNewTeam: false
    };
  } // This team has never been seen before, if self hosted the logic is different
  // to the multi-tenant version, we want to restrict to a single team that MAY
  // have multiple authentication providers


  if (_env.default.DEPLOYMENT !== "hosted") {
    const teamCount = await _models.Team.count(); // If the self-hosted installation has a single team and the domain for the
    // new team is allowed then assign the authentication provider to the
    // existing team

    if (teamCount === 1 && domain) {
      const team = await _models.Team.findOne();
      (0, _invariant.default)(team, "Team should exist");

      if (await team.isDomainAllowed(domain)) {
        authP = await team.$create("authenticationProvider", authenticationProvider);
        return {
          authenticationProvider: authP,
          team,
          isNewTeam: false
        };
      } else {
        throw (0, _errors.DomainNotAllowedError)();
      }
    }

    if (teamCount >= 1) {
      throw (0, _errors.MaximumTeamsError)();
    }
  } // If the service did not provide a logo/avatar then we attempt to generate
  // one via ClearBit, or fallback to colored initials in worst case scenario


  if (!avatarUrl) {
    avatarUrl = await (0, _avatars.generateAvatarUrl)({
      name,
      domain,
      id: subdomain
    });
  }

  const transaction = await _models.Team.sequelize.transaction();
  let team;

  try {
    team = await _models.Team.create({
      name,
      avatarUrl,
      authenticationProviders: [authenticationProvider]
    }, {
      include: "authenticationProviders",
      transaction
    });
    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    throw err;
  }

  try {
    await team.provisionSubdomain(subdomain);
  } catch (err) {
    _Logger.default.error("Provisioning subdomain failed", err, {
      teamId: team.id,
      subdomain
    });
  }

  return {
    team,
    authenticationProvider: team.authenticationProviders[0],
    isNewTeam: true
  };
}

var _default = _tracing.APM.traceFunction({
  serviceName: "command",
  spanName: "teamCreator"
})(teamCreator);

exports.default = _default;