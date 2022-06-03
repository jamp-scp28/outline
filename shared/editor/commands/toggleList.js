"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toggleList;

var _prosemirrorSchemaList = require("prosemirror-schema-list");

var _prosemirrorUtils = require("prosemirror-utils");

var _chainTransactions = _interopRequireDefault(require("../lib/chainTransactions"));

var _isList = _interopRequireDefault(require("../queries/isList"));

var _clearNodes = _interopRequireDefault(require("./clearNodes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function toggleList(listType, itemType) {
  return function (state, dispatch) {
    var schema = state.schema,
        selection = state.selection;
    var $from = selection.$from,
        $to = selection.$to;
    var range = $from.blockRange($to);
    var tr = state.tr;

    if (!range) {
      return false;
    }

    var parentList = (0, _prosemirrorUtils.findParentNode)(function (node) {
      return (0, _isList.default)(node, schema);
    })(selection);

    if (range.depth >= 1 && parentList && range.depth - parentList.depth <= 1) {
      if (parentList.node.type === listType) {
        return (0, _prosemirrorSchemaList.liftListItem)(itemType)(state, dispatch);
      }

      if ((0, _isList.default)(parentList.node, schema) && listType.validContent(parentList.node.content)) {
        tr.setNodeMarkup(parentList.pos, listType);

        if (dispatch) {
          dispatch(tr);
        }

        return false;
      }
    }

    var canWrapInList = (0, _prosemirrorSchemaList.wrapInList)(listType)(state);

    if (canWrapInList) {
      return (0, _prosemirrorSchemaList.wrapInList)(listType)(state, dispatch);
    }

    return (0, _chainTransactions.default)((0, _clearNodes.default)(), (0, _prosemirrorSchemaList.wrapInList)(listType))(state, dispatch);
  };
}