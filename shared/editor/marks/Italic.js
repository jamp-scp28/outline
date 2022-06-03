"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.reflect.construct.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.object.set-prototype-of.js");

require("core-js/modules/es.object.get-prototype-of.js");

var _prosemirrorCommands = require("prosemirror-commands");

var _markInputRule = _interopRequireDefault(require("../lib/markInputRule"));

var _Mark2 = _interopRequireDefault(require("./Mark"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Italic = /*#__PURE__*/function (_Mark) {
  _inherits(Italic, _Mark);

  var _super = _createSuper(Italic);

  function Italic() {
    _classCallCheck(this, Italic);

    return _super.apply(this, arguments);
  }

  _createClass(Italic, [{
    key: "name",
    get: function get() {
      return "em";
    }
  }, {
    key: "schema",
    get: function get() {
      return {
        parseDOM: [{
          tag: "i"
        }, {
          tag: "em"
        }, {
          style: "font-style",
          getAttrs: function getAttrs(value) {
            return value === "italic" ? null : false;
          }
        }],
        toDOM: function toDOM() {
          return ["em"];
        }
      };
    }
  }, {
    key: "inputRules",
    value: function inputRules(_ref) {
      var type = _ref.type;

      /**
       * Due to use of snake_case strings common in docs the matching conditions
       * are a bit more strict than e.g. the ** bold syntax to help prevent
       * false positives.
       *
       * Matches:
       * _1_
       * _123_
       * (_one_
       * [_one_
       *
       * No match:
       * __
       * __123_
       * __123__
       * _123
       * one_123_
       * ONE_123_
       * 1_123_
       */
      return [(0, _markInputRule.default)(/(?:^|[^_a-zA-Z0-9])(_([^_]+)_)$/, type), (0, _markInputRule.default)(/(?:^|[^*a-zA-Z0-9])(\*([^*]+)\*)$/, type)];
    }
  }, {
    key: "keys",
    value: function keys(_ref2) {
      var type = _ref2.type;
      return {
        "Mod-i": (0, _prosemirrorCommands.toggleMark)(type),
        "Mod-I": (0, _prosemirrorCommands.toggleMark)(type)
      };
    }
  }, {
    key: "toMarkdown",
    value: function toMarkdown() {
      return {
        open: "*",
        close: "*",
        mixable: true,
        expelEnclosingWhitespace: true
      };
    }
  }, {
    key: "parseMarkdown",
    value: function parseMarkdown() {
      return {
        mark: "em"
      };
    }
  }]);

  return Italic;
}(_Mark2.default);

exports.default = Italic;