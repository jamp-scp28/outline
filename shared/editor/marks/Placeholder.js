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

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.object.set-prototype-of.js");

require("core-js/modules/es.object.get-prototype-of.js");

var _prosemirrorState = require("prosemirror-state");

var _getMarkRange = _interopRequireDefault(require("../queries/getMarkRange"));

var _mark = _interopRequireDefault(require("../rules/mark"));

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

var Placeholder = /*#__PURE__*/function (_Mark) {
  _inherits(Placeholder, _Mark);

  var _super = _createSuper(Placeholder);

  function Placeholder() {
    _classCallCheck(this, Placeholder);

    return _super.apply(this, arguments);
  }

  _createClass(Placeholder, [{
    key: "name",
    get: function get() {
      return "placeholder";
    }
  }, {
    key: "schema",
    get: function get() {
      return {
        parseDOM: [{
          tag: "span.template-placeholder"
        }],
        toDOM: function toDOM() {
          return ["span", {
            class: "template-placeholder"
          }];
        }
      };
    }
  }, {
    key: "rulePlugins",
    get: function get() {
      return [(0, _mark.default)({
        delim: "!!",
        mark: "placeholder"
      })];
    }
  }, {
    key: "toMarkdown",
    value: function toMarkdown() {
      return {
        open: "!!",
        close: "!!",
        mixable: true,
        expelEnclosingWhitespace: true
      };
    }
  }, {
    key: "parseMarkdown",
    value: function parseMarkdown() {
      return {
        mark: "placeholder"
      };
    }
  }, {
    key: "plugins",
    get: function get() {
      var _this = this;

      return [new _prosemirrorState.Plugin({
        props: {
          handleTextInput: function handleTextInput(view, from, to, text) {
            if (_this.editor.props.template) {
              return false;
            }

            var state = view.state,
                dispatch = view.dispatch;
            var $from = state.doc.resolve(from);
            var range = (0, _getMarkRange.default)($from, state.schema.marks.placeholder);

            if (!range) {
              return false;
            }

            var selectionStart = Math.min(from, range.from);
            var selectionEnd = Math.max(to, range.to);
            dispatch(state.tr.removeMark(range.from, range.to, state.schema.marks.placeholder).insertText(text, selectionStart, selectionEnd));
            var $to = view.state.doc.resolve(selectionStart + text.length);
            dispatch(view.state.tr.setSelection(_prosemirrorState.TextSelection.near($to)));
            return true;
          },
          handleKeyDown: function handleKeyDown(view, event) {
            if (!view.props.editable || !view.props.editable(view.state)) {
              return false;
            }

            if (_this.editor.props.template) {
              return false;
            }

            if (event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Backspace") {
              return false;
            }

            var state = view.state,
                dispatch = view.dispatch;

            if (event.key === "Backspace") {
              var range = (0, _getMarkRange.default)(state.doc.resolve(Math.max(0, state.selection.from - 1)), state.schema.marks.placeholder);

              if (!range) {
                return false;
              }

              dispatch(state.tr.removeMark(range.from, range.to, state.schema.marks.placeholder).insertText("", range.from, range.to));
              return true;
            }

            if (event.key === "ArrowLeft") {
              var _range = (0, _getMarkRange.default)(state.doc.resolve(Math.max(0, state.selection.from - 1)), state.schema.marks.placeholder);

              if (!_range) {
                return false;
              }

              var startOfMark = state.doc.resolve(_range.from);
              dispatch(state.tr.setSelection(_prosemirrorState.TextSelection.near(startOfMark)));
              return true;
            }

            if (event.key === "ArrowRight") {
              var _range2 = (0, _getMarkRange.default)(state.selection.$from, state.schema.marks.placeholder);

              if (!_range2) {
                return false;
              }

              var endOfMark = state.doc.resolve(_range2.to);
              dispatch(state.tr.setSelection(_prosemirrorState.TextSelection.near(endOfMark)));
              return true;
            }

            return false;
          },
          handleClick: function handleClick(view, pos, event) {
            if (!view.props.editable || !view.props.editable(view.state)) {
              return false;
            }

            if (_this.editor.props.template) {
              return false;
            }

            if (event.target instanceof HTMLSpanElement && event.target.className.includes("template-placeholder")) {
              var state = view.state,
                  dispatch = view.dispatch;
              var range = (0, _getMarkRange.default)(state.selection.$from, state.schema.marks.placeholder);

              if (!range) {
                return false;
              }

              event.stopPropagation();
              event.preventDefault();
              var startOfMark = state.doc.resolve(range.from);
              dispatch(state.tr.setSelection(_prosemirrorState.TextSelection.near(startOfMark)));
              return true;
            }

            return false;
          }
        }
      })];
    }
  }]);

  return Placeholder;
}(_Mark2.default);

exports.default = Placeholder;