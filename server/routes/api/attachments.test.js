"use strict";

var _fetchTestServer = _interopRequireDefault(require("fetch-test-server"));

var _Attachment = _interopRequireDefault(require("./../../models/Attachment"));

var _web = _interopRequireDefault(require("./../../services/web"));

var _factories = require("./../../test/factories");

var _support = require("./../../test/support");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _web.default)();
const server = new _fetchTestServer.default(app.callback());
beforeEach(() => (0, _support.flushdb)());
afterAll(() => server.close());
describe("#attachments.delete", () => {
  it("should require authentication", async () => {
    const res = await server.post("/api/attachments.delete");
    expect(res.status).toEqual(401);
  });
  it("should allow deleting an attachment belonging to a document user has access to", async () => {
    const user = await (0, _factories.buildUser)();
    const attachment = await (0, _factories.buildAttachment)({
      teamId: user.teamId,
      userId: user.id
    });
    const res = await server.post("/api/attachments.delete", {
      body: {
        token: user.getJwtToken(),
        id: attachment.id
      }
    });
    expect(res.status).toEqual(200);
    expect(await _Attachment.default.count()).toEqual(0);
  });
  it("should allow deleting an attachment without a document created by user", async () => {
    const user = await (0, _factories.buildUser)();
    const attachment = await (0, _factories.buildAttachment)({
      teamId: user.teamId,
      userId: user.id
    });
    attachment.documentId = null;
    await attachment.save();
    const res = await server.post("/api/attachments.delete", {
      body: {
        token: user.getJwtToken(),
        id: attachment.id
      }
    });
    expect(res.status).toEqual(200);
    expect(await _Attachment.default.count()).toEqual(0);
  });
  it("should allow deleting an attachment without a document if admin", async () => {
    const user = await (0, _factories.buildAdmin)();
    const attachment = await (0, _factories.buildAttachment)({
      teamId: user.teamId
    });
    attachment.documentId = null;
    await attachment.save();
    const res = await server.post("/api/attachments.delete", {
      body: {
        token: user.getJwtToken(),
        id: attachment.id
      }
    });
    expect(res.status).toEqual(200);
    expect(await _Attachment.default.count()).toEqual(0);
  });
  it("should not allow deleting an attachment in another team", async () => {
    const user = await (0, _factories.buildAdmin)();
    const attachment = await (0, _factories.buildAttachment)();
    attachment.documentId = null;
    await attachment.save();
    const res = await server.post("/api/attachments.delete", {
      body: {
        token: user.getJwtToken(),
        id: attachment.id
      }
    });
    expect(res.status).toEqual(403);
  });
  it("should not allow deleting an attachment without a document", async () => {
    const user = await (0, _factories.buildUser)();
    const attachment = await (0, _factories.buildAttachment)({
      teamId: user.teamId
    });
    attachment.documentId = null;
    await attachment.save();
    const res = await server.post("/api/attachments.delete", {
      body: {
        token: user.getJwtToken(),
        id: attachment.id
      }
    });
    expect(res.status).toEqual(403);
  });
  it("should not allow deleting an attachment belonging to a document user does not have access to", async () => {
    const user = await (0, _factories.buildUser)();
    const collection = await (0, _factories.buildCollection)({
      permission: null
    });
    const document = await (0, _factories.buildDocument)({
      teamId: collection.teamId,
      userId: collection.createdById,
      collectionId: collection.id
    });
    const attachment = await (0, _factories.buildAttachment)({
      teamId: document.teamId,
      userId: document.createdById,
      documentId: document.id,
      acl: "private"
    });
    const res = await server.post("/api/attachments.delete", {
      body: {
        token: user.getJwtToken(),
        id: attachment.id
      }
    });
    expect(res.status).toEqual(403);
  });
});
describe("#attachments.redirect", () => {
  it("should require authentication", async () => {
    const res = await server.post("/api/attachments.redirect");
    expect(res.status).toEqual(401);
  });
  it("should return a redirect for an attachment belonging to a document user has access to", async () => {
    const user = await (0, _factories.buildUser)();
    const attachment = await (0, _factories.buildAttachment)({
      teamId: user.teamId,
      userId: user.id
    });
    const res = await server.post("/api/attachments.redirect", {
      body: {
        token: user.getJwtToken(),
        id: attachment.id
      },
      redirect: "manual"
    });
    expect(res.status).toEqual(302);
  });
  it("should return a redirect for an attachment belonging to a trashed document user has access to", async () => {
    const user = await (0, _factories.buildUser)();
    const collection = await (0, _factories.buildCollection)({
      teamId: user.teamId,
      userId: user.id
    });
    const document = await (0, _factories.buildDocument)({
      teamId: user.teamId,
      userId: user.id,
      collectionId: collection.id,
      deletedAt: new Date()
    });
    const attachment = await (0, _factories.buildAttachment)({
      documentId: document.id,
      teamId: user.teamId,
      userId: user.id
    });
    const res = await server.post("/api/attachments.redirect", {
      body: {
        token: user.getJwtToken(),
        id: attachment.id
      },
      redirect: "manual"
    });
    expect(res.status).toEqual(302);
  });
  it("should always return a redirect for a public attachment", async () => {
    const user = await (0, _factories.buildUser)();
    const collection = await (0, _factories.buildCollection)({
      teamId: user.teamId,
      userId: user.id,
      permission: null
    });
    const document = await (0, _factories.buildDocument)({
      teamId: user.teamId,
      userId: user.id,
      collectionId: collection.id
    });
    const attachment = await (0, _factories.buildAttachment)({
      teamId: user.teamId,
      userId: user.id,
      documentId: document.id
    });
    const res = await server.post("/api/attachments.redirect", {
      body: {
        token: user.getJwtToken(),
        id: attachment.id
      },
      redirect: "manual"
    });
    expect(res.status).toEqual(302);
  });
  it("should not return a redirect for a private attachment belonging to a document user does not have access to", async () => {
    const user = await (0, _factories.buildUser)();
    const collection = await (0, _factories.buildCollection)({
      permission: null
    });
    const document = await (0, _factories.buildDocument)({
      teamId: collection.teamId,
      userId: collection.createdById,
      collectionId: collection.id
    });
    const attachment = await (0, _factories.buildAttachment)({
      teamId: document.teamId,
      userId: document.createdById,
      documentId: document.id,
      acl: "private"
    });
    const res = await server.post("/api/attachments.redirect", {
      body: {
        token: user.getJwtToken(),
        id: attachment.id
      }
    });
    expect(res.status).toEqual(403);
  });
});