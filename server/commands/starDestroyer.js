"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = starDestroyer;

var _sequelize = require("./../database/sequelize");

var _models = require("./../models");

/**
 * This command destroys a document star. This just removes the star itself and
 * does not touch the document
 *
 * @param Props The properties of the star to destroy
 * @returns void
 */
async function starDestroyer({
  user,
  star,
  ip,
  transaction: t
}) {
  const transaction = t || (await _sequelize.sequelize.transaction());

  try {
    await star.destroy({
      transaction
    });
    await _models.Event.create({
      name: "stars.delete",
      modelId: star.id,
      teamId: user.teamId,
      actorId: user.id,
      userId: star.userId,
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