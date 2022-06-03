"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _invariant = _interopRequireDefault(require("invariant"));

var _sequelize = require("sequelize");

var _errors = require("./../errors");

var _tracing = require("./../logging/tracing");

var _models = require("./../models");

var _pinDestroyer = _interopRequireDefault(require("./pinDestroyer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function documentMover({
  user,
  document,
  collectionId,
  parentDocumentId = null,
  // convert undefined to null so parentId comparison treats them as equal
  index,
  ip,
  transaction
}) {
  const collectionChanged = collectionId !== document.collectionId;
  const previousCollectionId = document.collectionId;
  const result = {
    collections: [],
    documents: [],
    collectionChanged
  };

  if (document.template && !collectionChanged) {
    return result;
  }

  if (document.template) {
    document.collectionId = collectionId;
    document.parentDocumentId = null;
    document.lastModifiedById = user.id;
    document.updatedBy = user;
    await document.save({
      transaction
    });
    result.documents.push(document);
  } else {
    // Load the current and the next collection upfront and lock them
    const collection = await _models.Collection.findByPk(document.collectionId, {
      transaction,
      lock: _sequelize.Transaction.LOCK.UPDATE,
      paranoid: false
    });
    let newCollection = collectionChanged ? await _models.Collection.findByPk(collectionId, {
      transaction,
      lock: _sequelize.Transaction.LOCK.UPDATE
    }) : collection;
    (0, _invariant.default)(newCollection, "collection should exist"); // Remove the document from the current collection

    const response = await (collection === null || collection === void 0 ? void 0 : collection.removeDocumentInStructure(document, {
      transaction
    }));
    const documentJson = response === null || response === void 0 ? void 0 : response[0];
    const fromIndex = (response === null || response === void 0 ? void 0 : response[1]) || 0;

    if (!documentJson) {
      throw (0, _errors.ValidationError)("The document was not found in the collection");
    } // if we're reordering from within the same parent
    // the original and destination collection are the same,
    // so when the initial item is removed above, the list will reduce by 1.
    // We need to compensate for this when reordering


    const toIndex = index !== undefined && document.parentDocumentId === parentDocumentId && document.collectionId === collectionId && fromIndex < index ? index - 1 : index; // Update the properties on the document record

    document.collectionId = collectionId;
    document.parentDocumentId = parentDocumentId;
    document.lastModifiedById = user.id;
    document.updatedBy = user; // Add the document and it's tree to the new collection

    await newCollection.addDocumentToStructure(document, toIndex, {
      documentJson,
      transaction
    });

    if (collection) {
      result.collections.push(collection);
    } // If the collection has changed then we also need to update the properties
    // on all of the documents children to reflect the new collectionId


    if (collectionChanged) {
      // Reload the collection to get relationship data
      newCollection = await _models.Collection.scope({
        method: ["withMembership", user.id]
      }).findByPk(collectionId, {
        transaction
      });
      (0, _invariant.default)(newCollection, "collection should exist");
      result.collections.push(newCollection); // Efficiently find the ID's of all the documents that are children of
      // the moved document and update in one query

      const childDocumentIds = await document.getChildDocumentIds();
      await _models.Document.update({
        collectionId: newCollection.id
      }, {
        transaction,
        where: {
          id: childDocumentIds
        }
      }); // We must reload from the database to get the relationship data

      const documents = await _models.Document.findAll({
        where: {
          id: childDocumentIds
        },
        transaction
      });
      document.collection = newCollection;
      result.documents.push(...documents.map(document => {
        if (newCollection) {
          document.collection = newCollection;
        }

        return document;
      })); // If the document was pinned to the collection then we also need to
      // automatically remove the pin to prevent a confusing situation where
      // a document is pinned from another collection. Use the command to ensure
      // the correct events are emitted.

      const pin = await _models.Pin.findOne({
        where: {
          documentId: document.id,
          collectionId: previousCollectionId
        },
        transaction,
        lock: _sequelize.Transaction.LOCK.UPDATE
      });

      if (pin) {
        await (0, _pinDestroyer.default)({
          user,
          pin,
          ip,
          transaction
        });
      }
    }
  }

  await document.save({
    transaction
  });
  result.documents.push(document);
  await _models.Event.create({
    name: "documents.move",
    actorId: user.id,
    documentId: document.id,
    collectionId,
    teamId: document.teamId,
    data: {
      title: document.title,
      collectionIds: result.collections.map(c => c.id),
      documentIds: result.documents.map(d => d.id)
    },
    ip
  }, {
    transaction
  }); // we need to send all updated models back to the client

  return result;
}

var _default = _tracing.APM.traceFunction({
  serviceName: "command",
  spanName: "documentMover"
})(documentMover);

exports.default = _default;