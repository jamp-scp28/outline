"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es.object.set-prototype-of.js");

require("core-js/modules/es.object.get-prototype-of.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.reflect.construct.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.weak-map.js");

require("core-js/modules/esnext.weak-map.delete-all.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.run = run;

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.function.name.js");

var _outlineIcons = require("outline-icons");

var _prosemirrorInputrules = require("prosemirror-inputrules");

var _prosemirrorState = require("prosemirror-state");

var _prosemirrorTables = require("prosemirror-tables");

var _prosemirrorUtils = require("prosemirror-utils");

var _prosemirrorView = require("prosemirror-view");

var React = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _Extension2 = _interopRequireDefault(require("../lib/Extension"));

var _types = require("../types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var MAX_MATCH = 500;
var OPEN_REGEX = /^\/(\w+)?$/;
var CLOSE_REGEX = /(^(?!\/(\w+)?)(.*)$|^\/(([\w\W]+)\s.*|\s)$|^\/((\W)+)$)/; // based on the input rules code in Prosemirror, here:
// https://github.com/ProseMirror/prosemirror-inputrules/blob/master/src/inputrules.js

function run(view, from, to, regex, handler) {
  if (view.composing) {
    return false;
  }

  var state = view.state;
  var $from = state.doc.resolve(from);

  if ($from.parent.type.spec.code) {
    return false;
  }

  var textBefore = $from.parent.textBetween(Math.max(0, $from.parentOffset - MAX_MATCH), $from.parentOffset, undefined, "\uFFFC");
  var match = regex.exec(textBefore);
  var tr = handler(state, match, match ? from - match[0].length : from, to);

  if (!tr) {
    return false;
  }

  return true;
}

var BlockMenuTrigger = /*#__PURE__*/function (_Extension) {
  _inherits(BlockMenuTrigger, _Extension);

  var _super = _createSuper(BlockMenuTrigger);

  function BlockMenuTrigger() {
    _classCallCheck(this, BlockMenuTrigger);

    return _super.apply(this, arguments);
  }

  _createClass(BlockMenuTrigger, [{
    key: "name",
    get: function get() {
      return "blockmenu";
    }
  }, {
    key: "plugins",
    get: function get() {
      var _this = this;

      var button = document.createElement("button");
      button.className = "block-menu-trigger";
      button.type = "button";

      _reactDom.default.render( /*#__PURE__*/React.createElement(_outlineIcons.PlusIcon, {
        color: "currentColor"
      }), button);

      return [new _prosemirrorState.Plugin({
        props: {
          handleClick: function handleClick() {
            _this.editor.events.emit(_types.EventType.blockMenuClose);

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
                return run(view, pos, pos, OPEN_REGEX, function (state, match) {
                  if (match) {
                    _this.editor.events.emit(_types.EventType.blockMenuOpen, match[1]);
                  } else {
                    _this.editor.events.emit(_types.EventType.blockMenuClose);
                  }

                  return null;
                });
              });
            } // If the query is active and we're navigating the block menu then
            // just ignore the key events in the editor itself until we're done


            if (event.key === "Enter" || event.key === "ArrowUp" || event.key === "ArrowDown" || event.key === "Tab") {
              var pos = view.state.selection.$from.pos;
              return run(view, pos, pos, OPEN_REGEX, function (state, match) {
                // just tell Prosemirror we handled it and not to do anything
                return match ? true : null;
              });
            }

            return false;
          },
          decorations: function decorations(state) {
            var parent = (0, _prosemirrorUtils.findParentNode)(function (node) {
              return node.type.name === "paragraph";
            })(state.selection);

            if (!parent) {
              return;
            }

            var isTopLevel = state.selection.$from.depth === 1;

            if (!isTopLevel) {
              return;
            }

            var decorations = [];
            var isEmptyNode = parent && parent.node.content.size === 0;
            var isSlash = parent && parent.node.textContent === "/";

            if (isEmptyNode) {
              decorations.push(_prosemirrorView.Decoration.widget(parent.pos, function () {
                button.addEventListener("click", function () {
                  _this.editor.events.emit(_types.EventType.blockMenuOpen, "");
                });
                return button;
              }, {
                key: "block-trigger"
              }));
              var isEmptyDoc = state.doc.textContent === "";

              if (!isEmptyDoc) {
                decorations.push(_prosemirrorView.Decoration.node(parent.pos, parent.pos + parent.node.nodeSize, {
                  class: "placeholder",
                  "data-empty-text": _this.options.dictionary.newLineEmpty
                }));
              }
            } else if (isSlash) {
              decorations.push(_prosemirrorView.Decoration.node(parent.pos, parent.pos + parent.node.nodeSize, {
                class: "placeholder",
                "data-empty-text": "  ".concat(_this.options.dictionary.newLineWithSlash)
              }));
            }

            return _prosemirrorView.DecorationSet.create(state.doc, decorations);
          }
        }
      })];
    }
  }, {
    key: "inputRules",
    value: function inputRules() {
      var _this2 = this;

      return [// main regex should match only:
      // /word
      new _prosemirrorInputrules.InputRule(OPEN_REGEX, function (state, match) {
        if (match && state.selection.$from.parent.type.name === "paragraph" && !(0, _prosemirrorTables.isInTable)(state)) {
          _this2.editor.events.emit(_types.EventType.blockMenuOpen, match[1]);
        }

        return null;
      }), // invert regex should match some of these scenarios:
      // /<space>word
      // /<space>
      // /word<space>
      new _prosemirrorInputrules.InputRule(CLOSE_REGEX, function (state, match) {
        if (match) {
          _this2.editor.events.emit(_types.EventType.blockMenuClose);
        }

        return null;
      })];
    }
  }]);

  return BlockMenuTrigger;
}(_Extension2.default);

exports.default = BlockMenuTrigger;