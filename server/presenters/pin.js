"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = present;

function present(pin) {
  return {
    id: pin.id,
    documentId: pin.documentId,
    collectionId: pin.collectionId,
    index: pin.index,
    createdAt: pin.createdAt,
    updatedAt: pin.updatedAt
  };
}