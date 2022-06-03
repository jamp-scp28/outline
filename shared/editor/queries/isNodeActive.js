"use strict";

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.object.get-own-property-descriptors.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.object.keys.js");

var _prosemirrorUtils = require("prosemirror-utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var isNodeActive = function isNodeActive(type) {
  var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return function (state) {
    if (!type) {
      return false;
    }

    var node = (0, _prosemirrorUtils.findSelectedNodeOfType)(type)(state.selection) || (0, _prosemirrorUtils.findParentNode)(function (node) {
      return node.type === type;
    })(state.selection);

    if (!Object.keys(attrs).length || !node) {
      return !!node;
    }

    return node.node.hasMarkup(type, _objectSpread(_objectSpread({}, node.node.attrs), attrs));
  };
};

var _default = isNodeActive;
exports.default = _default;