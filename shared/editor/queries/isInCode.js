"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isInCode;

var _isMarkActive = _interopRequireDefault(require("./isMarkActive"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isInCode(state) {
  if (state.schema.nodes.code_block) {
    var $head = state.selection.$head;

    for (var d = $head.depth; d > 0; d--) {
      if ($head.node(d).type === state.schema.nodes.code_block) {
        return true;
      }
    }
  }

  return (0, _isMarkActive.default)(state.schema.marks.code_inline)(state);
}