"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = markdownTables;

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.match.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.string.trim.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.array.splice.js");

var _token = _interopRequireDefault(require("markdown-it/lib/token"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BREAK_REGEX = /(?:^|[^\\])\\n/;

function markdownTables(md) {
  // insert a new rule after the "inline" rules are parsed
  md.core.ruler.after("inline", "tables-pm", function (state) {
    var tokens = state.tokens;
    var inside = false;

    var _loop = function _loop(i) {
      if (inside) {
        tokens[i].level--;
      } // convert unescaped \n in the text into real br tag


      if (tokens[i].type === "inline" && tokens[i].content.match(BREAK_REGEX)) {
        var existing = tokens[i].children || [];
        tokens[i].children = [];
        existing.forEach(function (child) {
          var breakParts = child.content.split(BREAK_REGEX); // a schema agnostic way to know if a node is inline code would be
          // great, for now we are stuck checking the node type.

          if (breakParts.length > 1 && child.type !== "code_inline") {
            breakParts.forEach(function (part, index) {
              var _tokens$i$children;

              var token = new _token.default("text", "", 1);
              token.content = part.trim();
              (_tokens$i$children = tokens[i].children) === null || _tokens$i$children === void 0 ? void 0 : _tokens$i$children.push(token);

              if (index < breakParts.length - 1) {
                var _tokens$i$children2;

                var brToken = new _token.default("br", "br", 1);
                (_tokens$i$children2 = tokens[i].children) === null || _tokens$i$children2 === void 0 ? void 0 : _tokens$i$children2.push(brToken);
              }
            });
          } else {
            var _tokens$i$children3;

            (_tokens$i$children3 = tokens[i].children) === null || _tokens$i$children3 === void 0 ? void 0 : _tokens$i$children3.push(child);
          }
        });
      } // filter out incompatible tokens from markdown-it that we don't need
      // in prosemirror. thead/tbody do nothing.


      if (["thead_open", "thead_close", "tbody_open", "tbody_close"].includes(tokens[i].type)) {
        inside = !inside;
        tokens.splice(i, 1);
      }

      if (["th_open", "td_open"].includes(tokens[i].type)) {
        // markdown-it table parser does not return paragraphs inside the cells
        // but prosemirror requires them, so we add 'em in here.
        tokens.splice(i + 1, 0, new _token.default("paragraph_open", "p", 1)); // markdown-it table parser stores alignment as html styles, convert
        // to a simple string here

        var tokenAttrs = tokens[i].attrs;

        if (tokenAttrs) {
          var style = tokenAttrs[0][1];
          tokens[i].info = style.split(":")[1];
        }
      }

      if (["th_close", "td_close"].includes(tokens[i].type)) {
        tokens.splice(i, 0, new _token.default("paragraph_close", "p", -1));
      }
    };

    for (var i = tokens.length - 1; i > 0; i--) {
      _loop(i);
    }

    return false;
  });
}