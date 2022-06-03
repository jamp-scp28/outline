"use strict";

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.regexp.exec.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.array.index-of.js");

require("core-js/modules/es.array.last-index-of.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.object.to-string.js");

var _prosemirrorInputrules = require("prosemirror-inputrules");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function getMarksBetween(start, end, state) {
  var marks = [];
  state.doc.nodesBetween(start, end, function (node, pos) {
    marks = [].concat(_toConsumableArray(marks), _toConsumableArray(node.marks.map(function (mark) {
      return {
        start: pos,
        end: pos + node.nodeSize,
        mark: mark
      };
    })));
  });
  return marks;
}

function _default(regexp, markType, getAttrs) {
  return new _prosemirrorInputrules.InputRule(regexp, function (state, match, start, end) {
    var attrs = getAttrs instanceof Function ? getAttrs(match) : getAttrs;
    var tr = state.tr;
    var m = match.length - 1;
    var markEnd = end;
    var markStart = start;

    if (match[m]) {
      var matchStart = start + match[0].indexOf(match[m - 1]);
      var matchEnd = matchStart + match[m - 1].length - 1;
      var textStart = matchStart + match[m - 1].lastIndexOf(match[m]);
      var textEnd = textStart + match[m].length;
      var excludedMarks = getMarksBetween(start, end, state).filter(function (item) {
        return item.mark.type.excludes(markType);
      }).filter(function (item) {
        return item.end > matchStart;
      });

      if (excludedMarks.length) {
        return null;
      }

      if (textEnd < matchEnd) {
        tr.delete(textEnd, matchEnd);
      }

      if (textStart > matchStart) {
        tr.delete(matchStart, textStart);
      }

      markStart = matchStart;
      markEnd = markStart + match[m].length;
    }

    tr.addMark(markStart, markEnd, markType.create(attrs));
    tr.removeStoredMark(markType);
    return tr;
  });
}