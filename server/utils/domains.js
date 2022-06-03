"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCookieDomain = getCookieDomain;
exports.isCustomDomain = isCustomDomain;

var _domains = require("./../../shared/utils/domains");

var _env = _interopRequireDefault(require("./../env"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getCookieDomain(domain) {
  return _env.default.SUBDOMAINS_ENABLED ? (0, _domains.stripSubdomain)(domain) : domain;
}

function isCustomDomain(hostname) {
  const parsed = (0, _domains.parseDomain)(hostname);
  const main = (0, _domains.parseDomain)(_env.default.URL);
  return parsed && main && (main.domain !== parsed.domain || main.tld !== parsed.tld);
}