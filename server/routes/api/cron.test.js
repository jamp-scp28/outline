"use strict";

var _fetchTestServer = _interopRequireDefault(require("fetch-test-server"));

var _web = _interopRequireDefault(require("./../../services/web"));

var _support = require("./../../test/support");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _web.default)();
const server = new _fetchTestServer.default(app.callback());
beforeEach(() => (0, _support.flushdb)());
afterAll(() => server.close());
describe("#cron.daily", () => {
  it("should require authentication", async () => {
    const res = await server.post("/api/cron.daily");
    expect(res.status).toEqual(401);
  });
});