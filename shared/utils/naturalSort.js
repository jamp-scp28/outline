"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.array.sort.js");

var _deburr2 = _interopRequireDefault(require("lodash/deburr"));

var _emojiRegex = _interopRequireDefault(require("emoji-regex"));

var _naturalSort = _interopRequireDefault(require("natural-sort"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sorter = (0, _naturalSort.default)();
var regex = (0, _emojiRegex.default)();

var stripEmojis = function stripEmojis(value) {
  return value.replace(regex, "");
};

var cleanValue = function cleanValue(value) {
  return stripEmojis((0, _deburr2.default)(value));
};

function getSortByField(item, keyOrCallback) {
  var field = typeof keyOrCallback === "string" ? item[keyOrCallback] : keyOrCallback(item);
  return cleanValue(field);
}

function naturalSortBy(items, key, sortOptions) {
  if (!items) {
    return [];
  }

  var sort = sortOptions ? (0, _naturalSort.default)({
    caseSensitive: sortOptions.caseSensitive,
    direction: sortOptions.direction === "desc" ? "desc" : undefined
  }) : sorter;
  return items.sort(function (a, b) {
    return sort(getSortByField(a, key), getSortByField(b, key));
  });
}

var _default = naturalSortBy;
exports.default = _default;