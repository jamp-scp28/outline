"use strict";

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.object.get-own-property-descriptors.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = linksToEmbeds;

require("core-js/modules/es.array.splice.js");

var _token = _interopRequireDefault(require("markdown-it/lib/token"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function isParagraph(token) {
  return token.type === "paragraph_open";
}

function isInline(token) {
  return token.type === "inline" && token.level === 1;
}

function isLinkOpen(token) {
  return token.type === "link_open";
}

function isLinkClose(token) {
  return token.type === "link_close";
}

function linksToEmbeds(embeds) {
  function isEmbed(token, link) {
    var href = link.attrs ? link.attrs[0][1] : "";
    var simpleLink = href === token.content;

    if (!simpleLink) {
      return false;
    }

    if (!embeds) {
      return false;
    }

    var _iterator = _createForOfIteratorHelper(embeds),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var embed = _step.value;
        var matches = embed.matcher(href);

        if (matches) {
          return _objectSpread(_objectSpread({}, embed), {}, {
            matches: matches
          });
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return false;
  }

  return function markdownEmbeds(md) {
    md.core.ruler.after("inline", "embeds", function (state) {
      var tokens = state.tokens;
      var insideLink;

      for (var i = 0; i < tokens.length - 1; i++) {
        // once we find an inline token look through it's children for links
        if (isInline(tokens[i]) && isParagraph(tokens[i - 1])) {
          var tokenChildren = tokens[i].children || [];

          for (var j = 0; j < tokenChildren.length - 1; j++) {
            var current = tokenChildren[j];

            if (!current) {
              continue;
            }

            if (isLinkOpen(current)) {
              insideLink = current;
              continue;
            }

            if (isLinkClose(current)) {
              insideLink = null;
              continue;
            } // of hey, we found a link – lets check to see if it should be
            // converted to an embed


            if (insideLink) {
              var result = isEmbed(current, insideLink);

              if (result) {
                var content = current.content; // convert to embed token

                var token = new _token.default("embed", "iframe", 0);
                token.attrSet("href", content); // delete the inline link – this makes the assumption that the
                // embed is the only thing in the para.

                tokens.splice(i - 1, 3, token);
                break;
              }
            }
          }
        }
      }

      return false;
    });
  };
}