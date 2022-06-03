"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = present;

function present(searchQuery) {
  return {
    id: searchQuery.id,
    query: searchQuery.query,
    createdAt: searchQuery.createdAt
  };
}