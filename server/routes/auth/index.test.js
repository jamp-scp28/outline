"use strict";

var _fetchTestServer = _interopRequireDefault(require("fetch-test-server"));

var _web = _interopRequireDefault(require("./../../services/web"));

var _factories = require("./../../test/factories");

var _support = require("./../../test/support");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _web.default)();
const server = new _fetchTestServer.default(app.callback());
beforeEach(() => (0, _support.flushdb)());
afterAll(() => server.close());
describe("auth/redirect", () => {
  it("should redirect to home", async () => {
    const user = await (0, _factories.buildUser)();
    const res = await server.get(`/auth/redirect?token=${user.getTransferToken()}`, {
      redirect: "manual"
    });
    expect(res.status).toEqual(302);
    expect(res.headers.get("location").endsWith("/home")).toBeTruthy();
  });
  it("should redirect to first collection", async () => {
    const collection = await (0, _factories.buildCollection)();
    const user = await (0, _factories.buildUser)({
      teamId: collection.teamId
    });
    const res = await server.get(`/auth/redirect?token=${user.getTransferToken()}`, {
      redirect: "manual"
    });
    expect(res.status).toEqual(302);
    expect(res.headers.get("location").endsWith(collection.url)).toBeTruthy();
  });
});