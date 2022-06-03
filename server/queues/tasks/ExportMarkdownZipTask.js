"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _invariant = _interopRequireDefault(require("invariant"));

var _lodash = require("lodash");

var _ExportFailureEmail = _interopRequireDefault(require("./../../emails/templates/ExportFailureEmail"));

var _ExportSuccessEmail = _interopRequireDefault(require("./../../emails/templates/ExportSuccessEmail"));

var _Logger = _interopRequireDefault(require("./../../logging/Logger"));

var _models = require("./../../models");

var _FileOperation = require("./../../models/FileOperation");

var _fileOperation = _interopRequireDefault(require("./../../presenters/fileOperation"));

var _s = require("./../../utils/s3");

var _zip = require("./../../utils/zip");

var _BaseTask = _interopRequireWildcard(require("./BaseTask"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ExportMarkdownZipTask extends _BaseTask.default {
  /**
   * Runs the export task.
   *
   * @param props The props
   */
  async perform({
    fileOperationId
  }) {
    const fileOperation = await _models.FileOperation.findByPk(fileOperationId);
    (0, _invariant.default)(fileOperation, "fileOperation not found");
    const [team, user] = await Promise.all([_models.Team.findByPk(fileOperation.teamId), _models.User.findByPk(fileOperation.userId)]);
    (0, _invariant.default)(team, "team operation not found");
    (0, _invariant.default)(user, "user operation not found");
    const collectionIds = fileOperation.collectionId ? [fileOperation.collectionId] : await user.collectionIds();
    const collections = await _models.Collection.findAll({
      where: {
        id: collectionIds
      }
    });

    try {
      _Logger.default.info("task", `ExportTask processing data for ${fileOperationId}`);

      await this.updateFileOperation(fileOperation, {
        state: _FileOperation.FileOperationState.Creating
      });
      const filePath = await (0, _zip.archiveCollections)(collections);

      _Logger.default.info("task", `ExportTask uploading data for ${fileOperationId}`);

      await this.updateFileOperation(fileOperation, {
        state: _FileOperation.FileOperationState.Uploading
      });
      const fileBuffer = await _fs.default.promises.readFile(filePath);
      const stat = await _fs.default.promises.stat(filePath);
      const url = await (0, _s.uploadToS3FromBuffer)(fileBuffer, "application/zip", fileOperation.key, "private");
      await this.updateFileOperation(fileOperation, {
        size: stat.size,
        state: _FileOperation.FileOperationState.Complete,
        url
      });
      await _ExportSuccessEmail.default.schedule({
        to: user.email,
        id: fileOperation.id,
        teamUrl: team.url
      });
    } catch (error) {
      await this.updateFileOperation(fileOperation, {
        state: _FileOperation.FileOperationState.Error,
        error
      });
      await _ExportFailureEmail.default.schedule({
        to: user.email,
        teamUrl: team.url
      });
      throw error;
    }
  }
  /**
   * Update the state of the underlying FileOperation in the database and send
   * an event to the client.
   *
   * @param fileOperation The FileOperation to update
   */


  async updateFileOperation(fileOperation, options) {
    await fileOperation.update({ ...options,
      error: options.error ? (0, _lodash.truncate)(options.error.message, {
        length: 255
      }) : undefined
    });
    await _models.Event.schedule({
      name: "fileOperations.update",
      modelId: fileOperation.id,
      teamId: fileOperation.teamId,
      actorId: fileOperation.userId,
      data: (0, _fileOperation.default)(fileOperation)
    });
  }
  /**
   * Job options such as priority and retry strategy, as defined by Bull.
   */


  get options() {
    return {
      priority: _BaseTask.TaskPriority.Background,
      attempts: 2
    };
  }

}

exports.default = ExportMarkdownZipTask;