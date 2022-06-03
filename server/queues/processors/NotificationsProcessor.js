"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = require("sequelize");

var _CollectionNotificationEmail = _interopRequireDefault(require("./../../emails/templates/CollectionNotificationEmail"));

var _DocumentNotificationEmail = _interopRequireDefault(require("./../../emails/templates/DocumentNotificationEmail"));

var _Logger = _interopRequireDefault(require("./../../logging/Logger"));

var _models = require("./../../models");

var _BaseProcessor = _interopRequireDefault(require("./BaseProcessor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class NotificationsProcessor extends _BaseProcessor.default {
  async perform(event) {
    switch (event.name) {
      case "documents.publish":
      case "revisions.create":
        return this.documentUpdated(event);

      case "collections.create":
        return this.collectionCreated(event);

      default:
    }
  }

  async documentUpdated(event) {
    var _event$data;

    // never send notifications when batch importing documents
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'data' does not exist on type 'DocumentEv... Remove this comment to see the full error message
    if (((_event$data = event.data) === null || _event$data === void 0 ? void 0 : _event$data.source) === "import") {
      return;
    }

    const [document, team] = await Promise.all([_models.Document.findByPk(event.documentId), _models.Team.findByPk(event.teamId)]);

    if (!document || !team || !document.collection) {
      return;
    }

    const {
      collection
    } = document;
    const notificationSettings = await _models.NotificationSetting.findAll({
      where: {
        userId: {
          [_sequelize.Op.ne]: document.lastModifiedById
        },
        teamId: document.teamId,
        event: event.name === "documents.publish" ? "documents.publish" : "documents.update"
      },
      include: [{
        model: _models.User,
        required: true,
        as: "user"
      }]
    });
    const eventName = event.name === "documents.publish" ? "published" : "updated";

    for (const setting of notificationSettings) {
      // Suppress notifications for suspended users
      if (setting.user.isSuspended) {
        continue;
      } // For document updates we only want to send notifications if
      // the document has been edited by the user with this notification setting
      // This could be replaced with ability to "follow" in the future


      if (eventName === "updated" && !document.collaboratorIds.includes(setting.userId)) {
        continue;
      } // Check the user has access to the collection this document is in. Just
      // because they were a collaborator once doesn't mean they still are.


      const collectionIds = await setting.user.collectionIds();

      if (!collectionIds.includes(document.collectionId)) {
        continue;
      } // If this user has viewed the document since the last update was made
      // then we can avoid sending them a useless notification, yay.


      const view = await _models.View.findOne({
        where: {
          userId: setting.userId,
          documentId: event.documentId,
          updatedAt: {
            [_sequelize.Op.gt]: document.updatedAt
          }
        }
      });

      if (view) {
        _Logger.default.info("processor", `suppressing notification to ${setting.userId} because update viewed`);

        continue;
      }

      if (!setting.user.email) {
        continue;
      }

      await _DocumentNotificationEmail.default.schedule({
        to: setting.user.email,
        eventName,
        documentId: document.id,
        teamUrl: team.url,
        actorName: document.updatedBy.name,
        collectionName: collection.name,
        unsubscribeUrl: setting.unsubscribeUrl
      });
    }
  }

  async collectionCreated(event) {
    const collection = await _models.Collection.findByPk(event.collectionId, {
      include: [{
        model: _models.User,
        required: true,
        as: "user"
      }]
    });

    if (!collection) {
      return;
    }

    if (!collection.permission) {
      return;
    }

    const notificationSettings = await _models.NotificationSetting.findAll({
      where: {
        userId: {
          [_sequelize.Op.ne]: collection.createdById
        },
        teamId: collection.teamId,
        event: event.name
      },
      include: [{
        model: _models.User,
        required: true,
        as: "user"
      }]
    });

    for (const setting of notificationSettings) {
      // Suppress notifications for suspended users
      if (setting.user.isSuspended || !setting.user.email) {
        continue;
      }

      await _CollectionNotificationEmail.default.schedule({
        to: setting.user.email,
        eventName: "created",
        collectionId: collection.id,
        unsubscribeUrl: setting.unsubscribeUrl
      });
    }
  }

}

exports.default = NotificationsProcessor;

_defineProperty(NotificationsProcessor, "applicableEvents", ["documents.publish", "revisions.create", "collections.create"]);