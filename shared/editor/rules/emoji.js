"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = emoji;

var _nameToEmoji = _interopRequireDefault(require("gemoji/name-to-emoji.json"));

var _markdownItEmoji = _interopRequireDefault(require("markdown-it-emoji"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function emoji(md) {
  // Ideally this would be an empty object, but due to a bug in markdown-it-emoji
  // passing an empty object results in newlines becoming emojis. Until this is
  // fixed at least one key is required. See:
  // https://github.com/markdown-it/markdown-it-emoji/issues/46
  var noMapping = {
    no_name_mapping: "💯"
  };
  return (0, _markdownItEmoji.default)(md, {
    defs: md.options.emoji === false ? noMapping : _nameToEmoji.default,
    shortcuts: {}
  });
}