"use strict";

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.object.get-own-property-descriptors.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lightMobile = exports.light = exports.default = exports.darkMobile = exports.dark = exports.base = void 0;

var _polished = require("polished");

var _breakpoints = _interopRequireDefault(require("./breakpoints"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var colors = {
  transparent: "transparent",
  almostBlack: "#111319",
  lightBlack: "#2F3336",
  almostWhite: "#E6E6E6",
  veryDarkBlue: "#08090C",
  slate: "#9BA6B2",
  slateLight: "#DAE1E9",
  slateDark: "#394351",
  smoke: "#F4F7FA",
  smokeLight: "#F9FBFC",
  smokeDark: "#E8EBED",
  white: "#FFF",
  white05: "rgba(255, 255, 255, 0.05)",
  white10: "rgba(255, 255, 255, 0.1)",
  white50: "rgba(255, 255, 255, 0.5)",
  white75: "rgba(255, 255, 255, 0.75)",
  black: "#000",
  black05: "rgba(0, 0, 0, 0.05)",
  black10: "rgba(0, 0, 0, 0.1)",
  black50: "rgba(0, 0, 0, 0.50)",
  primary: "#0366d6",
  yellow: "#EDBA07",
  warmGrey: "#EDF2F7",
  searchHighlight: "#FDEA9B",
  danger: "#ff476f",
  warning: "#f08a24",
  success: "#2f3336",
  info: "#a0d3e8",
  brand: {
    red: "#FF5C80",
    pink: "#FF4DFA",
    purple: "#9E5CF7",
    blue: "#3633FF",
    marine: "#2BC2FF",
    green: "#42DED1",
    yellow: "#F5BE31"
  }
};
var spacing = {
  padding: "1.5vw 1.875vw",
  vpadding: "1.5vw",
  hpadding: "1.875vw",
  sidebarWidth: 260,
  sidebarCollapsedWidth: 16,
  sidebarMinWidth: 200,
  sidebarMaxWidth: 400
};

var base = _objectSpread(_objectSpread(_objectSpread({}, colors), spacing), {}, {
  fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen, Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif",
  fontFamilyMono: "'SFMono-Regular',Consolas,'Liberation Mono', Menlo, Courier,monospace",
  fontWeight: 400,
  backgroundTransition: "background 100ms ease-in-out",
  selected: colors.primary,
  buttonBackground: colors.primary,
  buttonText: colors.white,
  textHighlight: "#FDEA9B",
  textHighlightForeground: colors.almostBlack,
  code: colors.lightBlack,
  codeComment: "#6a737d",
  codePunctuation: "#5e6687",
  codeNumber: "#d73a49",
  codeProperty: "#c08b30",
  codeTag: "#3d8fd1",
  codeString: "#032f62",
  codeSelector: "#6679cc",
  codeAttr: "#c76b29",
  codeEntity: "#22a2c9",
  codeKeyword: "#d73a49",
  codeFunction: "#6f42c1",
  codeStatement: "#22a2c9",
  codePlaceholder: "#3d8fd1",
  codeInserted: "#202746",
  codeImportant: "#c94922",
  noticeInfoBackground: colors.primary,
  noticeInfoText: colors.almostBlack,
  noticeTipBackground: "#F5BE31",
  noticeTipText: colors.almostBlack,
  noticeWarningBackground: "#d73a49",
  noticeWarningText: colors.almostBlack,
  breakpoints: _breakpoints.default
});

exports.base = base;

var light = _objectSpread(_objectSpread({}, base), {}, {
  isDark: false,
  background: colors.white,
  secondaryBackground: colors.warmGrey,
  link: colors.primary,
  cursor: colors.almostBlack,
  text: colors.almostBlack,
  textSecondary: colors.slateDark,
  textTertiary: colors.slate,
  placeholder: "#a2b2c3",
  sidebarBackground: colors.warmGrey,
  sidebarActiveBackground: "#d7e0ea",
  sidebarControlHoverBackground: "rgb(138 164 193 / 20%)",
  sidebarDraftBorder: (0, _polished.darken)("0.25", colors.warmGrey),
  sidebarText: "rgb(78, 92, 110)",
  backdrop: "rgba(0, 0, 0, 0.2)",
  shadow: "rgba(0, 0, 0, 0.2)",
  modalBackdrop: colors.black10,
  modalBackground: colors.white,
  modalShadow: "0 4px 8px rgb(0 0 0 / 8%), 0 2px 4px rgb(0 0 0 / 0%), 0 30px 40px rgb(0 0 0 / 8%)",
  menuItemSelected: colors.warmGrey,
  menuBackground: colors.white,
  menuShadow: "0 0 0 1px rgb(0 0 0 / 2%), 0 4px 8px rgb(0 0 0 / 8%), 0 2px 4px rgb(0 0 0 / 0%), 0 30px 40px rgb(0 0 0 / 8%)",
  divider: colors.slateLight,
  titleBarDivider: colors.slateLight,
  inputBorder: colors.slateLight,
  inputBorderFocused: colors.slate,
  listItemHoverBackground: colors.warmGrey,
  toolbarHoverBackground: colors.black,
  toolbarBackground: colors.almostBlack,
  toolbarInput: colors.white10,
  toolbarItem: colors.white,
  tableDivider: colors.smokeDark,
  tableSelected: colors.primary,
  tableSelectedBackground: "#E5F7FF",
  tableHeaderBackground: colors.white,
  buttonNeutralBackground: colors.white,
  buttonNeutralText: colors.almostBlack,
  buttonNeutralBorder: (0, _polished.darken)(0.15, colors.white),
  tooltipBackground: colors.almostBlack,
  tooltipText: colors.white,
  toastBackground: colors.almostBlack,
  toastText: colors.white,
  quote: colors.slateLight,
  codeBackground: colors.smoke,
  codeBorder: colors.smokeDark,
  embedBorder: colors.slateLight,
  horizontalRule: colors.smokeDark,
  progressBarBackground: colors.slateLight,
  scrollbarBackground: colors.smoke,
  scrollbarThumb: (0, _polished.darken)(0.15, colors.smokeDark)
});

exports.light = light;

var dark = _objectSpread(_objectSpread({}, base), {}, {
  isDark: true,
  background: colors.almostBlack,
  secondaryBackground: colors.black50,
  link: "#137FFB",
  text: colors.almostWhite,
  cursor: colors.almostWhite,
  textSecondary: (0, _polished.lighten)(0.1, colors.slate),
  textTertiary: colors.slate,
  placeholder: colors.slateDark,
  sidebarBackground: colors.veryDarkBlue,
  sidebarActiveBackground: (0, _polished.lighten)(0.02, colors.almostBlack),
  sidebarControlHoverBackground: colors.white10,
  sidebarDraftBorder: (0, _polished.darken)("0.35", colors.slate),
  sidebarText: colors.slate,
  backdrop: "rgba(255, 255, 255, 0.3)",
  shadow: "rgba(0, 0, 0, 0.6)",
  modalBackdrop: colors.black50,
  modalBackground: "#1f2128",
  modalShadow: "0 0 0 1px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.08)",
  menuItemSelected: (0, _polished.lighten)(0.1, "#1f2128"),
  menuBackground: "#1f2128",
  menuShadow: "0 0 0 1px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.08)",
  divider: (0, _polished.lighten)(0.1, colors.almostBlack),
  titleBarDivider: (0, _polished.darken)(0.4, colors.slate),
  inputBorder: colors.slateDark,
  inputBorderFocused: colors.slate,
  listItemHoverBackground: colors.white10,
  toolbarHoverBackground: colors.slate,
  toolbarBackground: colors.white,
  toolbarInput: colors.black10,
  toolbarItem: colors.lightBlack,
  tableDivider: colors.lightBlack,
  tableSelected: colors.primary,
  tableSelectedBackground: "#002333",
  tableHeaderBackground: colors.almostBlack,
  buttonNeutralBackground: colors.almostBlack,
  buttonNeutralText: colors.white,
  buttonNeutralBorder: colors.slateDark,
  tooltipBackground: colors.white,
  tooltipText: colors.lightBlack,
  toastBackground: colors.white,
  toastText: colors.lightBlack,
  quote: colors.almostWhite,
  code: colors.almostWhite,
  codeBackground: colors.black,
  codeBorder: colors.black50,
  codeString: "#3d8fd1",
  embedBorder: colors.black50,
  horizontalRule: (0, _polished.lighten)(0.1, colors.almostBlack),
  noticeInfoText: colors.white,
  noticeTipText: colors.white,
  noticeWarningText: colors.white,
  progressBarBackground: colors.slate,
  scrollbarBackground: colors.black,
  scrollbarThumb: colors.lightBlack
});

exports.dark = dark;
var lightMobile = light;
exports.lightMobile = lightMobile;

var darkMobile = _objectSpread(_objectSpread({}, dark), {}, {
  background: colors.black,
  codeBackground: colors.almostBlack
});

exports.darkMobile = darkMobile;
var _default = light;
exports.default = _default;