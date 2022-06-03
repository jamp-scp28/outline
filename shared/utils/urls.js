"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cdnPath = cdnPath;
exports.isExternalUrl = isExternalUrl;
exports.isInternalUrl = isInternalUrl;

require("core-js/modules/es.array.concat.js");

var _domains = require("./domains");

var env = typeof window !== "undefined" ? window.env : process.env;

function cdnPath(path) {
  return "".concat(env.CDN_URL).concat(path);
}

function isInternalUrl(href) {
  if (href[0] === "/") {
    return true;
  }

  var outline = typeof window !== "undefined" ? (0, _domains.parseDomain)(window.location.href) : undefined;
  var parsed = (0, _domains.parseDomain)(href);

  if (parsed && outline && parsed.subdomain === outline.subdomain && parsed.domain === outline.domain && parsed.tld === outline.tld) {
    return true;
  }

  return false;
}

function isExternalUrl(href) {
  return !isInternalUrl(href);
}