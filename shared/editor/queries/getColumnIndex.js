"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getColumnIndex;

function getColumnIndex(selection) {
  var isColSelection = selection.isColSelection && selection.isColSelection();

  if (!isColSelection) {
    return undefined;
  }

  var path = selection.$from.path;
  return path[path.length - 5];
}