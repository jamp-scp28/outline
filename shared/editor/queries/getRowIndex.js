"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getRowIndex;

function getRowIndex(selection) {
  var isRowSelection = selection.isRowSelection && selection.isRowSelection();

  if (!isRowSelection) {
    return undefined;
  }

  var path = selection.$from.path;
  return path[path.length - 8];
}