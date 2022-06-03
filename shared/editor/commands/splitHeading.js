"use strict";

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.object.get-own-property-descriptors.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = splitHeading;

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.array.find.js");

var _prosemirrorState = require("prosemirror-state");

var _prosemirrorUtils = require("prosemirror-utils");

var _findCollapsedNodes = _interopRequireDefault(require("../queries/findCollapsedNodes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function splitHeading(type) {
  return function (state, dispatch) {
    var _state$selection = state.selection,
        $from = _state$selection.$from,
        from = _state$selection.from,
        $to = _state$selection.$to,
        to = _state$selection.to; // check we're in a matching heading node

    if ($from.parent.type !== type) {
      return false;
    } // check that the caret is at the end of the content, if it isn't then
    // standard node splitting behaviour applies


    var endPos = $to.after() - 1;

    if (endPos !== to) {
      return false;
    } // If the node isn't collapsed standard behavior applies


    if (!$from.parent.attrs.collapsed) {
      return false;
    } // Find the next visible block after this one. It takes into account nested
    // collapsed headings and reaching the end of the document


    var allBlocks = (0, _prosemirrorUtils.findBlockNodes)(state.doc);
    var collapsedBlocks = (0, _findCollapsedNodes.default)(state.doc);
    var visibleBlocks = allBlocks.filter(function (a) {
      return !collapsedBlocks.find(function (b) {
        return b.pos === a.pos;
      });
    });
    var nextVisibleBlock = visibleBlocks.find(function (a) {
      return a.pos > from;
    });
    var pos = nextVisibleBlock ? nextVisibleBlock.pos : state.doc.content.size; // Insert our new heading directly before the next visible block

    var transaction = state.tr.insert(pos, type.create(_objectSpread(_objectSpread({}, $from.parent.attrs), {}, {
      collapsed: false
    }))); // Move the selection into the new heading node and make sure it's on screen

    dispatch(transaction.setSelection(_prosemirrorState.TextSelection.near(transaction.doc.resolve(Math.min(pos + 1, transaction.doc.content.size)))).scrollIntoView());
    return true;
  };
}