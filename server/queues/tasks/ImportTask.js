"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _invariant = _interopRequireDefault(require("invariant"));

var _lodash = require("lodash");

var _attachmentCreator = _interopRequireDefault(require("./../../commands/attachmentCreator"));

var _documentCreator = _interopRequireDefault(require("./../../commands/documentCreator"));

var _sequelize = require("./../../database/sequelize");

var _errors = require("./../../errors");

var _Logger = _interopRequireDefault(require("./../../logging/Logger"));

var _models = require("./../../models");

var _FileOperation = require("./../../models/FileOperation");

var _BaseTask = _interopRequireWildcard(require("./BaseTask"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ImportTask extends _BaseTask.default {
  /**
   * Runs the import task.
   *
   * @param props The props
   */
  async perform({
    fileOperationId
  }) {
    const fileOperation = await _models.FileOperation.findByPk(fileOperationId);
    (0, _invariant.default)(fileOperation, "fileOperation not found");

    try {
      _Logger.default.info("task", `ImportTask fetching data for ${fileOperationId}`);

      const data = await this.fetchData(fileOperation);

      _Logger.default.info("task", `ImportTask parsing data for ${fileOperationId}`);

      const parsed = await this.parseData(data, fileOperation);

      if (parsed.collections.length === 0) {
        throw (0, _errors.ValidationError)("Uploaded file does not contain any collections. The root of the zip file must contain folders representing collections.");
      }

      if (parsed.documents.length === 0) {
        throw (0, _errors.ValidationError)("Uploaded file does not contain any valid documents");
      }

      let result;

      try {
        _Logger.default.info("task", `ImportTask persisting data for ${fileOperationId}`);

        result = await this.persistData(parsed, fileOperation);
      } catch (error) {
        _Logger.default.error(`ImportTask failed to persist data for ${fileOperationId}`, error);

        throw new Error("Sorry, an internal error occurred during import");
      }

      await this.updateFileOperation(fileOperation, _FileOperation.FileOperationState.Complete);
      return result;
    } catch (error) {
      await this.updateFileOperation(fileOperation, _FileOperation.FileOperationState.Error, error);
      throw error;
    }
  }
  /**
   * Update the state of the underlying FileOperation in the database and send
   * an event to the client.
   *
   * @param fileOperation The FileOperation to update
   */


  async updateFileOperation(fileOperation, state, error) {
    await fileOperation.update({
      state,
      error: error ? (0, _lodash.truncate)(error.message, {
        length: 255
      }) : undefined
    });
    await _models.Event.schedule({
      name: "fileOperations.update",
      modelId: fileOperation.id,
      teamId: fileOperation.teamId,
      actorId: fileOperation.userId
    });
  }
  /**
   * Fetch the remote data needed for the import, by default this will download
   * any file associated with the FileOperation, save it to a temporary file,
   * and return the path.
   *
   * @param fileOperation The FileOperation to fetch data for
   * @returns string
   */


  async fetchData(fileOperation) {
    return fileOperation.buffer;
  }
  /**
   * Parse the data loaded from fetchData into a consistent structured format
   * that represents collections, documents, and the relationships between them.
   *
   * @param data The data loaded from fetchData
   * @returns A promise that resolves to the structured data
   */


  /**
   * Persist the data that was already fetched and parsed into the consistent
   * structured data.
   *
   * @param props The props
   */
  async persistData(data, fileOperation) {
    const collections = new Map();
    const documents = new Map();
    const attachments = new Map();
    return _sequelize.sequelize.transaction(async transaction => {
      const user = await _models.User.findByPk(fileOperation.userId, {
        transaction
      });
      (0, _invariant.default)(user, "User not found");
      const ip = user.lastActiveIp || undefined; // Attachments

      for (const item of data.attachments) {
        const attachment = await (0, _attachmentCreator.default)({
          source: "import",
          id: item.id,
          name: item.name,
          type: item.mimeType,
          buffer: item.buffer,
          user,
          ip,
          transaction
        });
        attachments.set(item.id, attachment);
      } // Collections


      for (const item of data.collections) {
        let description = item.description;

        if (description) {
          // Check all of the attachments we've created against urls in the text
          // and replace them out with attachment redirect urls before saving.
          for (const aitem of data.attachments) {
            const attachment = attachments.get(aitem.id);

            if (!attachment) {
              continue;
            }

            description = description.replace(new RegExp(`<<${attachment.id}>>`, "g"), attachment.redirectUrl);
          } // Check all of the document we've created against urls in the text
          // and replace them out with a valid internal link. Because we are doing
          // this before saving, we can't use the document slug, but we can take
          // advantage of the fact that the document id will redirect in the client


          for (const ditem of data.documents) {
            description = description.replace(new RegExp(`<<${ditem.id}>>`, "g"), `/doc/${ditem.id}`);
          }
        } // check if collection with name exists


        const response = await _models.Collection.findOrCreate({
          where: {
            teamId: fileOperation.teamId,
            name: item.name
          },
          defaults: {
            id: item.id,
            description,
            createdById: fileOperation.userId,
            permission: "read_write"
          },
          transaction
        });
        let collection = response[0];
        const isCreated = response[1]; // create new collection if name already exists, yes it's possible that
        // there is also a "Name (Imported)" but this is a case not worth dealing
        // with right now

        if (!isCreated) {
          const name = `${item.name} (Imported)`;
          collection = await _models.Collection.create({
            id: item.id,
            description,
            teamId: fileOperation.teamId,
            createdById: fileOperation.userId,
            name,
            permission: "read_write"
          }, {
            transaction
          });
        }

        await _models.Event.create({
          name: "collections.create",
          collectionId: collection.id,
          teamId: collection.teamId,
          actorId: fileOperation.userId,
          data: {
            name: collection.name
          },
          ip
        }, {
          transaction
        });
        collections.set(item.id, collection);
      } // Documents


      for (const item of data.documents) {
        let text = item.text; // Check all of the attachments we've created against urls in the text
        // and replace them out with attachment redirect urls before saving.

        for (const aitem of data.attachments) {
          const attachment = attachments.get(aitem.id);

          if (!attachment) {
            continue;
          }

          text = text.replace(new RegExp(`<<${attachment.id}>>`, "g"), attachment.redirectUrl);
        } // Check all of the document we've created against urls in the text
        // and replace them out with a valid internal link. Because we are doing
        // this before saving, we can't use the document slug, but we can take
        // advantage of the fact that the document id will redirect in the client


        for (const ditem of data.documents) {
          text = text.replace(new RegExp(`<<${ditem.id}>>`, "g"), `/doc/${ditem.id}`);
        }

        const document = await (0, _documentCreator.default)({
          source: "import",
          id: item.id,
          title: item.title,
          text,
          collectionId: item.collectionId,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt ?? item.createdAt,
          publishedAt: item.updatedAt ?? item.createdAt ?? new Date(),
          parentDocumentId: item.parentDocumentId,
          user,
          ip,
          transaction
        });
        documents.set(item.id, document);
        const collection = collections.get(item.collectionId);

        if (collection) {
          await collection.addDocumentToStructure(document, 0, {
            transaction
          });
        }
      } // Return value is only used for testing


      return {
        collections,
        documents,
        attachments
      };
    });
  }
  /**
   * Optional hook to remove any temporary files that were created
   */


  async cleanupData() {// noop
  }
  /**
   * Job options such as priority and retry strategy, as defined by Bull.
   */


  get options() {
    return {
      priority: _BaseTask.TaskPriority.Low,
      attempts: 1
    };
  }

}

exports.default = ImportTask;