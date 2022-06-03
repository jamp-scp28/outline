"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateIndexCharacters = void 0;

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.regexp.constructor.js");

require("core-js/modules/es.regexp.to-string.js");

var validateIndexCharacters = function validateIndexCharacters(index) {
  return new RegExp("^[\x20-\x7E]+$").test(index);
};

exports.validateIndexCharacters = validateIndexCharacters;