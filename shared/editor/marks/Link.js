"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es.object.set-prototype-of.js");

require("core-js/modules/es.object.get-prototype-of.js");

require("core-js/modules/es.reflect.construct.js");

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.object.get-own-property-descriptors.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.weak-map.js");

require("core-js/modules/esnext.weak-map.delete-all.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.array.find.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.string.starts-with.js");

var _outlineIcons = require("outline-icons");

var _prosemirrorCommands = require("prosemirror-commands");

var _prosemirrorInputrules = require("prosemirror-inputrules");

var _prosemirrorState = require("prosemirror-state");

var _prosemirrorView = require("prosemirror-view");

var React = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _urls = require("../../utils/urls");

var _findLinkNodes = _interopRequireDefault(require("../queries/findLinkNodes"));

var _types = require("../types");

var _Mark2 = _interopRequireDefault(require("./Mark"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var LINK_INPUT_REGEX = /\[([^[]+)]\((\S+)\)$/;
var icon;

if (typeof window !== "undefined") {
  var component = /*#__PURE__*/React.createElement(_outlineIcons.OpenIcon, {
    color: "currentColor",
    size: 16
  });
  icon = document.createElement("span");
  icon.className = "external-link";

  _reactDom.default.render(component, icon);
}

function isPlainURL(link, parent, index, side) {
  if (link.attrs.title || !/^\w+:/.test(link.attrs.href)) {
    return false;
  }

  var content = parent.child(index + (side < 0 ? -1 : 0));

  if (!content.isText || content.text !== link.attrs.href || content.marks[content.marks.length - 1] !== link) {
    return false;
  }

  if (index === (side < 0 ? 1 : parent.childCount - 1)) {
    return true;
  }

  var next = parent.child(index + (side < 0 ? -2 : 1));
  return !link.isInSet(next.marks);
}

var Link = /*#__PURE__*/function (_Mark) {
  _inherits(Link, _Mark);

  var _super = _createSuper(Link);

  function Link() {
    _classCallCheck(this, Link);

    return _super.apply(this, arguments);
  }

  _createClass(Link, [{
    key: "name",
    get: function get() {
      return "link";
    }
  }, {
    key: "schema",
    get: function get() {
      return {
        attrs: {
          href: {
            default: ""
          }
        },
        inclusive: false,
        parseDOM: [{
          tag: "a[href]",
          getAttrs: function getAttrs(dom) {
            return {
              href: dom.getAttribute("href")
            };
          }
        }],
        toDOM: function toDOM(node) {
          return ["a", _objectSpread(_objectSpread({}, node.attrs), {}, {
            rel: "noopener noreferrer nofollow"
          }), 0];
        }
      };
    }
  }, {
    key: "inputRules",
    value: function inputRules(_ref) {
      var _this = this;

      var type = _ref.type;
      return [new _prosemirrorInputrules.InputRule(LINK_INPUT_REGEX, function (state, match, start, end) {
        var _match = _slicedToArray(match, 3),
            okay = _match[0],
            alt = _match[1],
            href = _match[2];

        var tr = state.tr;

        if (okay) {
          tr.replaceWith(start, end, _this.editor.schema.text(alt)).addMark(start, start + alt.length, type.create({
            href: href
          }));
        }

        return tr;
      })];
    }
  }, {
    key: "commands",
    value: function commands(_ref2) {
      var type = _ref2.type;
      return function () {
        var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
          href: ""
        },
            href = _ref3.href;

        return (0, _prosemirrorCommands.toggleMark)(type, {
          href: href
        });
      };
    }
  }, {
    key: "keys",
    value: function keys(_ref4) {
      var _this2 = this;

      var type = _ref4.type;
      return {
        "Mod-k": function ModK(state, dispatch) {
          if (state.selection.empty) {
            _this2.editor.events.emit(_types.EventType.linkMenuOpen);

            return true;
          }

          return (0, _prosemirrorCommands.toggleMark)(type, {
            href: ""
          })(state, dispatch);
        }
      };
    }
  }, {
    key: "plugins",
    get: function get() {
      var _this3 = this;

      var getLinkDecorations = function getLinkDecorations(state) {
        var decorations = [];
        var links = (0, _findLinkNodes.default)(state.doc);
        links.forEach(function (nodeWithPos) {
          var linkMark = nodeWithPos.node.marks.find(function (mark) {
            return mark.type.name === "link";
          });

          if (linkMark && (0, _urls.isExternalUrl)(linkMark.attrs.href)) {
            decorations.push(_prosemirrorView.Decoration.widget( // place the decoration at the end of the link
            nodeWithPos.pos + nodeWithPos.node.nodeSize, function () {
              return icon.cloneNode(true);
            }, {
              // position on the right side of the position
              side: 1,
              key: "external-link"
            }));
          }
        });
        return _prosemirrorView.DecorationSet.create(state.doc, decorations);
      };

      var plugin = new _prosemirrorState.Plugin({
        state: {
          init: function init(config, state) {
            return getLinkDecorations(state);
          },
          apply: function apply(tr, decorationSet, _oldState, newState) {
            return tr.docChanged ? getLinkDecorations(newState) : decorationSet;
          }
        },
        props: {
          decorations: function decorations(state) {
            return plugin.getState(state);
          },
          handleDOMEvents: {
            mouseover: function mouseover(view, event) {
              if (event.target instanceof HTMLAnchorElement && !event.target.className.includes("ProseMirror-widget") && (!view.editable || view.editable && !view.hasFocus())) {
                if (_this3.options.onHoverLink) {
                  return _this3.options.onHoverLink(event);
                }
              }

              return false;
            },
            mousedown: function mousedown(view, event) {
              if (!(event.target instanceof HTMLAnchorElement) || event.button !== 0) {
                return false;
              }

              if (event.target.matches(".component-attachment *")) {
                return false;
              } // clicking a link while editing should show the link toolbar,
              // clicking in read-only will navigate


              if (!view.editable || view.editable && !view.hasFocus()) {
                var href = event.target.href || (event.target.parentNode instanceof HTMLAnchorElement ? event.target.parentNode.href : "");
                var isHashtag = href.startsWith("#");

                if (isHashtag && _this3.options.onClickHashtag) {
                  event.stopPropagation();
                  event.preventDefault();

                  _this3.options.onClickHashtag(href, event);
                }

                if (_this3.options.onClickLink) {
                  event.stopPropagation();
                  event.preventDefault();

                  _this3.options.onClickLink(href, event);
                }

                return true;
              }

              return false;
            },
            click: function click(view, event) {
              if (!(event.target instanceof HTMLAnchorElement) || event.button !== 0) {
                return false;
              }

              if (event.target.matches(".component-attachment *")) {
                return false;
              } // Prevent all default click behavior of links, see mousedown above
              // for custom link handling.


              if (_this3.options.onClickLink) {
                event.stopPropagation();
                event.preventDefault();
              }

              return false;
            }
          }
        }
      });
      return [plugin];
    }
  }, {
    key: "toMarkdown",
    value: function toMarkdown() {
      return {
        open: function open(_state, mark, parent, index) {
          return isPlainURL(mark, parent, index, 1) ? "<" : "[";
        },
        close: function close(state, mark, parent, index) {
          return isPlainURL(mark, parent, index, -1) ? ">" : "](" + state.esc(mark.attrs.href) + (mark.attrs.title ? " " + state.quote(mark.attrs.title) : "") + ")";
        }
      };
    }
  }, {
    key: "parseMarkdown",
    value: function parseMarkdown() {
      return {
        mark: "link",
        getAttrs: function getAttrs(tok) {
          return {
            href: tok.attrGet("href"),
            title: tok.attrGet("title") || null
          };
        }
      };
    }
  }]);

  return Link;
}(_Mark2.default);

exports.default = Link;