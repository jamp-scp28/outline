"use strict";

var _DocumentNotificationEmail = _interopRequireDefault(require("./../../emails/templates/DocumentNotificationEmail"));

var _models = require("./../../models");

var _factories = require("./../../test/factories");

var _support = require("./../../test/support");

var _NotificationsProcessor = _interopRequireDefault(require("./NotificationsProcessor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock("./../../emails/templates/DocumentNotificationEmail");
const ip = "127.0.0.1";
beforeEach(() => (0, _support.flushdb)());
beforeEach(jest.resetAllMocks);
describe("documents.publish", () => {
  test("should not send a notification to author", async () => {
    const user = await (0, _factories.buildUser)();
    const document = await (0, _factories.buildDocument)({
      teamId: user.teamId,
      lastModifiedById: user.id
    });
    await _models.NotificationSetting.create({
      userId: user.id,
      teamId: user.teamId,
      event: "documents.publish"
    });
    const processor = new _NotificationsProcessor.default();
    await processor.perform({
      name: "documents.publish",
      documentId: document.id,
      collectionId: document.collectionId,
      teamId: document.teamId,
      actorId: document.createdById,
      data: {
        title: document.title
      },
      ip
    });
    expect(_DocumentNotificationEmail.default.schedule).not.toHaveBeenCalled();
  });
  test("should send a notification to other users in team", async () => {
    const user = await (0, _factories.buildUser)();
    const document = await (0, _factories.buildDocument)({
      teamId: user.teamId
    });
    await _models.NotificationSetting.create({
      userId: user.id,
      teamId: user.teamId,
      event: "documents.publish"
    });
    const processor = new _NotificationsProcessor.default();
    await processor.perform({
      name: "documents.publish",
      documentId: document.id,
      collectionId: document.collectionId,
      teamId: document.teamId,
      actorId: document.createdById,
      data: {
        title: document.title
      },
      ip
    });
    expect(_DocumentNotificationEmail.default.schedule).toHaveBeenCalled();
  });
  test("should not send a notification to users without collection access", async () => {
    const user = await (0, _factories.buildUser)();
    const collection = await (0, _factories.buildCollection)({
      teamId: user.teamId,
      permission: null
    });
    const document = await (0, _factories.buildDocument)({
      teamId: user.teamId,
      collectionId: collection.id
    });
    await _models.NotificationSetting.create({
      userId: user.id,
      teamId: user.teamId,
      event: "documents.publish"
    });
    const processor = new _NotificationsProcessor.default();
    await processor.perform({
      name: "documents.publish",
      documentId: document.id,
      collectionId: document.collectionId,
      teamId: document.teamId,
      actorId: document.createdById,
      data: {
        title: document.title
      },
      ip
    });
    expect(_DocumentNotificationEmail.default.schedule).not.toHaveBeenCalled();
  });
});
describe("revisions.create", () => {
  test("should send a notification to other collaborators", async () => {
    const document = await (0, _factories.buildDocument)();
    const collaborator = await (0, _factories.buildUser)({
      teamId: document.teamId
    });
    document.collaboratorIds = [collaborator.id];
    await document.save();
    await _models.NotificationSetting.create({
      userId: collaborator.id,
      teamId: collaborator.teamId,
      event: "documents.update"
    });
    const processor = new _NotificationsProcessor.default();
    await processor.perform({
      name: "revisions.create",
      documentId: document.id,
      collectionId: document.collectionId,
      teamId: document.teamId
    });
    expect(_DocumentNotificationEmail.default.schedule).toHaveBeenCalled();
  });
  test("should not send a notification if viewed since update", async () => {
    const document = await (0, _factories.buildDocument)();
    const collaborator = await (0, _factories.buildUser)({
      teamId: document.teamId
    });
    document.collaboratorIds = [collaborator.id];
    await document.save();
    await _models.NotificationSetting.create({
      userId: collaborator.id,
      teamId: collaborator.teamId,
      event: "documents.update"
    });
    await _models.View.touch(document.id, collaborator.id, true);
    const processor = new _NotificationsProcessor.default();
    await processor.perform({
      name: "revisions.create",
      documentId: document.id,
      collectionId: document.collectionId,
      teamId: document.teamId
    });
    expect(_DocumentNotificationEmail.default.schedule).not.toHaveBeenCalled();
  });
  test("should not send a notification to last editor", async () => {
    const user = await (0, _factories.buildUser)();
    const document = await (0, _factories.buildDocument)({
      teamId: user.teamId,
      lastModifiedById: user.id
    });
    await _models.NotificationSetting.create({
      userId: user.id,
      teamId: user.teamId,
      event: "documents.update"
    });
    const processor = new _NotificationsProcessor.default();
    await processor.perform({
      name: "revisions.create",
      documentId: document.id,
      collectionId: document.collectionId,
      teamId: document.teamId
    });
    expect(_DocumentNotificationEmail.default.schedule).not.toHaveBeenCalled();
  });
});