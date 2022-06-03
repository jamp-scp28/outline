"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseDocumentSlug;

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/web.url.js");

require("core-js/modules/web.url-search-params.js");

require("core-js/modules/es.array.last-index-of.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.replace.js");

function parseDocumentSlug(url) {
  var parsed;

  if (url[0] === "/") {
    parsed = url;
  } else {
    try {
      parsed = new URL(url).pathname;
    } catch (err) {
      return;
    }
  }

  return parsed.lastIndexOf("/doc/") === 0 ? parsed.replace(/^\/doc\//, "") : null;
}