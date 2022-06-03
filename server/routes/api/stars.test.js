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
describe("#stars.create", () => {
  it("should create a star", async () => {
    const user = await (0, _factories.buildUser)();
    const document = await (0, _factories.buildDocument)({
      userId: user.id,
      teamId: user.teamId
    });
    const res = await server.post("/api/stars.create", {
      body: {
        token: user.getJwtToken(),
        documentId: document.id
      }
    });
    const body = await res.json();
    expect(res.status).toEqual(200);
    expect(body.data.documentId).toEqual(document.id);
  });
  it("should require authentication", async () => {
    const res = await server.post("/api/stars.create");
    expect(res.status).toEqual(401);
  });
});
describe("#stars.list", () => {
  it("should list users stars", async () => {
    const user = await (0, _factories.buildUser)();
    await (0, _factories.buildStar)();
    const star = await (0, _factories.buildStar)({
      userId: user.id
    });
    const res = await server.post("/api/stars.list", {
      body: {
        token: user.getJwtToken()
      }
    });
    const body = await res.json();
    expect(res.status).toEqual(200);
    expect(body.data.stars.length).toEqual(1);
    expect(body.data.stars[0].id).toEqual(star.id);
  });
  it("should require authentication", async () => {
    const res = await server.post("/api/stars.list");
    expect(res.status).toEqual(401);
  });
});
describe("#stars.delete", () => {
  it("should delete users star", async () => {
    const user = await (0, _factories.buildUser)();
    const star = await (0, _factories.buildStar)({
      userId: user.id
    });
    const res = await server.post("/api/stars.delete", {
      body: {
        id: star.id,
        token: user.getJwtToken()
      }
    });
    expect(res.status).toEqual(200);
  });
  it("should require authentication", async () => {
    const res = await server.post("/api/stars.delete");
    expect(res.status).toEqual(401);
  });
});