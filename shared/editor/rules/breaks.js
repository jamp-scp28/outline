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
exports.default = markdownBreakToParagraphs;

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.array.splice.js");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function isHardbreak(token) {
  return token.type === "hardbreak" || token.type === "text" && token.content === "\\";
}

function markdownBreakToParagraphs(md) {
  // insert a new rule after the "inline" rules are parsed
  md.core.ruler.after("inline", "breaks", function (state) {
    var Token = state.Token;
    var tokens = state.tokens; // work backwards through the tokens and find text that looks like a br

    for (var i = tokens.length - 1; i > 0; i--) {
      var tokenChildren = tokens[i].children || [];
      var matches = tokenChildren.filter(isHardbreak);

      if (matches.length) {
        var token = void 0;
        var nodes = [];
        var children = tokenChildren.filter(function (child) {
          return !isHardbreak(child);
        });
        var count = matches.length;

        if (children.length) {
          count++;
        }

        for (var _i = 0; _i < count; _i++) {
          var isLast = _i === count - 1;
          token = new Token("paragraph_open", "p", 1);
          nodes.push(token);
          var text = new Token("text", "", 0);
          text.content = "";
          token = new Token("inline", "", 0);
          token.level = 1;
          token.children = isLast ? [text].concat(_toConsumableArray(children)) : [text];
          token.content = "";
          nodes.push(token);
          token = new Token("paragraph_close", "p", -1);
          nodes.push(token);
        }

        tokens.splice.apply(tokens, [i - 1, 3].concat(nodes));
      }
    }

    return false;
  });
}