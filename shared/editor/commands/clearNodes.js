"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.array.map.js");

var _prosemirrorTransform = require("prosemirror-transform");

var clearNodes = function clearNodes() {
  return function (state, dispatch) {
    var tr = state.tr;
    var selection = tr.selection;
    var ranges = selection.ranges;

    if (!dispatch) {
      return true;
    }

    ranges.forEach(function (_ref) {
      var $from = _ref.$from,
          $to = _ref.$to;
      state.doc.nodesBetween($from.pos, $to.pos, function (node, pos) {
        if (node.type.isText) {
          return;
        }

        var doc = tr.doc,
            mapping = tr.mapping;
        var $mappedFrom = doc.resolve(mapping.map(pos));
        var $mappedTo = doc.resolve(mapping.map(pos + node.nodeSize));
        var nodeRange = $mappedFrom.blockRange($mappedTo);

        if (!nodeRange) {
          return;
        }

        var targetLiftDepth = (0, _prosemirrorTransform.liftTarget)(nodeRange);

        if (node.type.isTextblock) {
          var _$mappedFrom$parent$c = $mappedFrom.parent.contentMatchAt($mappedFrom.index()),
              defaultType = _$mappedFrom$parent$c.defaultType;

          tr.setNodeMarkup(nodeRange.start, defaultType);
        }

        if (targetLiftDepth || targetLiftDepth === 0) {
          tr.lift(nodeRange, targetLiftDepth);
        }
      });
    });
    dispatch(tr);
    return true;
  };
};

var _default = clearNodes;
exports.default = _default;