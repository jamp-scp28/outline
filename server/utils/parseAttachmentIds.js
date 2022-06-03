"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseAttachmentIds;

var _lodash = require("lodash");

const attachmentRegex = /\/api\/attachments\.redirect\?id=(?<id>[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/gi;

function parseAttachmentIds(text) {
  return (0, _lodash.uniq)((0, _lodash.compact)([...text.matchAll(attachmentRegex)].map(match => match.groups && match.groups.id)));
}