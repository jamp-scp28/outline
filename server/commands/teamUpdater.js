"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = require("./../database/sequelize");

var _env = _interopRequireDefault(require("./../env"));

var _models = require("./../models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const teamUpdater = async ({
  params,
  user,
  team,
  ip
}) => {
  const {
    name,
    avatarUrl,
    subdomain,
    sharing,
    guestSignin,
    documentEmbeds,
    memberCollectionCreate,
    collaborativeEditing,
    defaultCollectionId,
    defaultUserRole,
    inviteRequired,
    allowedDomains
  } = params;
  const transaction = await _sequelize.sequelize.transaction();

  if (subdomain !== undefined && _env.default.SUBDOMAINS_ENABLED) {
    team.subdomain = subdomain === "" ? null : subdomain;
  }

  if (name) {
    team.name = name;
  }

  if (sharing !== undefined) {
    team.sharing = sharing;
  }

  if (documentEmbeds !== undefined) {
    team.documentEmbeds = documentEmbeds;
  }

  if (guestSignin !== undefined) {
    team.guestSignin = guestSignin;
  }

  if (avatarUrl !== undefined) {
    team.avatarUrl = avatarUrl;
  }

  if (memberCollectionCreate !== undefined) {
    team.memberCollectionCreate = memberCollectionCreate;
  }

  if (defaultCollectionId !== undefined) {
    team.defaultCollectionId = defaultCollectionId;
  }

  if (collaborativeEditing !== undefined) {
    team.collaborativeEditing = collaborativeEditing;
  }

  if (defaultUserRole !== undefined) {
    team.defaultUserRole = defaultUserRole;
  }

  if (inviteRequired !== undefined) {
    team.inviteRequired = inviteRequired;
  }

  if (allowedDomains !== undefined) {
    const existingAllowedDomains = await _models.TeamDomain.findAll({
      where: {
        teamId: team.id
      },
      transaction
    }); // Only keep existing domains if they are still in the list of allowed domains

    const newAllowedDomains = team.allowedDomains.filter(existingTeamDomain => allowedDomains.includes(existingTeamDomain.name)); // Add new domains

    const existingDomains = team.allowedDomains.map(x => x.name);
    const newDomains = allowedDomains.filter(newDomain => newDomain !== "" && !existingDomains.includes(newDomain));
    await Promise.all(newDomains.map(async newDomain => {
      newAllowedDomains.push(await _models.TeamDomain.create({
        name: newDomain,
        teamId: team.id,
        createdById: user.id
      }, {
        transaction
      }));
    })); // Destroy the existing TeamDomains that were removed

    const deletedDomains = existingAllowedDomains.filter(x => !allowedDomains.includes(x.name));

    for (const deletedDomain of deletedDomains) {
      deletedDomain.destroy({
        transaction
      });
    }

    team.allowedDomains = newAllowedDomains;
  }

  const changes = team.changed();

  try {
    const savedTeam = await team.save({
      transaction
    });

    if (changes) {
      const data = changes.reduce((acc, curr) => {
        return { ...acc,
          [curr]: team[curr]
        };
      }, {});
      await _models.Event.create({
        name: "teams.update",
        actorId: user.id,
        teamId: user.teamId,
        data,
        ip: ip
      }, {
        transaction
      });
    }

    await transaction.commit();
    return savedTeam;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

var _default = teamUpdater;
exports.default = _default;