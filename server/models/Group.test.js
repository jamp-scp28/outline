"use strict";

var _factories = require("./../test/factories");

var _support = require("./../test/support");

var _CollectionGroup = _interopRequireDefault(require("./CollectionGroup"));

var _GroupUser = _interopRequireDefault(require("./GroupUser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

beforeEach(() => (0, _support.flushdb)());
beforeEach(jest.resetAllMocks);
describe("afterDestroy hook", () => {
  test("should destroy associated group and collection join relations", async () => {
    const group = await (0, _factories.buildGroup)();
    const teamId = group.teamId;
    const user1 = await (0, _factories.buildUser)({
      teamId
    });
    const user2 = await (0, _factories.buildUser)({
      teamId
    });
    const collection1 = await (0, _factories.buildCollection)({
      permission: null,
      teamId
    });
    const collection2 = await (0, _factories.buildCollection)({
      permission: null,
      teamId
    });
    const createdById = user1.id;
    await group.$add("user", user1, {
      through: {
        createdById
      }
    });
    await group.$add("user", user2, {
      through: {
        createdById
      }
    });
    await collection1.$add("group", group, {
      through: {
        createdById
      }
    });
    await collection2.$add("group", group, {
      through: {
        createdById
      }
    });
    let collectionGroupCount = await _CollectionGroup.default.count();
    let groupUserCount = await _GroupUser.default.count();
    expect(collectionGroupCount).toBe(2);
    expect(groupUserCount).toBe(2);
    await group.destroy();
    collectionGroupCount = await _CollectionGroup.default.count();
    groupUserCount = await _GroupUser.default.count();
    expect(collectionGroupCount).toBe(0);
    expect(groupUserCount).toBe(0);
  });
});