"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = userDestroyer;

var _sequelize = require("sequelize");

var _sequelize2 = require("./../database/sequelize");

var _models = require("./../models");

var _errors = require("../errors");

async function userDestroyer({
  user,
  actor,
  ip
}) {
  const {
    teamId
  } = user;
  const usersCount = await _models.User.count({
    where: {
      teamId
    }
  });

  if (usersCount === 1) {
    throw (0, _errors.ValidationError)("Cannot delete last user on the team.");
  }

  if (user.isAdmin) {
    const otherAdminsCount = await _models.User.count({
      where: {
        isAdmin: true,
        teamId,
        id: {
          [_sequelize.Op.ne]: user.id
        }
      }
    });

    if (otherAdminsCount === 0) {
      throw (0, _errors.ValidationError)("Cannot delete account as only admin. Please make another user admin and try again.");
    }
  }

  const transaction = await _sequelize2.sequelize.transaction();
  let response;

  try {
    response = await user.destroy({
      transaction
    });
    await _models.Event.create({
      name: "users.delete",
      actorId: actor.id,
      userId: user.id,
      teamId,
      data: {
        name: user.name
      },
      ip
    }, {
      transaction
    });
    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    throw err;
  }

  return response;
}