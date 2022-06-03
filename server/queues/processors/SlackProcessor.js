"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fetchWithProxy = _interopRequireDefault(require("fetch-with-proxy"));

var _sequelize = require("sequelize");

var _env = _interopRequireDefault(require("./../../env"));

var _models = require("./../../models");

var _presenters = require("./../../presenters");

var _BaseProcessor = _interopRequireDefault(require("./BaseProcessor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class SlackProcessor extends _BaseProcessor.default {
  async perform(event) {
    switch (event.name) {
      case "documents.publish":
      case "revisions.create":
        return this.documentUpdated(event);

      case "integrations.create":
        return this.integrationCreated(event);

      default:
    }
  }

  async integrationCreated(event) {
    const integration = await _models.Integration.findOne({
      where: {
        id: event.modelId,
        service: "slack",
        type: "post"
      },
      include: [{
        model: _models.Collection,
        required: true,
        as: "collection"
      }]
    });

    if (!integration) {
      return;
    }

    const collection = integration.collection;

    if (!collection) {
      return;
    }

    await (0, _fetchWithProxy.default)(integration.settings.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: `👋 Hey there! When documents are published or updated in the *${collection.name}* collection on Outline they will be posted to this channel!`,
        attachments: [{
          color: collection.color,
          title: collection.name,
          title_link: `${_env.default.URL}${collection.url}`,
          text: collection.description
        }]
      })
    });
  }

  async documentUpdated(event) {
    // never send notifications when batch importing documents
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'data' does not exist on type 'DocumentEv... Remove this comment to see the full error message
    if (event.data && event.data.source === "import") {
      return;
    }

    const [document, team] = await Promise.all([_models.Document.findByPk(event.documentId), _models.Team.findByPk(event.teamId)]);

    if (!document || !team) {
      return;
    } // never send notifications for draft documents


    if (!document.publishedAt) {
      return;
    }

    const integration = await _models.Integration.findOne({
      where: {
        teamId: document.teamId,
        collectionId: document.collectionId,
        service: "slack",
        type: "post",
        events: {
          [_sequelize.Op.contains]: [event.name === "revisions.create" ? "documents.update" : event.name]
        }
      }
    });

    if (!integration) {
      return;
    }

    let text = `${document.updatedBy.name} updated a document`;

    if (event.name === "documents.publish") {
      text = `${document.createdBy.name} published a new document`;
    }

    await (0, _fetchWithProxy.default)(integration.settings.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text,
        attachments: [(0, _presenters.presentSlackAttachment)(document, document.collection, team)]
      })
    });
  }

}

exports.default = SlackProcessor;

_defineProperty(SlackProcessor, "applicableEvents", ["documents.publish", "revisions.create", "integrations.create"]);