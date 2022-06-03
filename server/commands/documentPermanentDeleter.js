"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = documentPermanentDeleter;

var _sequelize = require("sequelize");

var _sequelize2 = require("./../database/sequelize");

var _Logger = _interopRequireDefault(require("./../logging/Logger"));

var _models = require("./../models");

var _parseAttachmentIds = _interopRequireDefault(require("./../utils/parseAttachmentIds"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function documentPermanentDeleter(documents) {
  const activeDocument = documents.find(doc => !doc.deletedAt);

  if (activeDocument) {
    throw new Error(`Cannot permanently delete ${activeDocument.id} document. Please delete it and try again.`);
  }

  const query = `
    SELECT COUNT(id)
    FROM documents
    WHERE "searchVector" @@ to_tsquery('english', :query) AND
    "teamId" = :teamId AND
    "id" != :documentId
  `;

  for (const document of documents) {
    const attachmentIds = (0, _parseAttachmentIds.default)(document.text);

    for (const attachmentId of attachmentIds) {
      const [{
        count
      }] = await _sequelize2.sequelize.query(query, {
        type: _sequelize.QueryTypes.SELECT,
        replacements: {
          documentId: document.id,
          teamId: document.teamId,
          query: attachmentId
        }
      });

      if (parseInt(count) === 0) {
        const attachment = await _models.Attachment.findOne({
          where: {
            teamId: document.teamId,
            id: attachmentId
          }
        });

        if (attachment) {
          await attachment.destroy();

          _Logger.default.info("commands", `Attachment ${attachmentId} deleted`);
        } else {
          _Logger.default.info("commands", `Unknown attachment ${attachmentId} ignored`);
        }
      }
    }
  }

  return _models.Document.scope("withDrafts").destroy({
    where: {
      id: documents.map(document => document.id)
    },
    force: true
  });
}