"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toggleBlockType;

var _prosemirrorCommands = require("prosemirror-commands");

var _isNodeActive = _interopRequireDefault(require("../queries/isNodeActive"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function toggleBlockType(type, toggleType) {
  var attrs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return function (state, dispatch) {
    var isActive = (0, _isNodeActive.default)(type, attrs)(state);

    if (isActive) {
      return (0, _prosemirrorCommands.setBlockType)(toggleType)(state, dispatch);
    }

    return (0, _prosemirrorCommands.setBlockType)(type, attrs)(state, dispatch);
  };
}