"use strict";

var _models = require("./../models");

var _factories = require("./../test/factories");

var _support = require("./../test/support");

var _index = require("./index");

beforeEach(() => (0, _support.flushdb)());
describe("read_write permission", () => {
  it("should allow read write permissions for team member", async () => {
    const team = await (0, _factories.buildTeam)();
    const user = await (0, _factories.buildUser)({
      teamId: team.id
    });
    const collection = await (0, _factories.buildCollection)({
      teamId: team.id,
      permission: "read_write"
    });
    const abilities = (0, _index.serialize)(user, collection);
    expect(abilities.read).toEqual(true);
    expect(abilities.update).toEqual(true);
    expect(abilities.share).toEqual(true);
  });
  it("should override read membership permission", async () => {
    const team = await (0, _factories.buildTeam)();
    const user = await (0, _factories.buildUser)({
      teamId: team.id
    });
    const collection = await (0, _factories.buildCollection)({
      teamId: team.id,
      permission: "read_write"
    });
    await _models.CollectionUser.create({
      createdById: user.id,
      collectionId: collection.id,
      userId: user.id,
      permission: "read"
    }); // reload to get membership

    const reloaded = await _models.Collection.scope({
      method: ["withMembership", user.id]
    }).findByPk(collection.id);
    const abilities = (0, _index.serialize)(user, reloaded);
    expect(abilities.read).toEqual(true);
    expect(abilities.update).toEqual(true);
    expect(abilities.share).toEqual(true);
  });
});
describe("read permission", () => {
  it("should allow read permissions for team member", async () => {
    const team = await (0, _factories.buildTeam)();
    const user = await (0, _factories.buildUser)({
      teamId: team.id
    });
    const collection = await (0, _factories.buildCollection)({
      teamId: team.id,
      permission: "read"
    });
    const abilities = (0, _index.serialize)(user, collection);
    expect(abilities.read).toEqual(true);
    expect(abilities.update).toEqual(false);
    expect(abilities.share).toEqual(false);
  });
  it("should allow override with read_write membership permission", async () => {
    const team = await (0, _factories.buildTeam)();
    const user = await (0, _factories.buildUser)({
      teamId: team.id
    });
    const collection = await (0, _factories.buildCollection)({
      teamId: team.id,
      permission: "read"
    });
    await _models.CollectionUser.create({
      createdById: user.id,
      collectionId: collection.id,
      userId: user.id,
      permission: "read_write"
    }); // reload to get membership

    const reloaded = await _models.Collection.scope({
      method: ["withMembership", user.id]
    }).findByPk(collection.id);
    const abilities = (0, _index.serialize)(user, reloaded);
    expect(abilities.read).toEqual(true);
    expect(abilities.update).toEqual(true);
    expect(abilities.share).toEqual(true);
  });
});
describe("no permission", () => {
  it("should allow no permissions for team member", async () => {
    const team = await (0, _factories.buildTeam)();
    const user = await (0, _factories.buildUser)({
      teamId: team.id
    });
    const collection = await (0, _factories.buildCollection)({
      teamId: team.id,
      permission: null
    });
    const abilities = (0, _index.serialize)(user, collection);
    expect(abilities.read).toEqual(false);
    expect(abilities.update).toEqual(false);
    expect(abilities.share).toEqual(false);
  });
  it("should allow override with team member membership permission", async () => {
    const team = await (0, _factories.buildTeam)();
    const user = await (0, _factories.buildUser)({
      teamId: team.id
    });
    const collection = await (0, _factories.buildCollection)({
      teamId: team.id,
      permission: null
    });
    await _models.CollectionUser.create({
      createdById: user.id,
      collectionId: collection.id,
      userId: user.id,
      permission: "read_write"
    }); // reload to get membership

    const reloaded = await _models.Collection.scope({
      method: ["withMembership", user.id]
    }).findByPk(collection.id);
    const abilities = (0, _index.serialize)(user, reloaded);
    expect(abilities.read).toEqual(true);
    expect(abilities.update).toEqual(true);
    expect(abilities.share).toEqual(true);
  });
});