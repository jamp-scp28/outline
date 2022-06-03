"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = headingToSlug;
exports.headingToPersistenceKey = headingToPersistenceKey;

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.map.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/esnext.map.delete-all.js");

require("core-js/modules/esnext.map.every.js");

require("core-js/modules/esnext.map.filter.js");

require("core-js/modules/esnext.map.find.js");

require("core-js/modules/esnext.map.find-key.js");

require("core-js/modules/esnext.map.includes.js");

require("core-js/modules/esnext.map.key-of.js");

require("core-js/modules/esnext.map.map-keys.js");

require("core-js/modules/esnext.map.map-values.js");

require("core-js/modules/esnext.map.merge.js");

require("core-js/modules/esnext.map.reduce.js");

require("core-js/modules/esnext.map.some.js");

require("core-js/modules/esnext.map.update.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.concat.js");

var _escape2 = _interopRequireDefault(require("lodash/escape"));

var _slugify = _interopRequireDefault(require("slugify"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cache = new Map(); // Slugify, escape, and remove periods from headings so that they are
// compatible with both url hashes AND dom ID's (querySelector does not like
// ID's that begin with a number or a period, for example).

function safeSlugify(text) {
  if (cache.has(text)) {
    return cache.get(text);
  }

  var slug = "h-".concat((0, _escape2.default)((0, _slugify.default)(text, {
    remove: /[!"#$%&'\.()*+,\/:;<=>?@\[\]\\^_`{|}~]/g,
    lower: true
  })));
  cache.set(text, slug);
  return slug;
} // calculates a unique slug for this heading based on it's text and position
// in the document that is as stable as possible


function headingToSlug(node) {
  var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var slugified = safeSlugify(node.textContent);

  if (index === 0) {
    return slugified;
  }

  return "".concat(slugified, "-").concat(index);
}

function headingToPersistenceKey(node, id) {
  var _window;

  var slug = headingToSlug(node);
  return "rme-".concat(id || ((_window = window) === null || _window === void 0 ? void 0 : _window.location.pathname), "\u2013").concat(slug);
}