"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = userInviter;

var _invariant = _interopRequireDefault(require("invariant"));

var _lodash = require("lodash");

var _InviteEmail = _interopRequireDefault(require("./../emails/templates/InviteEmail"));

var _env = _interopRequireDefault(require("./../env"));

var _Logger = _interopRequireDefault(require("./../logging/Logger"));

var _models = require("./../models");

var _User = require("./../models/User");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function userInviter({
  user,
  invites,
  ip
}) {
  const team = await _models.Team.findByPk(user.teamId);
  (0, _invariant.default)(team, "team not found"); // filter out empties and obvious non-emails

  const compactedInvites = invites.filter(invite => !!invite.email.trim() && invite.email.match("@")); // normalize to lowercase and remove duplicates

  const normalizedInvites = (0, _lodash.uniqBy)(compactedInvites.map(invite => ({ ...invite,
    email: invite.email.toLowerCase()
  })), "email"); // filter out any existing users in the system

  const emails = normalizedInvites.map(invite => invite.email);
  const existingUsers = await _models.User.findAll({
    where: {
      teamId: user.teamId,
      email: emails
    }
  });
  const existingEmails = existingUsers.map(user => user.email);
  const filteredInvites = normalizedInvites.filter(invite => !existingEmails.includes(invite.email));
  const users = []; // send and record remaining invites

  for (const invite of filteredInvites) {
    const newUser = await _models.User.create({
      teamId: user.teamId,
      name: invite.name,
      email: invite.email,
      service: null,
      isAdmin: invite.role === "admin",
      isViewer: invite.role === "viewer",
      invitedById: user.id,
      flags: {
        [_User.UserFlag.InviteSent]: 1
      }
    });
    users.push(newUser);
    await _models.Event.create({
      name: "users.invite",
      actorId: user.id,
      teamId: user.teamId,
      data: {
        email: invite.email,
        name: invite.name,
        role: invite.role
      },
      ip
    });
    await _InviteEmail.default.schedule({
      to: invite.email,
      name: invite.name,
      actorName: user.name,
      actorEmail: user.email,
      teamName: team.name,
      teamUrl: team.url
    });

    if (_env.default.ENVIRONMENT === "development") {
      _Logger.default.info("email", `Sign in immediately: ${_env.default.URL}/auth/email.callback?token=${newUser.getEmailSigninToken()}`);
    }
  }

  return {
    sent: filteredInvites,
    users
  };
}