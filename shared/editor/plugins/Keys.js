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

require("core-js/modules/es.object.set-prototype-of.js");

require("core-js/modules/es.object.get-prototype-of.js");

var _prosemirrorGapcursor = require("prosemirror-gapcursor");

var _prosemirrorState = require("prosemirror-state");

var _Extension2 = _interopRequireDefault(require("../lib/Extension"));

var _isInCode = _interopRequireDefault(require("../queries/isInCode"));

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

var Keys = /*#__PURE__*/function (_Extension) {
  _inherits(Keys, _Extension);

  var _super = _createSuper(Keys);

  function Keys() {
    _classCallCheck(this, Keys);

    return _super.apply(this, arguments);
  }

  _createClass(Keys, [{
    key: "name",
    get: function get() {
      return "keys";
    }
  }, {
    key: "keys",
    value: function keys() {
      var _this = this;

      var onCancel = function onCancel() {
        if (_this.editor.props.onCancel) {
          _this.editor.props.onCancel();

          return true;
        }

        return false;
      };

      return {
        // No-ops prevent Tab escaping the editor bounds
        Tab: function Tab() {
          return true;
        },
        "Shift-Tab": function ShiftTab() {
          return true;
        },
        // Shortcuts for when editor has separate edit mode
        "Mod-Escape": onCancel,
        "Shift-Escape": onCancel,
        "Mod-s": function ModS() {
          if (_this.editor.props.onSave) {
            _this.editor.props.onSave({
              done: false
            });

            return true;
          }

          return false;
        },
        "Mod-Enter": function ModEnter(state) {
          if (!(0, _isInCode.default)(state) && _this.editor.props.onSave) {
            _this.editor.props.onSave({
              done: true
            });

            return true;
          }

          return false;
        }
      };
    }
  }, {
    key: "plugins",
    get: function get() {
      return [new _prosemirrorState.Plugin({
        props: {
          // we can't use the keys bindings for this as we want to preventDefault
          // on the original keyboard event when handled
          handleKeyDown: function handleKeyDown(view, event) {
            if (view.state.selection instanceof _prosemirrorState.AllSelection) {
              if (event.key === "ArrowUp") {
                var selection = _prosemirrorState.Selection.atStart(view.state.doc);

                view.dispatch(view.state.tr.setSelection(selection));
                return true;
              }

              if (event.key === "ArrowDown") {
                var _selection = _prosemirrorState.Selection.atEnd(view.state.doc);

                view.dispatch(view.state.tr.setSelection(_selection));
                return true;
              }
            } // edge case where horizontal gap cursor does nothing if Enter key
            // is pressed. Insert a newline and then move the cursor into it.


            if (view.state.selection instanceof _prosemirrorGapcursor.GapCursor) {
              if (event.key === "Enter") {
                view.dispatch(view.state.tr.insert(view.state.selection.from, view.state.schema.nodes.paragraph.create({})));
                view.dispatch(view.state.tr.setSelection(_prosemirrorState.TextSelection.near(view.state.doc.resolve(view.state.selection.from), -1)));
                return true;
              }
            }

            return false;
          }
        }
      })];
    }
  }]);

  return Keys;
}(_Extension2.default);

exports.default = Keys;