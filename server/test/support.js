"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flushdb = flushdb;
exports.seed = void 0;

var _uuid = require("uuid");

var _sequelize = require("./../database/sequelize");

var _models = require("./../models");

const sql = _sequelize.sequelize.getQueryInterface();

const tables = Object.keys(_sequelize.sequelize.models).map(model => {
  const n = _sequelize.sequelize.models[model].getTableName();

  return sql.queryGenerator.quoteTable(typeof n === "string" ? n : n.tableName);
});
const flushQuery = `TRUNCATE ${tables.join(", ")} CASCADE`;

function flushdb() {
  return _sequelize.sequelize.query(flushQuery);
}

const seed = async () => {
  return _sequelize.sequelize.transaction(async transaction => {
    const team = await _models.Team.create({
      name: "Team",
      collaborativeEditing: false,
      authenticationProviders: [{
        name: "slack",
        providerId: (0, _uuid.v4)()
      }]
    }, {
      transaction,
      include: "authenticationProviders"
    });
    const authenticationProvider = team.authenticationProviders[0];
    const admin = await _models.User.create({
      email: "admin@example.com",
      username: "admin",
      name: "Admin User",
      teamId: team.id,
      isAdmin: true,
      createdAt: new Date("2018-01-01T00:00:00.000Z"),
      authentications: [{
        authenticationProviderId: authenticationProvider.id,
        providerId: (0, _uuid.v4)()
      }]
    }, {
      transaction,
      include: "authentications"
    });
    const user = await _models.User.create({
      id: "46fde1d4-0050-428f-9f0b-0bf77f4bdf61",
      email: "user1@example.com",
      name: "User 1",
      teamId: team.id,
      createdAt: new Date("2018-01-02T00:00:00.000Z"),
      authentications: [{
        authenticationProviderId: authenticationProvider.id,
        providerId: (0, _uuid.v4)()
      }]
    }, {
      transaction,
      include: "authentications"
    });
    const collection = await _models.Collection.create({
      name: "Collection",
      urlId: "collection",
      teamId: team.id,
      createdById: user.id,
      permission: "read_write"
    }, {
      transaction
    });
    const document = await _models.Document.create({
      parentDocumentId: null,
      collectionId: collection.id,
      teamId: team.id,
      userId: collection.createdById,
      lastModifiedById: collection.createdById,
      createdById: collection.createdById,
      title: "First ever document",
      text: "# Much test support"
    }, {
      transaction
    });
    await document.publish(collection.createdById, {
      transaction
    });
    await collection.reload({
      transaction
    });
    return {
      user,
      admin,
      collection,
      document,
      team
    };
  });
};

exports.seed = seed;