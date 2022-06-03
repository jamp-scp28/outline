"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.replace.js");

var unescape = function unescape(text) {
  return text.replace(/\\([\\`*{}[\]()#+\-.!_>])/g, "$1").replace(/\n\\\n/g, "\n\n");
};

var _default = unescape;
exports.default = _default;