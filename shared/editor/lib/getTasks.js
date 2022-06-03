"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getTasks;

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/web.dom-collections.for-each.js");

/**
 * Iterates through the document to find all of the tasks and their completion
 * state.
 *
 * @param doc Prosemirror document node
 * @returns Array<Task>
 */
function getTasks(doc) {
  var tasks = [];
  doc.descendants(function (node) {
    if (!node.isBlock) {
      return false;
    }

    if (node.type.name === "checkbox_list") {
      node.content.forEach(function (listItem) {
        var text = "";
        listItem.forEach(function (contentNode) {
          if (contentNode.type.name === "paragraph") {
            text += contentNode.textContent;
          }
        });
        tasks.push({
          text: text,
          completed: listItem.attrs.checked
        });
      });
    }

    return true;
  });
  return tasks;
}