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

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.object.set-prototype-of.js");

require("core-js/modules/es.object.get-prototype-of.js");

var _prosemirrorInputrules = require("prosemirror-inputrules");

var _toggleWrap = _interopRequireDefault(require("../commands/toggleWrap"));

var _isNodeActive = _interopRequireDefault(require("../queries/isNodeActive"));

var _Node2 = _interopRequireDefault(require("./Node"));

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

var Blockquote = /*#__PURE__*/function (_Node) {
  _inherits(Blockquote, _Node);

  var _super = _createSuper(Blockquote);

  function Blockquote() {
    _classCallCheck(this, Blockquote);

    return _super.apply(this, arguments);
  }

  _createClass(Blockquote, [{
    key: "name",
    get: function get() {
      return "blockquote";
    }
  }, {
    key: "schema",
    get: function get() {
      return {
        content: "block+",
        group: "block",
        defining: true,
        parseDOM: [{
          tag: "blockquote"
        }, // Dropbox Paper parsing, yes their quotes are actually lists
        {
          tag: "ul.listtype-quote",
          contentElement: "li"
        }],
        toDOM: function toDOM() {
          return ["blockquote", 0];
        }
      };
    }
  }, {
    key: "inputRules",
    value: function inputRules(_ref) {
      var type = _ref.type;
      return [(0, _prosemirrorInputrules.wrappingInputRule)(/^\s*>\s$/, type)];
    }
  }, {
    key: "commands",
    value: function commands(_ref2) {
      var type = _ref2.type;
      return function () {
        return (0, _toggleWrap.default)(type);
      };
    }
  }, {
    key: "keys",
    value: function keys(_ref3) {
      var type = _ref3.type;
      return {
        "Ctrl->": (0, _toggleWrap.default)(type),
        "Mod-]": (0, _toggleWrap.default)(type),
        "Shift-Enter": function ShiftEnter(state, dispatch) {
          if (!(0, _isNodeActive.default)(type)(state)) {
            return false;
          }

          var tr = state.tr,
              selection = state.selection;
          dispatch(tr.split(selection.to));
          return true;
        }
      };
    }
  }, {
    key: "toMarkdown",
    value: function toMarkdown(state, node) {
      state.wrapBlock("> ", undefined, node, function () {
        return state.renderContent(node);
      });
    }
  }, {
    key: "parseMarkdown",
    value: function parseMarkdown() {
      return {
        block: "blockquote"
      };
    }
  }]);

  return Blockquote;
}(_Node2.default);

exports.default = Blockquote;