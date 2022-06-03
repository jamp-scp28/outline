"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.reflect.construct.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.object.get-own-property-descriptors.js");

require("core-js/modules/es.weak-map.js");

require("core-js/modules/esnext.weak-map.delete-all.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.object.set-prototype-of.js");

require("core-js/modules/es.object.get-prototype-of.js");

var React = _interopRequireWildcard(require("react"));

var _DisabledEmbed = _interopRequireDefault(require("../components/DisabledEmbed"));

var _embeds = _interopRequireDefault(require("../rules/embeds"));

var _Node2 = _interopRequireDefault(require("./Node"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

var cache = {};

var Embed = /*#__PURE__*/function (_Node) {
  _inherits(Embed, _Node);

  var _super = _createSuper(Embed);

  function Embed() {
    _classCallCheck(this, Embed);

    return _super.apply(this, arguments);
  }

  _createClass(Embed, [{
    key: "name",
    get: function get() {
      return "embed";
    }
  }, {
    key: "schema",
    get: function get() {
      var _this = this;

      return {
        content: "inline*",
        group: "block",
        atom: true,
        attrs: {
          href: {}
        },
        parseDOM: [{
          tag: "iframe.embed",
          getAttrs: function getAttrs(dom) {
            var embeds = _this.editor.props.embeds;
            var href = dom.getAttribute("src") || "";

            if (embeds) {
              var _iterator = _createForOfIteratorHelper(embeds),
                  _step;

              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  var embed = _step.value;
                  var matches = embed.matcher(href);

                  if (matches) {
                    return {
                      href: href
                    };
                  }
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
            }

            return {};
          }
        }],
        toDOM: function toDOM(node) {
          return ["iframe", {
            class: "embed",
            src: node.attrs.href,
            contentEditable: "false"
          }, 0];
        },
        toPlainText: function toPlainText(node) {
          return node.attrs.href;
        }
      };
    }
  }, {
    key: "rulePlugins",
    get: function get() {
      return [(0, _embeds.default)(this.options.embeds)];
    }
  }, {
    key: "component",
    value: function component(_ref) {
      var isEditable = _ref.isEditable,
          isSelected = _ref.isSelected,
          theme = _ref.theme,
          node = _ref.node;
      var _this$editor$props = this.editor.props,
          embeds = _this$editor$props.embeds,
          embedsDisabled = _this$editor$props.embedsDisabled; // matches are cached in module state to avoid re running loops and regex
      // here. Unfortunately this function is not compatible with React.memo or
      // we would use that instead.

      var hit = cache[node.attrs.href];
      var Component = hit ? hit.Component : undefined;
      var matches = hit ? hit.matches : undefined;
      var embed = hit ? hit.embed : undefined;

      if (!Component) {
        var _iterator2 = _createForOfIteratorHelper(embeds),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var e = _step2.value;
            var m = e.matcher(node.attrs.href);

            if (m) {
              Component = e.component;
              matches = m;
              embed = e;
              cache[node.attrs.href] = {
                Component: Component,
                embed: embed,
                matches: matches
              };
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }

      if (!Component) {
        return null;
      }

      if (embedsDisabled) {
        return /*#__PURE__*/React.createElement(_DisabledEmbed.default, {
          attrs: {
            href: node.attrs.href,
            matches: matches
          },
          embed: embed,
          isEditable: isEditable,
          isSelected: isSelected,
          theme: theme
        });
      }

      return /*#__PURE__*/React.createElement(Component, {
        attrs: _objectSpread(_objectSpread({}, node.attrs), {}, {
          matches: matches
        }),
        isEditable: isEditable,
        isSelected: isSelected,
        theme: theme
      });
    }
  }, {
    key: "commands",
    value: function commands(_ref2) {
      var type = _ref2.type;
      return function (attrs) {
        return function (state, dispatch) {
          dispatch(state.tr.replaceSelectionWith(type.create(attrs)).scrollIntoView());
          return true;
        };
      };
    }
  }, {
    key: "toMarkdown",
    value: function toMarkdown(state, node) {
      state.ensureNewLine();
      state.write("[" + state.esc(node.attrs.href, false) + "](" + state.esc(node.attrs.href, false) + ")");
      state.write("\n\n");
    }
  }, {
    key: "parseMarkdown",
    value: function parseMarkdown() {
      return {
        node: "embed",
        getAttrs: function getAttrs(token) {
          return {
            href: token.attrGet("href")
          };
        }
      };
    }
  }]);

  return Embed;
}(_Node2.default);

exports.default = Embed;