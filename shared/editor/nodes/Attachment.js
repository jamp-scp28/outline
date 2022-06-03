"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

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

require("core-js/modules/es.parse-int.js");

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.object.set-prototype-of.js");

require("core-js/modules/es.object.get-prototype-of.js");

var _outlineIcons = require("outline-icons");

var React = _interopRequireWildcard(require("react"));

var _reactI18next = require("react-i18next");

var _files = require("../../utils/files");

var _toggleWrap = _interopRequireDefault(require("../commands/toggleWrap"));

var _FileExtension = _interopRequireDefault(require("../components/FileExtension"));

var _Widget = _interopRequireDefault(require("../components/Widget"));

var _attachments = _interopRequireDefault(require("../rules/attachments"));

var _Node2 = _interopRequireDefault(require("./Node"));

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

var Attachment = /*#__PURE__*/function (_Node) {
  _inherits(Attachment, _Node);

  var _super = _createSuper(Attachment);

  function Attachment() {
    _classCallCheck(this, Attachment);

    return _super.apply(this, arguments);
  }

  _createClass(Attachment, [{
    key: "name",
    get: function get() {
      return "attachment";
    }
  }, {
    key: "rulePlugins",
    get: function get() {
      return [_attachments.default];
    }
  }, {
    key: "schema",
    get: function get() {
      return {
        attrs: {
          id: {
            default: null
          },
          href: {
            default: null
          },
          title: {},
          size: {}
        },
        group: "block",
        defining: true,
        atom: true,
        parseDOM: [{
          priority: 100,
          tag: "a.attachment",
          getAttrs: function getAttrs(dom) {
            return {
              id: dom.id,
              title: dom.innerText,
              href: dom.getAttribute("href"),
              size: parseInt(dom.dataset.size || "0", 10)
            };
          }
        }],
        toDOM: function toDOM(node) {
          return ["a", {
            class: "attachment",
            id: node.attrs.id,
            href: node.attrs.href,
            download: node.attrs.title,
            "data-size": node.attrs.size
          }, node.attrs.title];
        },
        toPlainText: function toPlainText(node) {
          return node.attrs.title;
        }
      };
    }
  }, {
    key: "component",
    value: function component(_ref) {
      var isSelected = _ref.isSelected,
          theme = _ref.theme,
          node = _ref.node;
      return /*#__PURE__*/React.createElement(_Widget.default, {
        icon: /*#__PURE__*/React.createElement(_FileExtension.default, {
          title: node.attrs.title
        }),
        href: node.attrs.href,
        title: node.attrs.title,
        context: node.attrs.href ? (0, _files.bytesToHumanReadable)(node.attrs.size) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_reactI18next.Trans, null, "Uploading"), "\u2026"),
        isSelected: isSelected,
        theme: theme
      }, node.attrs.href && /*#__PURE__*/React.createElement(_outlineIcons.DownloadIcon, {
        color: "currentColor",
        size: 20
      }));
    }
  }, {
    key: "commands",
    value: function commands(_ref2) {
      var type = _ref2.type;
      return function (attrs) {
        return (0, _toggleWrap.default)(type, attrs);
      };
    }
  }, {
    key: "toMarkdown",
    value: function toMarkdown(state, node) {
      state.ensureNewLine();
      state.write("[".concat(node.attrs.title, " ").concat(node.attrs.size, "](").concat(node.attrs.href, ")\n\n"));
      state.ensureNewLine();
    }
  }, {
    key: "parseMarkdown",
    value: function parseMarkdown() {
      return {
        node: "attachment",
        getAttrs: function getAttrs(tok) {
          return {
            href: tok.attrGet("href"),
            title: tok.attrGet("title"),
            size: tok.attrGet("size")
          };
        }
      };
    }
  }]);

  return Attachment;
}(_Node2.default);

exports.default = Attachment;