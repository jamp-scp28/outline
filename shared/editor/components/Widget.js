"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.object.to-string.js");

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
exports.default = Widget;

var React = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function Widget(props) {
  return /*#__PURE__*/React.createElement(Wrapper, {
    className: props.isSelected ? "ProseMirror-selectednode widget" : "widget",
    href: props.href,
    target: "_blank",
    rel: "noreferrer nofollow"
  }, props.icon, /*#__PURE__*/React.createElement(Preview, null, /*#__PURE__*/React.createElement(Title, null, props.title), /*#__PURE__*/React.createElement(Subtitle, null, props.context), /*#__PURE__*/React.createElement(Children, null, props.children)));
}

var Children = _styledComponents.default.div.withConfig({
  displayName: "Widget__Children",
  componentId: "sc-1d23nsp-0"
})(["margin-left:auto;height:20px;opacity:0;&:hover{color:", ";}"], function (props) {
  return props.theme.text;
});

var Title = _styledComponents.default.strong.withConfig({
  displayName: "Widget__Title",
  componentId: "sc-1d23nsp-1"
})(["font-weight:500;font-size:14px;color:", ";"], function (props) {
  return props.theme.text;
});

var Preview = _styledComponents.default.div.withConfig({
  displayName: "Widget__Preview",
  componentId: "sc-1d23nsp-2"
})(["gap:8px;display:flex;flex-direction:row;flex-grow:1;align-items:center;color:", ";"], function (props) {
  return props.theme.textTertiary;
});

var Subtitle = _styledComponents.default.span.withConfig({
  displayName: "Widget__Subtitle",
  componentId: "sc-1d23nsp-3"
})(["font-size:13px;color:", " !important;line-height:0;"], function (props) {
  return props.theme.textTertiary;
});

var Wrapper = _styledComponents.default.a.withConfig({
  displayName: "Widget__Wrapper",
  componentId: "sc-1d23nsp-4"
})(["display:flex;align-items:center;gap:6px;background:", ";color:", " !important;box-shadow:0 0 0 1px ", ";white-space:nowrap;border-radius:8px;padding:6px 8px;max-width:840px;cursor:default;user-select:none;text-overflow:ellipsis;overflow:hidden;", ""], function (props) {
  return props.theme.background;
}, function (props) {
  return props.theme.text;
}, function (props) {
  return props.theme.divider;
}, function (props) {
  return props.href && (0, _styledComponents.css)(["&:hover,&:active{cursor:pointer !important;text-decoration:none !important;background:", ";", "{opacity:1;}}"], function (props) {
    return props.theme.secondaryBackground;
  }, Children);
});