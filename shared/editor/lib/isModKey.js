"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isModKey;
var SSR = typeof window === "undefined";
var isMac = !SSR && window.navigator.platform === "MacIntel";

function isModKey(event) {
  return isMac ? event.metaKey : event.ctrlKey;
}