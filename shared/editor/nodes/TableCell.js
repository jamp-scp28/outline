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

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.object.set-prototype-of.js");

require("core-js/modules/es.object.get-prototype-of.js");

var _prosemirrorState = require("prosemirror-state");

var _prosemirrorUtils = require("prosemirror-utils");

var _prosemirrorView = require("prosemirror-view");

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

var TableCell = /*#__PURE__*/function (_Node) {
  _inherits(TableCell, _Node);

  var _super = _createSuper(TableCell);

  function TableCell() {
    _classCallCheck(this, TableCell);

    return _super.apply(this, arguments);
  }

  _createClass(TableCell, [{
    key: "name",
    get: function get() {
      return "td";
    }
  }, {
    key: "schema",
    get: function get() {
      return {
        content: "paragraph+",
        tableRole: "cell",
        isolating: true,
        parseDOM: [{
          tag: "td"
        }],
        toDOM: function toDOM(node) {
          return ["td", node.attrs.alignment ? {
            style: "text-align: ".concat(node.attrs.alignment)
          } : {}, 0];
        },
        attrs: {
          colspan: {
            default: 1
          },
          rowspan: {
            default: 1
          },
          alignment: {
            default: null
          }
        }
      };
    }
  }, {
    key: "toMarkdown",
    value: function toMarkdown() {// see: renderTable
    }
  }, {
    key: "parseMarkdown",
    value: function parseMarkdown() {
      return {
        block: "td",
        getAttrs: function getAttrs(tok) {
          return {
            alignment: tok.info
          };
        }
      };
    }
  }, {
    key: "plugins",
    get: function get() {
      var _this = this;

      return [new _prosemirrorState.Plugin({
        props: {
          decorations: function decorations(state) {
            var doc = state.doc,
                selection = state.selection;
            var decorations = [];
            var cells = (0, _prosemirrorUtils.getCellsInColumn)(0)(selection);

            if (cells) {
              cells.forEach(function (_ref, index) {
                var pos = _ref.pos;

                if (index === 0) {
                  decorations.push(_prosemirrorView.Decoration.widget(pos + 1, function () {
                    var className = "grip-table";
                    var selected = (0, _prosemirrorUtils.isTableSelected)(selection);

                    if (selected) {
                      className += " selected";
                    }

                    var grip = document.createElement("a");
                    grip.className = className;
                    grip.addEventListener("mousedown", function (event) {
                      event.preventDefault();
                      event.stopImmediatePropagation();

                      _this.editor.view.dispatch((0, _prosemirrorUtils.selectTable)(state.tr));
                    });
                    return grip;
                  }));
                }

                decorations.push(_prosemirrorView.Decoration.widget(pos + 1, function () {
                  var rowSelected = (0, _prosemirrorUtils.isRowSelected)(index)(selection);
                  var className = "grip-row";

                  if (rowSelected) {
                    className += " selected";
                  }

                  if (index === 0) {
                    className += " first";
                  }

                  if (index === cells.length - 1) {
                    className += " last";
                  }

                  var grip = document.createElement("a");
                  grip.className = className;
                  grip.addEventListener("mousedown", function (event) {
                    event.preventDefault();
                    event.stopImmediatePropagation();

                    _this.editor.view.dispatch((0, _prosemirrorUtils.selectRow)(index)(state.tr));
                  });
                  return grip;
                }));
              });
            }

            return _prosemirrorView.DecorationSet.create(doc, decorations);
          }
        }
      })];
    }
  }]);

  return TableCell;
}(_Node2.default);

exports.default = TableCell;