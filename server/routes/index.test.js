"use strict";

var _fetchTestServer = _interopRequireDefault(require("fetch-test-server"));

var _factories = require("./../test/factories");

var _support = require("./../test/support");

var _web = _interopRequireDefault(require("../services/web"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _web.default)();
const server = new _fetchTestServer.default(app.callback());
beforeEach(() => (0, _support.flushdb)());
afterAll(() => server.close());
describe("/share/:id", () => {
  it("should return standard title in html when loading share", async () => {
    const share = await (0, _factories.buildShare)({
      published: false
    });
    const res = await server.get(`/share/${share.id}`);
    const body = await res.text();
    expect(res.status).toEqual(200);
    expect(body).toContain("<title>Outline</title>");
  });
  it("should return standard title in html when share does not exist", async () => {
    const res = await server.get(`/share/junk`);
    const body = await res.text();
    expect(res.status).toEqual(200);
    expect(body).toContain("<title>Outline</title>");
  });
  it("should return standard title in html when document is deleted", async () => {
    const document = await (0, _factories.buildDocument)();
    const share = await (0, _factories.buildShare)({
      documentId: document.id
    });
    await document.destroy();
    const res = await server.get(`/share/${share.id}`);
    const body = await res.text();
    expect(res.status).toEqual(200);
    expect(body).toContain("<title>Outline</title>");
  });
  it("should return document title in html when loading published share", async () => {
    const document = await (0, _factories.buildDocument)();
    const share = await (0, _factories.buildShare)({
      documentId: document.id
    });
    const res = await server.get(`/share/${share.id}`);
    const body = await res.text();
    expect(res.status).toEqual(200);
    expect(body).toContain(`<title>${document.title}</title>`);
  });
  it("should return document title in html when loading published share with nested doc route", async () => {
    const document = await (0, _factories.buildDocument)();
    const share = await (0, _factories.buildShare)({
      documentId: document.id
    });
    const res = await server.get(`/share/${share.id}/doc/test-Cl6g1AgPYn`);
    const body = await res.text();
    expect(res.status).toEqual(200);
    expect(body).toContain(`<title>${document.title}</title>`);
  });
});