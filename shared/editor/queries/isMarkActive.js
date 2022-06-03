"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var isMarkActive = function isMarkActive(type) {
  return function (state) {
    if (!type) {
      return false;
    }

    var _state$selection = state.selection,
        from = _state$selection.from,
        $from = _state$selection.$from,
        to = _state$selection.to,
        empty = _state$selection.empty;
    return !!(empty ? type.isInSet(state.storedMarks || $from.marks()) : state.doc.rangeHasMark(from, to, type));
  };
};

var _default = isMarkActive;
exports.default = _default;