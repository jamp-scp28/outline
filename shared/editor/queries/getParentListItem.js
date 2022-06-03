"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getParentListItem;

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.function.name.js");

function getParentListItem(state) {
  var $head = state.selection.$head;

  for (var d = $head.depth; d > 0; d--) {
    var node = $head.node(d);

    if (["list_item", "checkbox_item"].includes(node.type.name)) {
      return [node, $head.before(d)];
    }
  }
}