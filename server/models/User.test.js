"use strict";

var _factories = require("./../test/factories");

var _support = require("./../test/support");

var _CollectionUser = _interopRequireDefault(require("./CollectionUser"));

var _UserAuthentication = _interopRequireDefault(require("./UserAuthentication"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

beforeEach(() => (0, _support.flushdb)());
beforeAll(() => {
  jest.useFakeTimers().setSystemTime(new Date("2018-01-02T00:00:00.000Z"));
});
afterAll(() => {
  jest.useRealTimers();
});
describe("user model", () => {
  describe("destroy", () => {
    it("should delete user authentications", async () => {
      const user = await (0, _factories.buildUser)();
      expect(await _UserAuthentication.default.count()).toBe(1);
      await user.destroy();
      expect(await _UserAuthentication.default.count()).toBe(0);
    });
  });
  describe("getJwtToken", () => {
    it("should set JWT secret", async () => {
      const user = await (0, _factories.buildUser)();
      expect(user.getJwtToken()).toBeTruthy();
    });
  });
  describe("collectionIds", () => {
    it("should return read_write collections", async () => {
      const team = await (0, _factories.buildTeam)();
      const user = await (0, _factories.buildUser)({
        teamId: team.id
      });
      const collection = await (0, _factories.buildCollection)({
        teamId: team.id,
        permission: "read_write"
      });
      const response = await user.collectionIds();
      expect(response.length).toEqual(1);
      expect(response[0]).toEqual(collection.id);
    });
    it("should return read collections", async () => {
      const team = await (0, _factories.buildTeam)();
      const user = await (0, _factories.buildUser)({
        teamId: team.id
      });
      const collection = await (0, _factories.buildCollection)({
        teamId: team.id,
        permission: "read"
      });
      const response = await user.collectionIds();
      expect(response.length).toEqual(1);
      expect(response[0]).toEqual(collection.id);
    });
    it("should not return private collections", async () => {
      const team = await (0, _factories.buildTeam)();
      const user = await (0, _factories.buildUser)({
        teamId: team.id
      });
      await (0, _factories.buildCollection)({
        teamId: team.id,
        permission: null
      });
      const response = await user.collectionIds();
      expect(response.length).toEqual(0);
    });
    it("should not return private collection with membership", async () => {
      const team = await (0, _factories.buildTeam)();
      const user = await (0, _factories.buildUser)({
        teamId: team.id
      });
      const collection = await (0, _factories.buildCollection)({
        teamId: team.id,
        permission: null
      });
      await _CollectionUser.default.create({
        createdById: user.id,
        collectionId: collection.id,
        userId: user.id,
        permission: "read"
      });
      const response = await user.collectionIds();
      expect(response.length).toEqual(1);
      expect(response[0]).toEqual(collection.id);
    });
  });
});