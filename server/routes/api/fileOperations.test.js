"use strict";

var _fetchTestServer = _interopRequireDefault(require("fetch-test-server"));

var _models = require("./../../models");

var _FileOperation = require("./../../models/FileOperation");

var _web = _interopRequireDefault(require("./../../services/web"));

var _factories = require("./../../test/factories");

var _support = require("./../../test/support");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _web.default)();
const server = new _fetchTestServer.default(app.callback());
beforeEach(() => (0, _support.flushdb)());
afterAll(() => server.close());
describe("#fileOperations.info", () => {
  it("should return fileOperation", async () => {
    const team = await (0, _factories.buildTeam)();
    const admin = await (0, _factories.buildAdmin)({
      teamId: team.id
    });
    const exportData = await (0, _factories.buildFileOperation)({
      type: _FileOperation.FileOperationType.Export,
      teamId: team.id,
      userId: admin.id
    });
    const res = await server.post("/api/fileOperations.info", {
      body: {
        id: exportData.id,
        token: admin.getJwtToken(),
        type: _FileOperation.FileOperationType.Export
      }
    });
    const body = await res.json();
    expect(res.status).toEqual(200);
    expect(body.data.id).toBe(exportData.id);
    expect(body.data.state).toBe(exportData.state);
  });
  it("should require user to be an admin", async () => {
    const team = await (0, _factories.buildTeam)();
    const admin = await (0, _factories.buildAdmin)({
      teamId: team.id
    });
    const user = await (0, _factories.buildUser)({
      teamId: team.id
    });
    const exportData = await (0, _factories.buildFileOperation)({
      type: _FileOperation.FileOperationType.Export,
      teamId: team.id,
      userId: admin.id
    });
    const res = await server.post("/api/fileOperations.info", {
      body: {
        id: exportData.id,
        token: user.getJwtToken(),
        type: _FileOperation.FileOperationType.Export
      }
    });
    expect(res.status).toEqual(403);
  });
});
describe("#fileOperations.list", () => {
  it("should return fileOperations list", async () => {
    const team = await (0, _factories.buildTeam)();
    const admin = await (0, _factories.buildAdmin)({
      teamId: team.id
    });
    const exportData = await (0, _factories.buildFileOperation)({
      type: _FileOperation.FileOperationType.Export,
      teamId: team.id,
      userId: admin.id
    });
    const res = await server.post("/api/fileOperations.list", {
      body: {
        token: admin.getJwtToken(),
        type: _FileOperation.FileOperationType.Export
      }
    });
    const body = await res.json();
    const data = body.data[0];
    expect(res.status).toEqual(200);
    expect(body.data.length).toBe(1);
    expect(data.id).toBe(exportData.id);
    expect(data.key).toBe(undefined);
    expect(data.state).toBe(exportData.state);
  });
  it("should return exports with collection data", async () => {
    const team = await (0, _factories.buildTeam)();
    const admin = await (0, _factories.buildAdmin)({
      teamId: team.id
    });
    const collection = await (0, _factories.buildCollection)({
      userId: admin.id,
      teamId: team.id
    });
    const exportData = await (0, _factories.buildFileOperation)({
      type: _FileOperation.FileOperationType.Export,
      teamId: team.id,
      userId: admin.id,
      collectionId: collection.id
    });
    const res = await server.post("/api/fileOperations.list", {
      body: {
        token: admin.getJwtToken(),
        type: _FileOperation.FileOperationType.Export
      }
    });
    const body = await res.json();
    const data = body.data[0];
    expect(res.status).toEqual(200);
    expect(body.data.length).toBe(1);
    expect(data.id).toBe(exportData.id);
    expect(data.key).toBe(undefined);
    expect(data.state).toBe(exportData.state);
    expect(data.collectionId).toBe(collection.id);
  });
  it("should return exports with collection data even if collection is deleted", async () => {
    const team = await (0, _factories.buildTeam)();
    const admin = await (0, _factories.buildAdmin)({
      teamId: team.id
    });
    const collection = await (0, _factories.buildCollection)({
      userId: admin.id,
      teamId: team.id
    });
    const exportData = await (0, _factories.buildFileOperation)({
      type: _FileOperation.FileOperationType.Export,
      teamId: team.id,
      userId: admin.id,
      collectionId: collection.id
    });
    await collection.destroy();
    const isCollectionPresent = await _models.Collection.findByPk(collection.id);
    expect(isCollectionPresent).toBe(null);
    const res = await server.post("/api/fileOperations.list", {
      body: {
        token: admin.getJwtToken(),
        type: _FileOperation.FileOperationType.Export
      }
    });
    const body = await res.json();
    const data = body.data[0];
    expect(res.status).toEqual(200);
    expect(body.data.length).toBe(1);
    expect(data.id).toBe(exportData.id);
    expect(data.key).toBe(undefined);
    expect(data.state).toBe(exportData.state);
    expect(data.collectionId).toBe(collection.id);
  });
  it("should return exports with user data even if user is deleted", async () => {
    const team = await (0, _factories.buildTeam)();
    const admin2 = await (0, _factories.buildAdmin)({
      teamId: team.id
    });
    const admin = await (0, _factories.buildAdmin)({
      teamId: team.id
    });
    const collection = await (0, _factories.buildCollection)({
      userId: admin.id,
      teamId: team.id
    });
    const exportData = await (0, _factories.buildFileOperation)({
      type: _FileOperation.FileOperationType.Export,
      teamId: team.id,
      userId: admin.id,
      collectionId: collection.id
    });
    await admin.destroy();
    const isAdminPresent = await _models.User.findByPk(admin.id);
    expect(isAdminPresent).toBe(null);
    const res = await server.post("/api/fileOperations.list", {
      body: {
        token: admin2.getJwtToken(),
        type: _FileOperation.FileOperationType.Export
      }
    });
    const body = await res.json();
    const data = body.data[0];
    expect(res.status).toEqual(200);
    expect(body.data.length).toBe(1);
    expect(data.id).toBe(exportData.id);
    expect(data.key).toBe(undefined);
    expect(data.state).toBe(exportData.state);
    expect(data.user.id).toBe(admin.id);
  });
  it("should require authorization", async () => {
    const user = await (0, _factories.buildUser)();
    const res = await server.post("/api/fileOperations.list", {
      body: {
        token: user.getJwtToken(),
        type: _FileOperation.FileOperationType.Export
      }
    });
    expect(res.status).toEqual(403);
  });
});
describe("#fileOperations.redirect", () => {
  it("should not redirect when file operation is not complete", async () => {
    const team = await (0, _factories.buildTeam)();
    const admin = await (0, _factories.buildAdmin)({
      teamId: team.id
    });
    const exportData = await (0, _factories.buildFileOperation)({
      type: _FileOperation.FileOperationType.Export,
      teamId: team.id,
      userId: admin.id
    });
    const res = await server.post("/api/fileOperations.redirect", {
      body: {
        token: admin.getJwtToken(),
        id: exportData.id
      }
    });
    const body = await res.json();
    expect(res.status).toEqual(400);
    expect(body.message).toEqual("export is not complete yet");
  });
});
describe("#fileOperations.info", () => {
  it("should return file operation", async () => {
    const team = await (0, _factories.buildTeam)();
    const admin = await (0, _factories.buildAdmin)({
      teamId: team.id
    });
    const exportData = await (0, _factories.buildFileOperation)({
      type: _FileOperation.FileOperationType.Export,
      teamId: team.id,
      userId: admin.id
    });
    const res = await server.post("/api/fileOperations.info", {
      body: {
        token: admin.getJwtToken(),
        id: exportData.id
      }
    });
    const body = await res.json();
    expect(res.status).toBe(200);
    expect(body.data.id).toBe(exportData.id);
    expect(body.data.user.id).toBe(admin.id);
  });
  it("should require authorization", async () => {
    const team = await (0, _factories.buildTeam)();
    const admin = await (0, _factories.buildAdmin)({
      teamId: team.id
    });
    const user = await (0, _factories.buildUser)({
      teamId: team.id
    });
    const exportData = await (0, _factories.buildFileOperation)({
      type: _FileOperation.FileOperationType.Export,
      teamId: team.id,
      userId: admin.id
    });
    const res = await server.post("/api/fileOperations.info", {
      body: {
        token: user.getJwtToken(),
        id: exportData.id
      }
    });
    expect(res.status).toBe(403);
  });
});
describe("#fileOperations.delete", () => {
  it("should delete file operation", async () => {
    const team = await (0, _factories.buildTeam)();
    const admin = await (0, _factories.buildAdmin)({
      teamId: team.id
    });
    const exportData = await (0, _factories.buildFileOperation)({
      type: _FileOperation.FileOperationType.Export,
      teamId: team.id,
      userId: admin.id,
      state: _FileOperation.FileOperationState.Complete
    });
    const deleteResponse = await server.post("/api/fileOperations.delete", {
      body: {
        token: admin.getJwtToken(),
        id: exportData.id
      }
    });
    expect(deleteResponse.status).toBe(200);
    expect(await _models.Event.count()).toBe(1);
    expect(await _models.FileOperation.count()).toBe(0);
  });
});