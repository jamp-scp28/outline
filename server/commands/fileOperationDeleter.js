"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = fileOperationDeleter;

var _sequelize = require("./../database/sequelize");

var _models = require("./../models");

async function fileOperationDeleter(fileOperation, user, ip) {
  const transaction = await _sequelize.sequelize.transaction();

  try {
    await fileOperation.destroy({
      transaction
    });
    await _models.Event.create({
      name: "fileOperations.delete",
      teamId: user.teamId,
      actorId: user.id,
      modelId: fileOperation.id,
      ip
    }, {
      transaction
    });
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}