"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = documentCollaborativeUpdater;

var _yProsemirror = require("@getoutline/y-prosemirror");

var _invariant = _interopRequireDefault(require("invariant"));

var _lodash = require("lodash");

var _prosemirrorModel = require("prosemirror-model");

var Y = _interopRequireWildcard(require("yjs"));

var _sequelize = require("./../database/sequelize");

var _editor = require("./../editor");

var _models = require("./../models");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function documentCollaborativeUpdater({
  documentId,
  ydoc,
  userId
}) {
  return _sequelize.sequelize.transaction(async transaction => {
    const document = await _models.Document.unscoped().scope("withState").findByPk(documentId, {
      transaction,
      lock: {
        of: _models.Document,
        level: transaction.LOCK.UPDATE
      },
      paranoid: false
    });
    (0, _invariant.default)(document, "document not found");
    const state = Y.encodeStateAsUpdate(ydoc);

    const node = _prosemirrorModel.Node.fromJSON(_editor.schema, (0, _yProsemirror.yDocToProsemirrorJSON)(ydoc, "default"));

    const text = _editor.serializer.serialize(node, undefined);

    const isUnchanged = document.text === text;
    const hasMultiplayerState = !!document.state;

    if (isUnchanged && hasMultiplayerState) {
      return;
    } // extract collaborators from doc user data


    const pud = new Y.PermanentUserData(ydoc);
    const pudIds = Array.from(pud.clients.values());
    const existingIds = document.collaboratorIds;
    const collaboratorIds = (0, _lodash.uniq)([...pudIds, ...existingIds]);
    await document.update({
      text,
      state: Buffer.from(state),
      lastModifiedById: isUnchanged || !userId ? document.lastModifiedById : userId,
      collaboratorIds
    }, {
      transaction,
      silent: isUnchanged,
      hooks: false
    });

    if (isUnchanged) {
      return;
    }

    await _models.Event.schedule({
      name: "documents.update",
      documentId: document.id,
      collectionId: document.collectionId,
      teamId: document.teamId,
      actorId: userId,
      data: {
        multiplayer: true,
        title: document.title
      }
    });
  });
}