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

require("core-js/modules/es.array.from.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.array.find.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.object.set-prototype-of.js");

require("core-js/modules/es.object.get-prototype-of.js");

var _prosemirrorSchemaList = require("prosemirror-schema-list");

var _prosemirrorState = require("prosemirror-state");

var _prosemirrorUtils = require("prosemirror-utils");

var _prosemirrorView = require("prosemirror-view");

var _getParentListItem = _interopRequireDefault(require("../queries/getParentListItem"));

var _isInList = _interopRequireDefault(require("../queries/isInList"));

var _isList = _interopRequireDefault(require("../queries/isList"));

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

var ListItem = /*#__PURE__*/function (_Node) {
  _inherits(ListItem, _Node);

  var _super = _createSuper(ListItem);

  function ListItem() {
    _classCallCheck(this, ListItem);

    return _super.apply(this, arguments);
  }

  _createClass(ListItem, [{
    key: "name",
    get: function get() {
      return "list_item";
    }
  }, {
    key: "schema",
    get: function get() {
      return {
        content: "paragraph block*",
        defining: true,
        draggable: true,
        parseDOM: [{
          tag: "li"
        }],
        toDOM: function toDOM() {
          return ["li", 0];
        }
      };
    }
  }, {
    key: "plugins",
    get: function get() {
      var _this = this;

      return [new _prosemirrorState.Plugin({
        state: {
          init: function init() {
            return _prosemirrorView.DecorationSet.empty;
          },
          apply: function apply(tr, set, oldState, newState) {
            var action = tr.getMeta("li");

            if (!action && !tr.docChanged) {
              return set;
            } // Adjust decoration positions to changes made by the transaction


            set = set.map(tr.mapping, tr.doc);

            switch (action === null || action === void 0 ? void 0 : action.event) {
              case "mouseover":
                {
                  var result = (0, _prosemirrorUtils.findParentNodeClosestToPos)(newState.doc.resolve(action.pos), function (node) {
                    return node.type.name === _this.name || node.type.name === "checkbox_item";
                  });

                  if (!result) {
                    return set;
                  }

                  var list = (0, _prosemirrorUtils.findParentNodeClosestToPos)(newState.doc.resolve(action.pos), function (node) {
                    return (0, _isList.default)(node, _this.editor.schema);
                  });

                  if (!list) {
                    return set;
                  }

                  var start = list.node.attrs.order || 1;
                  var listItemNumber = 0;
                  list.node.content.forEach(function (li, _, index) {
                    if (li === result.node) {
                      listItemNumber = index;
                    }
                  });
                  var counterLength = String(start + listItemNumber).length;
                  return set.add(tr.doc, [_prosemirrorView.Decoration.node(result.pos, result.pos + result.node.nodeSize, {
                    class: "hovering"
                  }, {
                    hover: true
                  }), _prosemirrorView.Decoration.node(result.pos, result.pos + result.node.nodeSize, {
                    class: "counter-".concat(counterLength)
                  })]);
                }

              case "mouseout":
                {
                  var _result = (0, _prosemirrorUtils.findParentNodeClosestToPos)(newState.doc.resolve(action.pos), function (node) {
                    return node.type.name === _this.name || node.type.name === "checkbox_item";
                  });

                  if (!_result) {
                    return set;
                  }

                  return set.remove(set.find(_result.pos, _result.pos + _result.node.nodeSize, function (spec) {
                    return spec.hover;
                  }));
                }

              default:
            }

            return set;
          }
        },
        props: {
          decorations: function decorations(state) {
            return this.getState(state);
          },
          handleDOMEvents: {
            mouseover: function mouseover(view, event) {
              var state = view.state,
                  dispatch = view.dispatch;
              var target = event.target;
              var li = target === null || target === void 0 ? void 0 : target.closest("li");

              if (!li) {
                return false;
              }

              if (!view.dom.contains(li)) {
                return false;
              }

              var pos = view.posAtDOM(li, 0);

              if (!pos) {
                return false;
              }

              dispatch(state.tr.setMeta("li", {
                event: "mouseover",
                pos: pos
              }));
              return false;
            },
            mouseout: function mouseout(view, event) {
              var state = view.state,
                  dispatch = view.dispatch;
              var target = event.target;
              var li = target === null || target === void 0 ? void 0 : target.closest("li");

              if (!li) {
                return false;
              }

              if (!view.dom.contains(li)) {
                return false;
              }

              var pos = view.posAtDOM(li, 0);

              if (!pos) {
                return false;
              }

              dispatch(state.tr.setMeta("li", {
                event: "mouseout",
                pos: pos
              }));
              return false;
            }
          }
        }
      })];
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
        "Mod-[": (0, _prosemirrorSchemaList.liftListItem)(type),
        "Shift-Enter": function ShiftEnter(state, dispatch) {
          if (!(0, _isInList.default)(state)) {
            return false;
          }

          if (!state.selection.empty) {
            return false;
          }

          var tr = state.tr,
              selection = state.selection;
          dispatch(tr.split(selection.to));
          return true;
        },
        "Alt-ArrowUp": function AltArrowUp(state, dispatch) {
          if (!state.selection.empty) {
            return false;
          }

          var result = (0, _getParentListItem.default)(state);

          if (!result) {
            return false;
          }

          var _result2 = _slicedToArray(result, 2),
              li = _result2[0],
              pos = _result2[1];

          var $pos = state.doc.resolve(pos);

          if (!$pos.nodeBefore || !["list_item", "checkbox_item"].includes($pos.nodeBefore.type.name)) {
            console.log("Node before not a list item");
            return false;
          }

          var tr = state.tr;
          var newPos = pos - $pos.nodeBefore.nodeSize;
          dispatch(tr.delete(pos, pos + li.nodeSize).insert(newPos, li).setSelection(_prosemirrorState.TextSelection.near(tr.doc.resolve(newPos))));
          return true;
        },
        "Alt-ArrowDown": function AltArrowDown(state, dispatch) {
          if (!state.selection.empty) {
            return false;
          }

          var result = (0, _getParentListItem.default)(state);

          if (!result) {
            return false;
          }

          var _result3 = _slicedToArray(result, 2),
              li = _result3[0],
              pos = _result3[1];

          var $pos = state.doc.resolve(pos + li.nodeSize);

          if (!$pos.nodeAfter || !["list_item", "checkbox_item"].includes($pos.nodeAfter.type.name)) {
            console.log("Node after not a list item");
            return false;
          }

          var tr = state.tr;
          var newPos = pos + li.nodeSize + $pos.nodeAfter.nodeSize;
          dispatch(tr.insert(newPos, li).setSelection(_prosemirrorState.TextSelection.near(tr.doc.resolve(newPos))).delete(pos, pos + li.nodeSize));
          return true;
        }
      };
    }
  }, {
    key: "toMarkdown",
    value: function toMarkdown(state, node) {
      state.renderContent(node);
    }
  }, {
    key: "parseMarkdown",
    value: function parseMarkdown() {
      return {
        block: "list_item"
      };
    }
  }]);

  return ListItem;
}(_Node2.default);

exports.default = ListItem;