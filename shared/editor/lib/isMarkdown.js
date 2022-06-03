"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isMarkdown;

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.match.js");

function isMarkdown(text) {
  // code-ish
  var fences = text.match(/^```/gm);

  if (fences && fences.length > 1) {
    return true;
  } // link-ish


  if (text.match(/\[[^]+\]\(https?:\/\/\S+\)/gm)) {
    return true;
  }

  if (text.match(/\[[^]+\]\(\/\S+\)/gm)) {
    return true;
  } // heading-ish


  if (text.match(/^#{1,6}\s+\S+/gm)) {
    return true;
  } // list-ish


  var listItems = text.match(/^[\d-*].?\s\S+/gm);

  if (listItems && listItems.length > 1) {
    return true;
  }

  return false;
}