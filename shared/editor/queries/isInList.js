"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isInList;

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.function.name.js");

function isInList(state) {
  var $head = state.selection.$head;

  for (var d = $head.depth; d > 0; d--) {
    if (["ordered_list", "bullet_list", "checkbox_list"].includes($head.node(d).type.name)) {
      return true;
    }
  }

  return false;
}