"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = starUpdater;

var _sequelize = require("./../database/sequelize");

var _models = require("./../models");

/**
 * This command updates a "starred" document. A star can only be moved to a new
 * index (reordered) once created.
 *
 * @param Props The properties of the star to update
 * @returns Star The updated star
 */
async function starUpdater({
  user,
  star,
  index,
  ip
}) {
  const transaction = await _sequelize.sequelize.transaction();

  try {
    star.index = index;
    await star.save({
      transaction
    });
    await _models.Event.create({
      name: "stars.update",
      modelId: star.id,
      userId: star.userId,
      teamId: user.teamId,
      actorId: user.id,
      documentId: star.documentId,
      ip
    }, {
      transaction
    });
    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    throw err;
  }

  return star;
}