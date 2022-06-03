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
describe("#integrations.update", () => {
  it("should allow updating integration events", async () => {
    const team = await (0, _factories.buildTeam)();
    const user = await (0, _factories.buildAdmin)({
      teamId: team.id
    });
    const integration = await (0, _factories.buildIntegration)({
      userId: user.id,
      teamId: team.id
    });
    const res = await server.post("/api/integrations.update", {
      body: {
        events: ["documents.update"],
        token: user.getJwtToken(),
        id: integration.id
      }
    });
    const body = await res.json();
    expect(res.status).toEqual(200);
    expect(body.data.id).toEqual(integration.id);
    expect(body.data.events.length).toEqual(1);
  });
  it("should require authorization", async () => {
    const user = await (0, _factories.buildUser)();
    const integration = await (0, _factories.buildIntegration)({
      userId: user.id
    });
    const res = await server.post("/api/integrations.update", {
      body: {
        token: user.getJwtToken(),
        id: integration.id
      }
    });
    expect(res.status).toEqual(403);
  });
});