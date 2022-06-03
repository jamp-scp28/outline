"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = documentCreator;

var _invariant = _interopRequireDefault(require("invariant"));

var _models = require("./../models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function documentCreator({
  title = "",
  text = "",
  id,
  publish,
  collectionId,
  parentDocumentId,
  templateDocument,
  createdAt,
  // allows override for import
  updatedAt,
  template,
  user,
  editorVersion,
  publishedAt,
  source,
  ip,
  transaction
}) {
  const templateId = templateDocument ? templateDocument.id : undefined;
  const document = await _models.Document.create({
    id,
    parentDocumentId,
    editorVersion,
    collectionId,
    teamId: user.teamId,
    userId: user.id,
    createdAt,
    updatedAt,
    lastModifiedById: user.id,
    createdById: user.id,
    template,
    templateId,
    publishedAt,
    title: templateDocument ? templateDocument.title : title,
    text: templateDocument ? templateDocument.text : text
  }, {
    transaction
  });
  await _models.Event.create({
    name: "documents.create",
    documentId: document.id,
    collectionId: document.collectionId,
    teamId: document.teamId,
    actorId: user.id,
    data: {
      source,
      title: document.title,
      templateId
    },
    ip
  }, {
    transaction
  });

  if (publish) {
    await document.publish(user.id, {
      transaction
    });
    await _models.Event.create({
      name: "documents.publish",
      documentId: document.id,
      collectionId: document.collectionId,
      teamId: document.teamId,
      actorId: user.id,
      data: {
        source,
        title: document.title
      },
      ip
    }, {
      transaction
    });
  } // reload to get all of the data needed to present (user, collection etc)
  // we need to specify publishedAt to bypass default scope that only returns
  // published documents


  const doc = await _models.Document.findOne({
    where: {
      id: document.id,
      publishedAt: document.publishedAt
    },
    transaction
  });
  (0, _invariant.default)(doc, "Document must exist");
  return doc;
}