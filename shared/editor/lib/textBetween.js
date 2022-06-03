"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = textBetween;

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.array.slice.js");

/**
 * Returns the text content between two positions.
 *
 * @param doc The Prosemirror document to use
 * @param from A start point
 * @param to An end point
 * @param plainTextSerializers A map of node names to PlainTextSerializers which convert a node to plain text
 * @returns A string of plain text
 */
function textBetween(doc, from, to, plainTextSerializers) {
  var blockSeparator = "\n\n";
  var text = "";
  var separated = true;
  doc.nodesBetween(from, to, function (node, pos) {
    var toPlainText = plainTextSerializers[node.type.name];

    if (toPlainText) {
      if (node.isBlock && !separated) {
        text += blockSeparator;
        separated = true;
      }

      text += toPlainText(node);
    } else if (node.isText) {
      var _node$text;

      text += (_node$text = node.text) === null || _node$text === void 0 ? void 0 : _node$text.slice(Math.max(from, pos) - pos, to - pos);
      separated = false;
    } else if (node.isBlock && !separated) {
      text += blockSeparator;
      separated = true;
    }
  });
  return text;
}