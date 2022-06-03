"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = markdownUnderlines;

function markdownUnderlines(md) {
  md.inline.ruler2.after("emphasis", "underline", function (state) {
    var tokens = state.tokens;

    for (var i = tokens.length - 1; i > 0; i--) {
      var token = tokens[i];

      if (token.markup === "__") {
        if (token.type === "strong_open") {
          tokens[i].tag = "underline";
          tokens[i].type = "underline_open";
        }

        if (token.type === "strong_close") {
          tokens[i].tag = "underline";
          tokens[i].type = "underline_close";
        }
      }
    }

    return false;
  });
}