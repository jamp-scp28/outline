"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = moveLeft;

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.object.to-string.js");

var _prosemirrorState = require("prosemirror-state");

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
function hasCode(state, pos) {
  var code_inline = state.schema.marks.code_inline;
  var node = pos >= 0 && state.doc.nodeAt(pos);
  return node ? !!node.marks.filter(function (mark) {
    return mark.type === code_inline;
  }).length : false;
}

function moveLeft() {
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
      var insideCode = code_inline && (0, _isMarkActive.default)(code_inline)(state);
      var currentPosHasCode = hasCode(state, $cursor.pos);
      var nextPosHasCode = hasCode(state, $cursor.pos - 1);
      var nextNextPosHasCode = hasCode(state, $cursor.pos - 2);
      var exitingCode = currentPosHasCode && !nextPosHasCode && Array.isArray(storedMarks);
      var atLeftEdge = nextPosHasCode && !nextNextPosHasCode && (storedMarks === null || Array.isArray(storedMarks) && !!storedMarks.length);
      var atRightEdge = (exitingCode && Array.isArray(storedMarks) && !storedMarks.length || !exitingCode && storedMarks === null) && !nextPosHasCode && nextNextPosHasCode;
      var enteringCode = !currentPosHasCode && nextPosHasCode && Array.isArray(storedMarks) && !storedMarks.length; // at the right edge: remove code mark and move the cursor to the left

      if (!insideCode && atRightEdge) {
        var tr = state.tr.setSelection(_prosemirrorState.Selection.near(state.doc.resolve($cursor.pos - 1)));
        dispatch(tr.removeStoredMark(code_inline));
        return true;
      } // entering code mark (from right edge): don't move the cursor, just add the mark


      if (!insideCode && enteringCode) {
        dispatch(state.tr.addStoredMark(code_inline.create()));
        return true;
      } // at the left edge: add code mark and move the cursor to the left


      if (insideCode && atLeftEdge) {
        var _tr = state.tr.setSelection(_prosemirrorState.Selection.near(state.doc.resolve($cursor.pos - 1)));

        dispatch(_tr.addStoredMark(code_inline.create()));
        return true;
      } // exiting code mark (or at the beginning of the line): don't move the cursor, just remove the mark


      var isFirstChild = $cursor.index($cursor.depth - 1) === 0;

      if (insideCode && (exitingCode || !$cursor.nodeBefore && isFirstChild)) {
        dispatch(state.tr.removeStoredMark(code_inline));
        return true;
      }
    }

    return false;
  };
}