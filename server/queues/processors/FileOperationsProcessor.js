"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _invariant = _interopRequireDefault(require("invariant"));

var _models = require("./../../models");

var _FileOperation = require("./../../models/FileOperation");

var _ExportMarkdownZipTask = _interopRequireDefault(require("../tasks/ExportMarkdownZipTask"));

var _ImportMarkdownZipTask = _interopRequireDefault(require("../tasks/ImportMarkdownZipTask"));

var _ImportNotionTask = _interopRequireDefault(require("../tasks/ImportNotionTask"));

var _BaseProcessor = _interopRequireDefault(require("./BaseProcessor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class FileOperationsProcessor extends _BaseProcessor.default {
  async perform(event) {
    if (event.name !== "fileOperations.create") {
      return;
    }

    const fileOperation = await _models.FileOperation.findByPk(event.modelId);
    (0, _invariant.default)(fileOperation, "fileOperation not found"); // map file operation type and format to the appropriate task

    if (fileOperation.type === _FileOperation.FileOperationType.Import) {
      switch (fileOperation.format) {
        case _FileOperation.FileOperationFormat.MarkdownZip:
          await _ImportMarkdownZipTask.default.schedule({
            fileOperationId: event.modelId
          });
          break;

        case _FileOperation.FileOperationFormat.Notion:
          await _ImportNotionTask.default.schedule({
            fileOperationId: event.modelId
          });
          break;

        default:
      }
    }

    if (fileOperation.type === _FileOperation.FileOperationType.Export) {
      switch (fileOperation.format) {
        case _FileOperation.FileOperationFormat.MarkdownZip:
          await _ExportMarkdownZipTask.default.schedule({
            fileOperationId: event.modelId
          });
          break;

        default:
      }
    }
  }

}

exports.default = FileOperationsProcessor;

_defineProperty(FileOperationsProcessor, "applicableEvents", ["fileOperations.create"]);