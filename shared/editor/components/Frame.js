"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.array.reduce.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.object.set-prototype-of.js");

require("core-js/modules/es.object.get-prototype-of.js");

require("core-js/modules/es.reflect.construct.js");

require("core-js/modules/es.object.assign.js");

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

require("core-js/modules/es.array.concat.js");

require("core-js/modules/web.immediate.js");

var _mobx = require("mobx");

var _mobxReact = require("mobx-react");

var _outlineIcons = require("outline-icons");

var React = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _class, _class2, _descriptor;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

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

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var Frame = (0, _mobxReact.observer)(_class = (_class2 = /*#__PURE__*/function (_React$Component) {
  _inherits(Frame, _React$Component);

  var _super = _createSuper(Frame);

  function Frame() {
    var _temp, _this;

    _classCallCheck(this, Frame);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _super.call.apply(_super, [this].concat(args)), _initializerDefineProperty(_this, "isLoaded", _descriptor, _assertThisInitialized(_this)), _this.loadIframe = function () {
      if (!_this.mounted) {
        return;
      }

      _this.isLoaded = true;
    }, _temp));
  }

  _createClass(Frame, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.mounted = true;
      setImmediate(this.loadIframe);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.mounted = false;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          border = _this$props.border,
          _this$props$width = _this$props.width,
          width = _this$props$width === void 0 ? "100%" : _this$props$width,
          _this$props$height = _this$props.height,
          height = _this$props$height === void 0 ? "400px" : _this$props$height,
          forwardedRef = _this$props.forwardedRef,
          icon = _this$props.icon,
          title = _this$props.title,
          canonicalUrl = _this$props.canonicalUrl,
          isSelected = _this$props.isSelected,
          referrerPolicy = _this$props.referrerPolicy,
          src = _this$props.src;
      var withBar = !!(icon || canonicalUrl);
      return /*#__PURE__*/React.createElement(Rounded, {
        width: width,
        height: height,
        $withBar: withBar,
        $border: border,
        className: isSelected ? "ProseMirror-selectednode" : ""
      }, this.isLoaded && /*#__PURE__*/React.createElement(Iframe, {
        ref: forwardedRef,
        $withBar: withBar,
        sandbox: "allow-same-origin allow-scripts allow-popups allow-forms allow-downloads",
        width: width,
        height: height,
        frameBorder: "0",
        title: "embed",
        loading: "lazy",
        src: src,
        referrerPolicy: referrerPolicy,
        allowFullScreen: true
      }), withBar && /*#__PURE__*/React.createElement(Bar, null, icon, " ", /*#__PURE__*/React.createElement(Title, null, title), canonicalUrl && /*#__PURE__*/React.createElement(Open, {
        href: canonicalUrl,
        target: "_blank",
        rel: "noopener noreferrer"
      }, /*#__PURE__*/React.createElement(_outlineIcons.OpenIcon, {
        color: "currentColor",
        size: 18
      }), " Open")));
    }
  }]);

  return Frame;
}(React.Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "isLoaded", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
})), _class2)) || _class;

var Iframe = _styledComponents.default.iframe.withConfig({
  displayName: "Frame__Iframe",
  componentId: "sc-1gbf3fk-0"
})(["border-radius:", ";display:block;"], function (props) {
  return props.$withBar ? "3px 3px 0 0" : "3px";
});

var Rounded = _styledComponents.default.div.withConfig({
  displayName: "Frame__Rounded",
  componentId: "sc-1gbf3fk-1"
})(["border:1px solid ", ";border-radius:6px;overflow:hidden;width:", ";height:", ";"], function (props) {
  return props.$border ? props.theme.embedBorder : "transparent";
}, function (props) {
  return props.width;
}, function (props) {
  return props.$withBar ? props.height + 28 : props.height;
});

var Open = _styledComponents.default.a.withConfig({
  displayName: "Frame__Open",
  componentId: "sc-1gbf3fk-2"
})(["color:", " !important;font-size:13px;font-weight:500;align-items:center;display:flex;position:absolute;right:0;padding:0 8px;"], function (props) {
  return props.theme.textSecondary;
});

var Title = _styledComponents.default.span.withConfig({
  displayName: "Frame__Title",
  componentId: "sc-1gbf3fk-3"
})(["font-size:13px;font-weight:500;padding-left:4px;"]);

var Bar = _styledComponents.default.div.withConfig({
  displayName: "Frame__Bar",
  componentId: "sc-1gbf3fk-4"
})(["display:flex;align-items:center;border-top:1px solid ", ";background:", ";color:", ";padding:0 8px;border-bottom-left-radius:6px;border-bottom-right-radius:6px;user-select:none;"], function (props) {
  return props.theme.embedBorder;
}, function (props) {
  return props.theme.secondaryBackground;
}, function (props) {
  return props.theme.textSecondary;
});

var _default = /*#__PURE__*/React.forwardRef(function (props, ref) {
  return /*#__PURE__*/React.createElement(Frame, _extends({}, props, {
    forwardedRef: ref
  }));
});

exports.default = _default;