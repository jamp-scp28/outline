"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Bold = _interopRequireDefault(require("../marks/Bold"));

var _Code = _interopRequireDefault(require("../marks/Code"));

var _Italic = _interopRequireDefault(require("../marks/Italic"));

var _Link = _interopRequireDefault(require("../marks/Link"));

var _Strikethrough = _interopRequireDefault(require("../marks/Strikethrough"));

var _Underline = _interopRequireDefault(require("../marks/Underline"));

var _Doc = _interopRequireDefault(require("../nodes/Doc"));

var _Emoji = _interopRequireDefault(require("../nodes/Emoji"));

var _HardBreak = _interopRequireDefault(require("../nodes/HardBreak"));

var _Image = _interopRequireDefault(require("../nodes/Image"));

var _Paragraph = _interopRequireDefault(require("../nodes/Paragraph"));

var _Text = _interopRequireDefault(require("../nodes/Text"));

var _ClipboardTextSerializer = _interopRequireDefault(require("../plugins/ClipboardTextSerializer"));

var _DateTime = _interopRequireDefault(require("../plugins/DateTime"));

var _History = _interopRequireDefault(require("../plugins/History"));

var _MaxLength = _interopRequireDefault(require("../plugins/MaxLength"));

var _PasteHandler = _interopRequireDefault(require("../plugins/PasteHandler"));

var _Placeholder = _interopRequireDefault(require("../plugins/Placeholder"));

var _SmartText = _interopRequireDefault(require("../plugins/SmartText"));

var _TrailingNode = _interopRequireDefault(require("../plugins/TrailingNode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var basicPackage = [_Doc.default, _HardBreak.default, _Paragraph.default, _Emoji.default, _Text.default, _Image.default, _Bold.default, _Code.default, _Italic.default, _Underline.default, _Link.default, _Strikethrough.default, _History.default, _SmartText.default, _TrailingNode.default, _PasteHandler.default, _Placeholder.default, _MaxLength.default, _DateTime.default, _ClipboardTextSerializer.default];
var _default = basicPackage;
exports.default = _default;