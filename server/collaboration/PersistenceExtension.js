"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _invariant = _interopRequireDefault(require("invariant"));

var Y = _interopRequireWildcard(require("yjs"));

var _sequelize = require("./../database/sequelize");

var _Logger = _interopRequireDefault(require("./../logging/Logger"));

var _tracing = require("./../logging/tracing");

var _Document = _interopRequireDefault(require("./../models/Document"));

var _documentCollaborativeUpdater = _interopRequireDefault(require("../commands/documentCollaborativeUpdater"));

var _markdownToYDoc = _interopRequireDefault(require("./utils/markdownToYDoc"));

var _dec, _class;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let PersistenceExtension = (_dec = _tracing.APM.trace({
  spanName: "persistence"
}), _dec(_class = class PersistenceExtension {
  async onLoadDocument({
    documentName,
    ...data
  }) {
    const [, documentId] = documentName.split(".");
    const fieldName = "default"; // Check if the given field already exists in the given y-doc. This is import
    // so we don't import a document fresh if it exists already.

    if (!data.document.isEmpty(fieldName)) {
      return;
    }

    return await _sequelize.sequelize.transaction(async transaction => {
      const document = await _Document.default.scope("withState").findOne({
        transaction,
        lock: transaction.LOCK.UPDATE,
        where: {
          id: documentId
        }
      });
      (0, _invariant.default)(document, "Document not found");

      if (document.state) {
        const ydoc = new Y.Doc();

        _Logger.default.info("database", `Document ${documentId} is in database state`);

        Y.applyUpdate(ydoc, document.state);
        return ydoc;
      }

      _Logger.default.info("database", `Document ${documentId} is not in state, creating from markdown`);

      const ydoc = (0, _markdownToYDoc.default)(document.text, fieldName);
      const state = Y.encodeStateAsUpdate(ydoc);
      await document.update({
        state: Buffer.from(state)
      }, {
        silent: true,
        hooks: false,
        transaction
      });
      return ydoc;
    });
  }

  async onStoreDocument({
    document,
    context,
    documentName
  }) {
    const [, documentId] = documentName.split(".");

    _Logger.default.info("database", `Persisting ${documentId}`);

    try {
      var _context$user;

      await (0, _documentCollaborativeUpdater.default)({
        documentId,
        ydoc: document,
        userId: (_context$user = context.user) === null || _context$user === void 0 ? void 0 : _context$user.id
      });
    } catch (err) {
      var _context$user2;

      _Logger.default.error("Unable to persist document", err, {
        documentId,
        userId: (_context$user2 = context.user) === null || _context$user2 === void 0 ? void 0 : _context$user2.id
      });
    }
  }

}) || _class);
exports.default = PersistenceExtension;