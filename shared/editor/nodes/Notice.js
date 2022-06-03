"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es.reflect.construct.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.weak-map.js");

require("core-js/modules/esnext.weak-map.delete-all.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.object.entries.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.object.set-prototype-of.js");

require("core-js/modules/es.object.get-prototype-of.js");

var _outlineIcons = require("outline-icons");

var _prosemirrorInputrules = require("prosemirror-inputrules");

var React = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _toggleWrap = _interopRequireDefault(require("../commands/toggleWrap"));

var _notices = _interopRequireDefault(require("../rules/notices"));

var _Node2 = _interopRequireDefault(require("./Node"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var Notice = /*#__PURE__*/function (_Node) {
  _inherits(Notice, _Node);

  var _super = _createSuper(Notice);

  function Notice() {
    var _temp, _this;

    _classCallCheck(this, Notice);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _super.call.apply(_super, [this].concat(args)), _this.handleStyleChange = function (event) {
      var view = _this.editor.view;
      var tr = view.state.tr;
      var element = event.target;

      if (!(element instanceof HTMLSelectElement)) {
        return;
      }

      var _element$getBoundingC = element.getBoundingClientRect(),
          top = _element$getBoundingC.top,
          left = _element$getBoundingC.left;

      var result = view.posAtCoords({
        top: top,
        left: left
      });

      if (result) {
        var transaction = tr.setNodeMarkup(result.inside, undefined, {
          style: element.value
        });
        view.dispatch(transaction);
      }
    }, _temp));
  }

  _createClass(Notice, [{
    key: "styleOptions",
    get: function get() {
      return Object.entries({
        info: this.options.dictionary.info,
        warning: this.options.dictionary.warning,
        tip: this.options.dictionary.tip
      });
    }
  }, {
    key: "name",
    get: function get() {
      return "container_notice";
    }
  }, {
    key: "rulePlugins",
    get: function get() {
      return [_notices.default];
    }
  }, {
    key: "schema",
    get: function get() {
      var _this2 = this;

      return {
        attrs: {
          style: {
            default: "info"
          }
        },
        content: "block+",
        group: "block",
        defining: true,
        draggable: true,
        parseDOM: [{
          tag: "div.notice-block",
          preserveWhitespace: "full",
          contentElement: "div.content",
          getAttrs: function getAttrs(dom) {
            return {
              style: dom.className.includes("tip") ? "tip" : dom.className.includes("warning") ? "warning" : undefined
            };
          }
        }],
        toDOM: function toDOM(node) {
          var select = document.createElement("select");
          select.addEventListener("change", _this2.handleStyleChange);

          _this2.styleOptions.forEach(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                key = _ref2[0],
                label = _ref2[1];

            var option = document.createElement("option");
            option.value = key;
            option.innerText = label;
            option.selected = node.attrs.style === key;
            select.appendChild(option);
          });

          var actions = document.createElement("div");
          actions.className = "notice-actions";
          actions.appendChild(select);
          var component;

          if (node.attrs.style === "tip") {
            component = /*#__PURE__*/React.createElement(_outlineIcons.StarredIcon, {
              color: "currentColor"
            });
          } else if (node.attrs.style === "warning") {
            component = /*#__PURE__*/React.createElement(_outlineIcons.WarningIcon, {
              color: "currentColor"
            });
          } else {
            component = /*#__PURE__*/React.createElement(_outlineIcons.InfoIcon, {
              color: "currentColor"
            });
          }

          var icon = document.createElement("div");
          icon.className = "icon";

          _reactDom.default.render(component, icon);

          return ["div", {
            class: "notice-block ".concat(node.attrs.style)
          }, icon, ["div", {
            contentEditable: "false"
          }, actions], ["div", {
            class: "content"
          }, 0]];
        }
      };
    }
  }, {
    key: "commands",
    value: function commands(_ref3) {
      var type = _ref3.type;
      return function (attrs) {
        return (0, _toggleWrap.default)(type, attrs);
      };
    }
  }, {
    key: "inputRules",
    value: function inputRules(_ref4) {
      var type = _ref4.type;
      return [(0, _prosemirrorInputrules.wrappingInputRule)(/^:::$/, type)];
    }
  }, {
    key: "toMarkdown",
    value: function toMarkdown(state, node) {
      state.write("\n:::" + (node.attrs.style || "info") + "\n");
      state.renderContent(node);
      state.ensureNewLine();
      state.write(":::");
      state.closeBlock(node);
    }
  }, {
    key: "parseMarkdown",
    value: function parseMarkdown() {
      return {
        block: "container_notice",
        getAttrs: function getAttrs(tok) {
          return {
            style: tok.info
          };
        }
      };
    }
  }]);

  return Notice;
}(_Node2.default);

exports.default = Notice;