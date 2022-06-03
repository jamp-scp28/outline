"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = backspaceToParagraph;

function backspaceToParagraph(type) {
  return function (state, dispatch) {
    var _state$selection = state.selection,
        $from = _state$selection.$from,
        from = _state$selection.from,
        to = _state$selection.to,
        empty = _state$selection.empty; // if the selection has anything in it then use standard delete behavior

    if (!empty) {
      return null;
    } // check we're in a matching node


    if ($from.parent.type !== type) {
      return null;
    } // check if we're at the beginning of the heading


    var $pos = state.doc.resolve(from - 1);

    if ($pos.parent === $from.parent) {
      return null;
    } // okay, replace it with a paragraph


    dispatch(state.tr.setBlockType(from, to, type.schema.nodes.paragraph).scrollIntoView());
    return true;
  };
}