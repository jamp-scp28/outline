"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es.object.set-prototype-of.js");

require("core-js/modules/es.object.get-prototype-of.js");

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

var _prosemirrorCommands = require("prosemirror-commands");

var _prosemirrorState = require("prosemirror-state");

var _moveLeft = _interopRequireDefault(require("../commands/moveLeft"));

var _moveRight = _interopRequireDefault(require("../commands/moveRight"));

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

function backticksFor(node, side) {
  var ticks = /`+/g;
  var match;
  var len = 0;

  if (node.isText) {
    while (match = ticks.exec(node.text || "")) {
      len = Math.max(len, match[0].length);
    }
  }

  var result = len > 0 && side > 0 ? " `" : "`";

  for (var i = 0; i < len; i++) {
    result += "`";
  }

  if (len > 0 && side < 0) {
    result += " ";
  }

  return result;
}

var Code = /*#__PURE__*/function (_Mark) {
  _inherits(Code, _Mark);

  var _super = _createSuper(Code);

  function Code() {
    _classCallCheck(this, Code);

    return _super.apply(this, arguments);
  }

  _createClass(Code, [{
    key: "name",
    get: function get() {
      return "code_inline";
    }
  }, {
    key: "schema",
    get: function get() {
      return {
        excludes: "_",
        parseDOM: [{
          tag: "code.inline",
          preserveWhitespace: true
        }],
        toDOM: function toDOM() {
          return ["code", {
            class: "inline",
            spellCheck: "false"
          }];
        }
      };
    }
  }, {
    key: "inputRules",
    value: function inputRules(_ref) {
      var type = _ref.type;
      return [(0, _markInputRule.default)(/(?:^|[^`])(`([^`]+)`)$/, type)];
    }
  }, {
    key: "keys",
    value: function keys(_ref2) {
      var type = _ref2.type;
      // Note: This key binding only works on non-Mac platforms
      // https://github.com/ProseMirror/prosemirror/issues/515
      return {
        "Mod`": (0, _prosemirrorCommands.toggleMark)(type),
        ArrowLeft: (0, _moveLeft.default)(),
        ArrowRight: (0, _moveRight.default)()
      };
    }
  }, {
    key: "plugins",
    get: function get() {
      return [new _prosemirrorState.Plugin({
        props: {
          // Typing a character inside of two backticks will wrap the character
          // in an inline code mark.
          handleTextInput: function handleTextInput(view, from, to, text) {
            var state = view.state; // Prevent access out of document bounds

            if (from === 0 || to === state.doc.nodeSize - 1 || text === "`") {
              return false;
            }

            if (from === to && state.doc.textBetween(from - 1, from) === "`" && state.doc.textBetween(to, to + 1) === "`") {
              var start = from - 1;
              var end = to + 1;
              view.dispatch(state.tr.delete(start, end).insertText(text, start).addMark(start, start + text.length, state.schema.marks.code_inline.create()));
              return true;
            }

            return false;
          },
          // Pasting a character inside of two backticks will wrap the character
          // in an inline code mark.
          handlePaste: function handlePaste(view, _event, slice) {
            var state = view.state;
            var _state$selection = state.selection,
                from = _state$selection.from,
                to = _state$selection.to; // Prevent access out of document bounds

            if (from === 0 || to === state.doc.nodeSize - 1) {
              return false;
            }

            var start = from - 1;
            var end = to + 1;

            if (from === to && state.doc.textBetween(start, from) === "`" && state.doc.textBetween(to, end) === "`") {
              view.dispatch(state.tr.replaceRange(start, end, slice).addMark(start, start + slice.size, state.schema.marks.code_inline.create()));
              return true;
            }

            return false;
          }
        }
      })];
    }
  }, {
    key: "toMarkdown",
    value: function toMarkdown() {
      return {
        open: function open(_state, _mark, parent, index) {
          return backticksFor(parent.child(index), -1);
        },
        close: function close(_state, _mark, parent, index) {
          return backticksFor(parent.child(index - 1), 1);
        },
        escape: false
      };
    }
  }, {
    key: "parseMarkdown",
    value: function parseMarkdown() {
      return {
        mark: "code_inline"
      };
    }
  }]);

  return Code;
}(_Mark2.default);

exports.default = Code;