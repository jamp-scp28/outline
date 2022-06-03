"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dateFns = require("date-fns");

var _sequelize = require("sequelize");

var _Logger = _interopRequireDefault(require("./../../logging/Logger"));

var _models = require("./../../models");

var _FileOperation = require("./../../models/FileOperation");

var _BaseTask = _interopRequireWildcard(require("./BaseTask"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CleanupExpiredFileOperationsTask extends _BaseTask.default {
  async perform({
    limit
  }) {
    _Logger.default.info("task", `Expiring export file operations older than 30 days…`);

    const fileOperations = await _models.FileOperation.unscoped().findAll({
      where: {
        type: _FileOperation.FileOperationType.Export,
        createdAt: {
          [_sequelize.Op.lt]: (0, _dateFns.subDays)(new Date(), 30)
        },
        state: {
          [_sequelize.Op.ne]: _FileOperation.FileOperationState.Expired
        }
      },
      limit
    });
    await Promise.all(fileOperations.map(fileOperation => fileOperation.expire()));

    _Logger.default.info("task", `Expired ${fileOperations.length} file operations`);
  }

  get options() {
    return {
      attempts: 1,
      priority: _BaseTask.TaskPriority.Background
    };
  }

}

exports.default = CleanupExpiredFileOperationsTask;