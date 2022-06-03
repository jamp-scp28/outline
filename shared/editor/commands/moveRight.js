"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = moveRight;

var _isMarkActive = _interopRequireDefault(require("../queries/isMarkActive"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
Copyright 2020 Atlassian Pty Ltd

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */
// This file is based on the implementation found here:
// https://bitbucket.org/atlassian/design-system-mirror/src/master/editor/editor-core/src/plugins/text-formatting/commands/text-formatting.ts
function moveRight() {
  return function (state, dispatch) {
    var code_inline = state.schema.marks.code_inline;
    var _ref = state.selection,
        empty = _ref.empty,
        $cursor = _ref.$cursor;

    if (!empty || !$cursor) {
      return false;
    }

    var storedMarks = state.tr.storedMarks;

    if (code_inline) {
      var insideCode = (0, _isMarkActive.default)(code_inline)(state);
      var currentPosHasCode = state.doc.rangeHasMark($cursor.pos, $cursor.pos, code_inline);
      var nextPosHasCode = state.doc.rangeHasMark($cursor.pos, $cursor.pos + 1, code_inline);
      var exitingCode = !currentPosHasCode && !nextPosHasCode && (!storedMarks || !!storedMarks.length);
      var enteringCode = !currentPosHasCode && nextPosHasCode && (!storedMarks || !storedMarks.length); // entering code mark (from the left edge): don't move the cursor, just add the mark

      if (!insideCode && enteringCode) {
        dispatch(state.tr.addStoredMark(code_inline.create()));
        return true;
      } // exiting code mark: don't move the cursor, just remove the mark


      if (insideCode && exitingCode) {
        dispatch(state.tr.removeStoredMark(code_inline));
        return true;
      }
    }

    return false;
  };
}