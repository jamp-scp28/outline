"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getHeadings;

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.function.name.js");

var _headingToSlug = _interopRequireDefault(require("./headingToSlug"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Iterates through the document to find all of the headings and their level.
 *
 * @param doc Prosemirror document node
 * @returns Array<Heading>
 */
function getHeadings(doc) {
  var headings = [];
  var previouslySeen = {};
  doc.forEach(function (node) {
    if (node.type.name === "heading") {
      // calculate the optimal id
      var id = (0, _headingToSlug.default)(node);
      var name = id; // check if we've already used it, and if so how many times?
      // Make the new id based on that number ensuring that we have
      // unique ID's even when headings are identical

      if (previouslySeen[id] > 0) {
        name = (0, _headingToSlug.default)(node, previouslySeen[id]);
      } // record that we've seen this id for the next loop


      previouslySeen[id] = previouslySeen[id] !== undefined ? previouslySeen[id] + 1 : 1;
      headings.push({
        title: node.textContent,
        level: node.attrs.level,
        id: name
      });
    }
  });
  return headings;
}