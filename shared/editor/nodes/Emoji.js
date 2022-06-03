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

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.regexp.exec.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.string.trim.js");

require("core-js/modules/es.object.set-prototype-of.js");

require("core-js/modules/es.object.get-prototype-of.js");

var _nameToEmoji = _interopRequireDefault(require("gemoji/name-to-emoji.json"));

var _prosemirrorInputrules = require("prosemirror-inputrules");

var _prosemirrorState = require("prosemirror-state");

var _BlockMenuTrigger = require("../plugins/BlockMenuTrigger");

var _isInCode = _interopRequireDefault(require("../queries/isInCode"));

var _emoji = _interopRequireDefault(require("../rules/emoji"));

var _types = require("../types");

var _Node2 = _interopRequireDefault(require("./Node"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

var OPEN_REGEX = /(?:^|\s):([0-9a-zA-Z_+-]+)?$/;
var CLOSE_REGEX = /(?:^|\s):(([0-9a-zA-Z_+-]*\s+)|(\s+[0-9a-zA-Z_+-]+)|[^0-9a-zA-Z_+-]+)$/;

var Emoji = /*#__PURE__*/function (_Node) {
  _inherits(Emoji, _Node);

  var _super = _createSuper(Emoji);

  function Emoji() {
    _classCallCheck(this, Emoji);

    return _super.apply(this, arguments);
  }

  _createClass(Emoji, [{
    key: "name",
    get: function get() {
      return "emoji";
    }
  }, {
    key: "schema",
    get: function get() {
      return {
        attrs: {
          style: {
            default: ""
          },
          "data-name": {
            default: undefined
          }
        },
        inline: true,
        content: "text*",
        marks: "",
        group: "inline",
        selectable: false,
        parseDOM: [{
          tag: "span.emoji",
          preserveWhitespace: "full",
          getAttrs: function getAttrs(dom) {
            return {
              "data-name": dom.dataset.name
            };
          }
        }],
        toDOM: function toDOM(node) {
          if (_nameToEmoji.default[node.attrs["data-name"]]) {
            var _text = document.createTextNode(_nameToEmoji.default[node.attrs["data-name"]]);

            return ["span", {
              class: "emoji ".concat(node.attrs["data-name"]),
              "data-name": node.attrs["data-name"]
            }, _text];
          }

          var text = document.createTextNode(":".concat(node.attrs["data-name"], ":"));
          return ["span", {
            class: "emoji"
          }, text];
        },
        toPlainText: function toPlainText(node) {
          return _nameToEmoji.default[node.attrs["data-name"]];
        }
      };
    }
  }, {
    key: "rulePlugins",
    get: function get() {
      return [_emoji.default];
    }
  }, {
    key: "plugins",
    get: function get() {
      var _this = this;

      return [new _prosemirrorState.Plugin({
        props: {
          handleClick: function handleClick() {
            _this.editor.events.emit(_types.EventType.emojiMenuClose);

            return false;
          },
          handleKeyDown: function handleKeyDown(view, event) {
            // Prosemirror input rules are not triggered on backspace, however
            // we need them to be evaluted for the filter trigger to work
            // correctly. This additional handler adds inputrules-like handling.
            if (event.key === "Backspace") {
              // timeout ensures that the delete has been handled by prosemirror
              // and any characters removed, before we evaluate the rule.
              setTimeout(function () {
                var pos = view.state.selection.$from.pos;
                return (0, _BlockMenuTrigger.run)(view, pos, pos, OPEN_REGEX, function (state, match) {
                  if (match) {
                    _this.editor.events.emit(_types.EventType.emojiMenuOpen, match[1]);
                  } else {
                    _this.editor.events.emit(_types.EventType.emojiMenuClose);
                  }

                  return null;
                });
              });
            } // If the query is active and we're navigating the block menu then
            // just ignore the key events in the editor itself until we're done


            if (event.key === "Enter" || event.key === "ArrowUp" || event.key === "ArrowDown" || event.key === "Tab") {
              var pos = view.state.selection.$from.pos;
              return (0, _BlockMenuTrigger.run)(view, pos, pos, OPEN_REGEX, function (state, match) {
                // just tell Prosemirror we handled it and not to do anything
                return match ? true : null;
              });
            }

            return false;
          }
        }
      })];
    }
  }, {
    key: "commands",
    value: function commands(_ref) {
      var type = _ref.type;
      return function (attrs) {
        return function (state, dispatch) {
          var _selection$$cursor;

          var selection = state.selection;
          var position = selection instanceof _prosemirrorState.TextSelection ? (_selection$$cursor = selection.$cursor) === null || _selection$$cursor === void 0 ? void 0 : _selection$$cursor.pos : selection.$to.pos;

          if (position === undefined) {
            return false;
          }

          var node = type.create(attrs);
          var transaction = state.tr.insert(position, node);
          dispatch(transaction);
          return true;
        };
      };
    }
  }, {
    key: "inputRules",
    value: function inputRules(_ref2) {
      var _this2 = this;

      var type = _ref2.type;
      return [new _prosemirrorInputrules.InputRule(/^:([a-zA-Z0-9_+-]+):$/, function (state, match, start, end) {
        var _match = _slicedToArray(match, 2),
            okay = _match[0],
            markup = _match[1];

        var tr = state.tr;

        if (okay) {
          tr.replaceWith(start - 1, end, type.create({
            "data-name": markup,
            markup: markup
          }));
        }

        return tr;
      }), // main regex should match only:
      // :word
      new _prosemirrorInputrules.InputRule(OPEN_REGEX, function (state, match) {
        if (match && state.selection.$from.parent.type.name === "paragraph" && !(0, _isInCode.default)(state)) {
          _this2.editor.events.emit(_types.EventType.emojiMenuOpen, match[1]);
        }

        return null;
      }), // invert regex should match some of these scenarios:
      // :<space>word
      // :<space>
      // :word<space>
      // :)
      new _prosemirrorInputrules.InputRule(CLOSE_REGEX, function (state, match) {
        if (match) {
          _this2.editor.events.emit(_types.EventType.emojiMenuClose);
        }

        return null;
      })];
    }
  }, {
    key: "toMarkdown",
    value: function toMarkdown(state, node) {
      var name = node.attrs["data-name"];

      if (name) {
        state.write(":".concat(name, ":"));
      }
    }
  }, {
    key: "parseMarkdown",
    value: function parseMarkdown() {
      return {
        node: "emoji",
        getAttrs: function getAttrs(tok) {
          return {
            "data-name": tok.markup.trim()
          };
        }
      };
    }
  }]);

  return Emoji;
}(_Node2.default);

exports.default = Emoji;