"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = renderToHtml;

var _rules = _interopRequireDefault(require("./../../shared/editor/lib/markdown/rules"));

var _attachments = _interopRequireDefault(require("./../../shared/editor/rules/attachments"));

var _breaks = _interopRequireDefault(require("./../../shared/editor/rules/breaks"));

var _checkboxes = _interopRequireDefault(require("./../../shared/editor/rules/checkboxes"));

var _embeds = _interopRequireDefault(require("./../../shared/editor/rules/embeds"));

var _emoji = _interopRequireDefault(require("./../../shared/editor/rules/emoji"));

var _mark = _interopRequireDefault(require("./../../shared/editor/rules/mark"));

var _notices = _interopRequireDefault(require("./../../shared/editor/rules/notices"));

var _tables = _interopRequireDefault(require("./../../shared/editor/rules/tables"));

var _underlines = _interopRequireDefault(require("./../../shared/editor/rules/underlines"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const defaultRules = [(0, _embeds.default)([]), _breaks.default, _checkboxes.default, (0, _mark.default)({
  delim: "==",
  mark: "highlight"
}), (0, _mark.default)({
  delim: "!!",
  mark: "placeholder"
}), _underlines.default, _tables.default, _notices.default, _attachments.default, _emoji.default];

function renderToHtml(markdown, rulePlugins = defaultRules) {
  return (0, _rules.default)({
    plugins: rulePlugins
  }).render(markdown).trim();
}