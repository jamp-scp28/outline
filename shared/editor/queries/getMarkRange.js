"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getMarkRange;

require("core-js/modules/es.array.find.js");

require("core-js/modules/es.object.to-string.js");

function getMarkRange($pos, type) {
  if (!$pos || !type) {
    return false;
  }

  var start = $pos.parent.childAfter($pos.parentOffset);

  if (!start.node) {
    return false;
  }

  var mark = start.node.marks.find(function (mark) {
    return mark.type === type;
  });

  if (!mark) {
    return false;
  }

  var startIndex = $pos.index();
  var startPos = $pos.start() + start.offset;
  var endIndex = startIndex + 1;
  var endPos = startPos + start.node.nodeSize;

  while (startIndex > 0 && mark.isInSet($pos.parent.child(startIndex - 1).marks)) {
    startIndex -= 1;
    startPos -= $pos.parent.child(startIndex).nodeSize;
  }

  while (endIndex < $pos.parent.childCount && mark.isInSet($pos.parent.child(endIndex).marks)) {
    endPos += $pos.parent.child(endIndex).nodeSize;
    endIndex += 1;
  }

  return {
    from: startPos,
    to: endPos,
    mark: mark
  };
}