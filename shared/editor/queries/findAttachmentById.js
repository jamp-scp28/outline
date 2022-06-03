"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.function.name.js");

var findAttachmentById = function findAttachmentById(state, id) {
  var result = null;
  state.doc.descendants(function (node, pos) {
    if (result) {
      return false;
    }

    if (node.type.name === "attachment" && node.attrs.id === id) {
      result = [pos, pos + node.nodeSize];
      return false;
    }

    return true;
  });
  return result;
};

var _default = findAttachmentById;
exports.default = _default;