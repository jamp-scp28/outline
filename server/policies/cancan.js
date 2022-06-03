"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.allow = exports._cannot = exports._can = exports._authorize = exports._abilities = void 0;

var _cancan = _interopRequireDefault(require("cancan"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cancan = new _cancan.default();
const _can = cancan.can;
exports._can = _can;
const _authorize = cancan.authorize;
exports._authorize = _authorize;
const _cannot = cancan.cannot;
exports._cannot = _cannot;
const _abilities = cancan.abilities;
exports._abilities = _abilities;
const allow = cancan.allow;
exports.allow = allow;