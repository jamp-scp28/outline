"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseTitle;

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.string.trim.js");

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.string.starts-with.js");

var _emojiRegex = _interopRequireDefault(require("emoji-regex"));

var _unescape = _interopRequireDefault(require("./unescape"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parseTitle() {
  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var regex = (0, _emojiRegex.default)(); // find and extract title

  var firstLine = text.trim().split(/\r?\n/)[0];
  var trimmedTitle = firstLine.replace(/^#/, "").trim(); // remove any escape characters

  var title = (0, _unescape.default)(trimmedTitle); // find and extract first emoji

  var matches = regex.exec(title);
  var firstEmoji = matches ? matches[0] : null;
  var startsWithEmoji = firstEmoji && title.startsWith("".concat(firstEmoji, " "));
  var emoji = startsWithEmoji ? firstEmoji : undefined;
  return {
    title: title,
    emoji: emoji
  };
}