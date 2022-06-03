"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isUrl;

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.match.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/web.url.js");

require("core-js/modules/web.url-search-params.js");

function isUrl(text) {
  if (text.match(/\n/)) {
    return false;
  }

  try {
    var url = new URL(text);
    return url.hostname !== "";
  } catch (err) {
    return false;
  }
}