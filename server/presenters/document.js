"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = require("lodash");

var _tracing = require("./../logging/tracing");

var _Attachment = _interopRequireDefault(require("./../models/Attachment"));

var _parseAttachmentIds = _interopRequireDefault(require("./../utils/parseAttachmentIds"));

var _s = require("./../utils/s3");

var _user = _interopRequireDefault(require("./user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// replaces attachments.redirect urls with signed/authenticated url equivalents
async function replaceImageAttachments(text) {
  const attachmentIds = (0, _parseAttachmentIds.default)(text);
  await Promise.all(attachmentIds.map(async id => {
    const attachment = await _Attachment.default.findByPk(id);

    if (attachment) {
      const signedUrl = await (0, _s.getSignedUrl)(attachment.key, 3600);
      text = text.replace(new RegExp((0, _lodash.escapeRegExp)(attachment.redirectUrl), "g"), signedUrl);
    }
  }));
  return text;
}

async function present(document, options = {}) {
  options = {
    isPublic: false,
    ...options
  };
  await document.migrateVersion();
  const text = options.isPublic ? await replaceImageAttachments(document.text) : document.text;
  const data = {
    id: document.id,
    url: document.url,
    urlId: document.urlId,
    title: document.title,
    text,
    tasks: document.tasks,
    createdAt: document.createdAt,
    createdBy: undefined,
    updatedAt: document.updatedAt,
    updatedBy: undefined,
    publishedAt: document.publishedAt,
    archivedAt: document.archivedAt,
    deletedAt: document.deletedAt,
    teamId: document.teamId,
    template: document.template,
    templateId: document.templateId,
    collaboratorIds: [],
    revision: document.revisionCount,
    fullWidth: document.fullWidth,
    collectionId: undefined,
    parentDocumentId: undefined,
    lastViewedAt: undefined
  };

  if (!!document.views && document.views.length > 0) {
    data.lastViewedAt = document.views[0].updatedAt;
  }

  if (!options.isPublic) {
    data.collectionId = document.collectionId;
    data.parentDocumentId = document.parentDocumentId;
    data.createdBy = (0, _user.default)(document.createdBy);
    data.updatedBy = (0, _user.default)(document.updatedBy);
    data.collaboratorIds = document.collaboratorIds;
  }

  return data;
}

var _default = _tracing.APM.traceFunction({
  serviceName: "presenter",
  spanName: "document"
})(present);

exports.default = _default;