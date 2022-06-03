"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateColorHex = exports.stringToColor = exports.palette = void 0;

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.parse-int.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.regexp.to-string.js");

var _md = _interopRequireDefault(require("crypto-js/md5"));

var _polished = require("polished");

var _theme = _interopRequireDefault(require("../styles/theme"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var palette = [_theme.default.brand.red, _theme.default.brand.blue, _theme.default.brand.purple, _theme.default.brand.pink, _theme.default.brand.marine, _theme.default.brand.green, _theme.default.brand.yellow, (0, _polished.darken)(0.2, _theme.default.brand.red), (0, _polished.darken)(0.2, _theme.default.brand.blue), (0, _polished.darken)(0.2, _theme.default.brand.purple), (0, _polished.darken)(0.2, _theme.default.brand.pink), (0, _polished.darken)(0.2, _theme.default.brand.marine), (0, _polished.darken)(0.2, _theme.default.brand.green), (0, _polished.darken)(0.2, _theme.default.brand.yellow)];
exports.palette = palette;

var validateColorHex = function validateColorHex(color) {
  return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);
};

exports.validateColorHex = validateColorHex;

var stringToColor = function stringToColor(input) {
  var inputAsNumber = parseInt((0, _md.default)(input).toString(), 16);
  return palette[inputAsNumber % palette.length];
};

exports.stringToColor = stringToColor;