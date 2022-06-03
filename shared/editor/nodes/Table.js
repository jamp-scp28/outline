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

require("core-js/modules/es.string.anchor.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.object.set-prototype-of.js");

require("core-js/modules/es.object.get-prototype-of.js");

var _prosemirrorState = require("prosemirror-state");

var _prosemirrorTables = require("prosemirror-tables");

var _prosemirrorUtils = require("prosemirror-utils");

var _prosemirrorView = require("prosemirror-view");

var _tables = _interopRequireDefault(require("../rules/tables"));

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

var Table = /*#__PURE__*/function (_Node) {
  _inherits(Table, _Node);

  var _super = _createSuper(Table);

  function Table() {
    _classCallCheck(this, Table);

    return _super.apply(this, arguments);
  }

  _createClass(Table, [{
    key: "name",
    get: function get() {
      return "table";
    }
  }, {
    key: "schema",
    get: function get() {
      return {
        content: "tr+",
        tableRole: "table",
        isolating: true,
        group: "block",
        parseDOM: [{
          tag: "table"
        }],
        toDOM: function toDOM() {
          return ["div", {
            class: "scrollable-wrapper"
          }, ["div", {
            class: "scrollable"
          }, ["table", {
            class: "rme-table"
          }, ["tbody", 0]]]];
        }
      };
    }
  }, {
    key: "rulePlugins",
    get: function get() {
      return [_tables.default];
    }
  }, {
    key: "commands",
    value: function commands(_ref) {
      var schema = _ref.schema;
      return {
        createTable: function createTable(_ref2) {
          var rowsCount = _ref2.rowsCount,
              colsCount = _ref2.colsCount;
          return function (state, dispatch) {
            var offset = state.tr.selection.anchor + 1;
            var nodes = (0, _prosemirrorUtils.createTable)(schema, rowsCount, colsCount);
            var tr = state.tr.replaceSelectionWith(nodes).scrollIntoView();
            var resolvedPos = tr.doc.resolve(offset);
            tr.setSelection(_prosemirrorState.TextSelection.near(resolvedPos));
            dispatch(tr);
            return true;
          };
        },
        setColumnAttr: function setColumnAttr(_ref3) {
          var index = _ref3.index,
              alignment = _ref3.alignment;
          return function (state, dispatch) {
            var cells = (0, _prosemirrorUtils.getCellsInColumn)(index)(state.selection) || [];
            var transaction = state.tr;
            cells.forEach(function (_ref4) {
              var pos = _ref4.pos;
              transaction = transaction.setNodeMarkup(pos, undefined, {
                alignment: alignment
              });
            });
            dispatch(transaction);
            return true;
          };
        },
        addColumnBefore: function addColumnBefore() {
          return _prosemirrorTables.addColumnBefore;
        },
        addColumnAfter: function addColumnAfter() {
          return _prosemirrorTables.addColumnAfter;
        },
        deleteColumn: function deleteColumn() {
          return _prosemirrorTables.deleteColumn;
        },
        addRowAfter: function addRowAfter(_ref5) {
          var index = _ref5.index;
          return function (state, dispatch) {
            if (index === 0) {
              // A little hack to avoid cloning the heading row by cloning the row
              // beneath and then moving it to the right index.
              var tr = (0, _prosemirrorUtils.addRowAt)(index + 2, true)(state.tr);
              dispatch((0, _prosemirrorUtils.moveRow)(index + 2, index + 1)(tr));
            } else {
              dispatch((0, _prosemirrorUtils.addRowAt)(index + 1, true)(state.tr));
            }

            return true;
          };
        },
        deleteRow: function deleteRow() {
          return _prosemirrorTables.deleteRow;
        },
        deleteTable: function deleteTable() {
          return _prosemirrorTables.deleteTable;
        },
        toggleHeaderColumn: function toggleHeaderColumn() {
          return _prosemirrorTables.toggleHeaderColumn;
        },
        toggleHeaderRow: function toggleHeaderRow() {
          return _prosemirrorTables.toggleHeaderRow;
        },
        toggleHeaderCell: function toggleHeaderCell() {
          return _prosemirrorTables.toggleHeaderCell;
        }
      };
    }
  }, {
    key: "keys",
    value: function keys() {
      return {
        Tab: (0, _prosemirrorTables.goToNextCell)(1),
        "Shift-Tab": (0, _prosemirrorTables.goToNextCell)(-1),
        Enter: function Enter(state, dispatch) {
          if (!(0, _prosemirrorTables.isInTable)(state)) {
            return false;
          } // TODO: Adding row at the end for now, can we find the current cell
          // row index and add the row below that?


          var cells = (0, _prosemirrorUtils.getCellsInColumn)(0)(state.selection) || [];
          dispatch((0, _prosemirrorUtils.addRowAt)(cells.length, true)(state.tr));
          return true;
        }
      };
    }
  }, {
    key: "toMarkdown",
    value: function toMarkdown(state, node) {
      state.renderTable(node);
      state.closeBlock(node);
    }
  }, {
    key: "parseMarkdown",
    value: function parseMarkdown() {
      return {
        block: "table"
      };
    }
  }, {
    key: "plugins",
    get: function get() {
      var _this = this;

      return [(0, _prosemirrorTables.tableEditing)(), new _prosemirrorState.Plugin({
        props: {
          decorations: function decorations(state) {
            var doc = state.doc;
            var decorations = [];
            var index = 0;
            doc.descendants(function (node, pos) {
              if (node.type.name !== _this.name) {
                return;
              }

              var elements = document.getElementsByClassName("rme-table");
              var table = elements[index];

              if (!table) {
                return;
              }

              var element = table.parentElement;
              var shadowRight = !!(element && element.scrollWidth > element.clientWidth);

              if (shadowRight) {
                decorations.push(_prosemirrorView.Decoration.widget(pos + 1, function () {
                  var shadow = document.createElement("div");
                  shadow.className = "scrollable-shadow right";
                  return shadow;
                }, {
                  key: "table-shadow-right"
                }));
              }

              index++;
            });
            return _prosemirrorView.DecorationSet.create(doc, decorations);
          }
        }
      })];
    }
  }]);

  return Table;
}(_Node2.default);

exports.default = Table;