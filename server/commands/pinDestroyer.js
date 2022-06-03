"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pinDestroyer;

var _models = require("./../models");

/**
 * This command destroys a document pin. This just removes the pin itself and
 * does not touch the document
 *
 * @param Props The properties of the pin to destroy
 * @returns void
 */
async function pinDestroyer({
  user,
  pin,
  ip,
  transaction
}) {
  await _models.Event.create({
    name: "pins.delete",
    modelId: pin.id,
    teamId: user.teamId,
    actorId: user.id,
    documentId: pin.documentId,
    collectionId: pin.collectionId,
    ip
  }, {
    transaction
  });
  await pin.destroy({
    transaction
  });
  return pin;
}