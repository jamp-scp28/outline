"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = markdownItCheckbox;

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.match.js");

require("core-js/modules/es.array.concat.js");

var CHECKBOX_REGEX = /\[(X|\s|_|-)\]\s(.*)?/i;

function matches(token) {
  return token && token.content.match(CHECKBOX_REGEX);
}

function isInline(token) {
  return !!token && token.type === "inline";
}

function isParagraph(token) {
  return !!token && token.type === "paragraph_open";
}

function isListItem(token) {
  return !!token && (token.type === "list_item_open" || token.type === "checkbox_item_open");
}

function looksLikeChecklist(tokens, index) {
  return isInline(tokens[index]) && isListItem(tokens[index - 2]) && isParagraph(tokens[index - 1]) && matches(tokens[index]);
}

function markdownItCheckbox(md) {
  function render(tokens, idx) {
    var token = tokens[idx];
    var checked = !!token.attrGet("checked");

    if (token.nesting === 1) {
      // opening tag
      return "<li class=\"checkbox-list-item\"><span class=\"checkbox ".concat(checked ? "checked" : "", "\">").concat(checked ? "[x]" : "[ ]", "</span>");
    } else {
      // closing tag
      return "</li>\n";
    }
  }

  md.renderer.rules.checkbox_item_open = render;
  md.renderer.rules.checkbox_item_close = render; // insert a new rule after the "inline" rules are parsed

  md.core.ruler.after("inline", "checkboxes", function (state) {
    var tokens = state.tokens; // work backwards through the tokens and find text that looks like a checkbox

    for (var i = tokens.length - 1; i > 0; i--) {
      var _matches = looksLikeChecklist(tokens, i);

      if (_matches) {
        var value = _matches[1];
        var checked = value.toLowerCase() === "x"; // convert surrounding list tokens

        if (tokens[i - 3].type === "bullet_list_open") {
          tokens[i - 3].type = "checkbox_list_open";
        }

        if (tokens[i + 3].type === "bullet_list_close") {
          tokens[i + 3].type = "checkbox_list_close";
        } // remove [ ] [x] from list item label – must use the content from the
        // child for escaped characters to be unescaped correctly.


        var tokenChildren = tokens[i].children;

        if (tokenChildren) {
          var contentMatches = tokenChildren[0].content.match(CHECKBOX_REGEX);

          if (contentMatches) {
            var label = contentMatches[2];
            tokens[i].content = label;
            tokenChildren[0].content = label;
          }
        } // open list item and ensure checked state is transferred


        tokens[i - 2].type = "checkbox_item_open";

        if (checked === true) {
          tokens[i - 2].attrs = [["checked", "true"]];
        } // close the list item


        var j = i;

        while (tokens[j].type !== "list_item_close") {
          j++;
        }

        tokens[j].type = "checkbox_item_close";
      }
    }

    return false;
  });
}