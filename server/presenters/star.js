"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = present;

function present(star) {
  return {
    id: star.id,
    documentId: star.documentId,
    collectionId: star.collectionId,
    index: star.index,
    createdAt: star.createdAt,
    updatedAt: star.updatedAt
  };
}