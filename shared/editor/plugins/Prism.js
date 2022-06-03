"use strict";

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.object.get-own-property-descriptors.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LANGUAGES = void 0;
exports.default = Prism;

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.array.concat.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.array.join.js");

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.array.find.js");

require("core-js/modules/es.number.constructor.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.string.includes.js");

var _flattenDeep2 = _interopRequireDefault(require("lodash/flattenDeep"));

var _prosemirrorState = require("prosemirror-state");

var _prosemirrorUtils = require("prosemirror-utils");

var _prosemirrorView = require("prosemirror-view");

var _core = _interopRequireDefault(require("refractor/core"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var LANGUAGES = {
  none: "None",
  // additional entry to disable highlighting
  bash: "Bash",
  css: "CSS",
  clike: "C",
  csharp: "C#",
  go: "Go",
  markup: "HTML",
  objectivec: "Objective-C",
  java: "Java",
  javascript: "JavaScript",
  json: "JSON",
  perl: "Perl",
  php: "PHP",
  powershell: "Powershell",
  python: "Python",
  ruby: "Ruby",
  rust: "Rust",
  sql: "SQL",
  solidity: "Solidity",
  typescript: "TypeScript",
  yaml: "YAML"
};
exports.LANGUAGES = LANGUAGES;
var cache = {};

function getDecorations(_ref) {
  var doc = _ref.doc,
      name = _ref.name;
  var decorations = [];
  var blocks = (0, _prosemirrorUtils.findBlockNodes)(doc).filter(function (item) {
    return item.node.type.name === name;
  });

  function parseNodes(nodes) {
    var classNames = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    return nodes.map(function (node) {
      if (node.type === "element") {
        var classes = [].concat(_toConsumableArray(classNames), _toConsumableArray(node.properties.className || []));
        return parseNodes(node.children, classes);
      }

      return {
        text: node.value,
        classes: classNames
      };
    });
  }

  blocks.forEach(function (block) {
    var startPos = block.pos + 1;
    var language = block.node.attrs.language;

    if (!language || language === "none" || !_core.default.registered(language)) {
      return;
    }

    if (!cache[block.pos] || !cache[block.pos].node.eq(block.node)) {
      var nodes = _core.default.highlight(block.node.textContent, language);

      var _decorations = (0, _flattenDeep2.default)(parseNodes(nodes)).map(function (node) {
        var from = startPos;
        var to = from + node.text.length;
        startPos = to;
        return _objectSpread(_objectSpread({}, node), {}, {
          from: from,
          to: to
        });
      }).filter(function (node) {
        return node.classes && node.classes.length;
      }).map(function (node) {
        return _prosemirrorView.Decoration.inline(node.from, node.to, {
          class: node.classes.join(" ")
        });
      });

      cache[block.pos] = {
        node: block.node,
        decorations: _decorations
      };
    }

    cache[block.pos].decorations.forEach(function (decoration) {
      decorations.push(decoration);
    });
  });
  Object.keys(cache).filter(function (pos) {
    return !blocks.find(function (block) {
      return block.pos === Number(pos);
    });
  }).forEach(function (pos) {
    delete cache[Number(pos)];
  });
  return _prosemirrorView.DecorationSet.create(doc, decorations);
}

function Prism(_ref2) {
  var name = _ref2.name;
  var highlighted = false;
  return new _prosemirrorState.Plugin({
    key: new _prosemirrorState.PluginKey("prism"),
    state: {
      init: function init(_, _ref3) {
        var doc = _ref3.doc;
        return _prosemirrorView.DecorationSet.create(doc, []);
      },
      apply: function apply(transaction, decorationSet, oldState, state) {
        var nodeName = state.selection.$head.parent.type.name;
        var previousNodeName = oldState.selection.$head.parent.type.name;
        var codeBlockChanged = transaction.docChanged && [nodeName, previousNodeName].includes(name);
        var ySyncEdit = !!transaction.getMeta("y-sync$");

        if (!highlighted || codeBlockChanged || ySyncEdit) {
          highlighted = true;
          return getDecorations({
            doc: transaction.doc,
            name: name
          });
        }

        return decorationSet.map(transaction.mapping, transaction.doc);
      }
    },
    view: function view(_view) {
      if (!highlighted) {
        // we don't highlight code blocks on the first render as part of mounting
        // as it's expensive (relative to the rest of the document). Instead let
        // it render un-highlighted and then trigger a defered render of Prism
        // by updating the plugins metadata
        setTimeout(function () {
          _view.dispatch(_view.state.tr.setMeta("prism", {
            loaded: true
          }));
        }, 10);
      }

      return {};
    },
    props: {
      decorations: function decorations(state) {
        return this.getState(state);
      }
    }
  });
}