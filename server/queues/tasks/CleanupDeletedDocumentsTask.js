"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dateFns = require("date-fns");

var _sequelize = require("sequelize");

var _documentPermanentDeleter = _interopRequireDefault(require("./../../commands/documentPermanentDeleter"));

var _Logger = _interopRequireDefault(require("./../../logging/Logger"));

var _models = require("./../../models");

var _BaseTask = _interopRequireWildcard(require("./BaseTask"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CleanupDeletedDocumentsTask extends _BaseTask.default {
  async perform({
    limit
  }) {
    _Logger.default.info("task", `Permanently destroying upto ${limit} documents older than 30 days…`);

    const documents = await _models.Document.scope("withDrafts").findAll({
      attributes: ["id", "teamId", "text", "deletedAt"],
      where: {
        deletedAt: {
          [_sequelize.Op.lt]: (0, _dateFns.subDays)(new Date(), 30)
        }
      },
      paranoid: false,
      limit
    });
    const countDeletedDocument = await (0, _documentPermanentDeleter.default)(documents);

    _Logger.default.info("task", `Destroyed ${countDeletedDocument} documents`);
  }

  get options() {
    return {
      attempts: 1,
      priority: _BaseTask.TaskPriority.Background
    };
  }

}

exports.default = CleanupDeletedDocumentsTask;