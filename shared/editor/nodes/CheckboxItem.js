"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

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

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.object.set-prototype-of.js");

require("core-js/modules/es.object.get-prototype-of.js");

var _prosemirrorSchemaList = require("prosemirror-schema-list");

var _checkboxes = _interopRequireDefault(require("../rules/checkboxes"));

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

var CheckboxItem = /*#__PURE__*/function (_Node) {
  _inherits(CheckboxItem, _Node);

  var _super = _createSuper(CheckboxItem);

  function CheckboxItem() {
    var _temp, _this;

    _classCallCheck(this, CheckboxItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _super.call.apply(_super, [this].concat(args)), _this.handleClick = function (event) {
      if (!(event.target instanceof HTMLSpanElement)) {
        return;
      }

      var view = _this.editor.view;
      var tr = view.state.tr;

      var _event$target$getBoun = event.target.getBoundingClientRect(),
          top = _event$target$getBoun.top,
          left = _event$target$getBoun.left;

      var result = view.posAtCoords({
        top: top,
        left: left
      });

      if (result) {
        var transaction = tr.setNodeMarkup(result.inside, undefined, {
          checked: event.target.getAttribute("aria-checked") !== "true"
        });
        view.dispatch(transaction);
      }
    }, _temp));
  }

  _createClass(CheckboxItem, [{
    key: "name",
    get: function get() {
      return "checkbox_item";
    }
  }, {
    key: "schema",
    get: function get() {
      var _this2 = this;

      return {
        attrs: {
          checked: {
            default: false
          }
        },
        content: "paragraph block*",
        defining: true,
        draggable: true,
        parseDOM: [{
          tag: "li[data-type=\"".concat(this.name, "\"]"),
          getAttrs: function getAttrs(dom) {
            return {
              checked: dom.className.includes("checked")
            };
          }
        }],
        toDOM: function toDOM(node) {
          var input = document.createElement("span");
          input.tabIndex = -1;
          input.className = "checkbox";
          input.setAttribute("aria-checked", node.attrs.checked.toString());
          input.setAttribute("role", "checkbox");
          input.addEventListener("click", _this2.handleClick);
          return ["li", {
            "data-type": _this2.name,
            class: node.attrs.checked ? "checked" : undefined
          }, ["span", {
            contentEditable: "false"
          }, input], ["div", 0]];
        }
      };
    }
  }, {
    key: "rulePlugins",
    get: function get() {
      return [_checkboxes.default];
    }
  }, {
    key: "keys",
    value: function keys(_ref) {
      var type = _ref.type;
      return {
        Enter: (0, _prosemirrorSchemaList.splitListItem)(type),
        Tab: (0, _prosemirrorSchemaList.sinkListItem)(type),
        "Shift-Tab": (0, _prosemirrorSchemaList.liftListItem)(type),
        "Mod-]": (0, _prosemirrorSchemaList.sinkListItem)(type),
        "Mod-[": (0, _prosemirrorSchemaList.liftListItem)(type)
      };
    }
  }, {
    key: "toMarkdown",
    value: function toMarkdown(state, node) {
      state.write(node.attrs.checked ? "[x] " : "[ ] ");
      state.renderContent(node);
    }
  }, {
    key: "parseMarkdown",
    value: function parseMarkdown() {
      return {
        block: "checkbox_item",
        getAttrs: function getAttrs(tok) {
          return {
            checked: tok.attrGet("checked") ? true : undefined
          };
        }
      };
    }
  }]);

  return CheckboxItem;
}(_Node2.default);

exports.default = CheckboxItem;