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

var _prosemirrorInputrules = require("prosemirror-inputrules");

var _date = require("../../utils/date");

var _Extension2 = _interopRequireDefault(require("../lib/Extension"));

var _types = require("../types");

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

/**
 * An editor extension that adds commands to insert the current date and time.
 */
var DateTime = /*#__PURE__*/function (_Extension) {
  _inherits(DateTime, _Extension);

  var _super = _createSuper(DateTime);

  function DateTime() {
    _classCallCheck(this, DateTime);

    return _super.apply(this, arguments);
  }

  _createClass(DateTime, [{
    key: "name",
    get: function get() {
      return "date_time";
    }
  }, {
    key: "inputRules",
    value: function inputRules() {
      var _this = this;

      return [// Note: There is a space at the end of the pattern here otherwise the
      // /datetime rule can never be matched.
      // these extra input patterns are needed until the block menu matches
      // in places other than the start of a line
      new _prosemirrorInputrules.InputRule(/\/date\s$/, function (_ref, _match, start, end) {
        var tr = _ref.tr;
        tr.delete(start, end).insertText((0, _date.getCurrentDateAsString)() + " ");

        _this.editor.events.emit(_types.EventType.blockMenuClose);

        return tr;
      }), new _prosemirrorInputrules.InputRule(/\/time\s$/, function (_ref2, _match, start, end) {
        var tr = _ref2.tr;
        tr.delete(start, end).insertText((0, _date.getCurrentTimeAsString)() + " ");

        _this.editor.events.emit(_types.EventType.blockMenuClose);

        return tr;
      }), new _prosemirrorInputrules.InputRule(/\/datetime\s$/, function (_ref3, _match, start, end) {
        var tr = _ref3.tr;
        tr.delete(start, end).insertText("".concat((0, _date.getCurrentDateTimeAsString)(), " "));

        _this.editor.events.emit(_types.EventType.blockMenuClose);

        return tr;
      })];
    }
  }, {
    key: "commands",
    value: function commands(_options) {
      return {
        date: function date() {
          return function (state, dispatch) {
            dispatch(state.tr.insertText((0, _date.getCurrentDateAsString)() + " "));
            return true;
          };
        },
        time: function time() {
          return function (state, dispatch) {
            dispatch(state.tr.insertText((0, _date.getCurrentTimeAsString)() + " "));
            return true;
          };
        },
        datetime: function datetime() {
          return function (state, dispatch) {
            dispatch(state.tr.insertText((0, _date.getCurrentDateTimeAsString)() + " "));
            return true;
          };
        }
      };
    }
  }]);

  return DateTime;
}(_Extension2.default);

exports.default = DateTime;