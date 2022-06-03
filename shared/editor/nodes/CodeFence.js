"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es.object.set-prototype-of.js");

require("core-js/modules/es.object.get-prototype-of.js");

require("core-js/modules/es.reflect.construct.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.object.get-own-property-descriptors.js");

require("core-js/modules/es.weak-map.js");

require("core-js/modules/esnext.weak-map.delete-all.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.object.entries.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.string.search.js");

require("core-js/modules/es.string.repeat.js");

require("core-js/modules/es.function.name.js");

var _copyToClipboard = _interopRequireDefault(require("copy-to-clipboard"));

var _prosemirrorInputrules = require("prosemirror-inputrules");

var _prosemirrorState = require("prosemirror-state");

var _core = _interopRequireDefault(require("refractor/core"));

var _bash = _interopRequireDefault(require("refractor/lang/bash"));

var _clike = _interopRequireDefault(require("refractor/lang/clike"));

var _csharp = _interopRequireDefault(require("refractor/lang/csharp"));

var _css = _interopRequireDefault(require("refractor/lang/css"));

var _go = _interopRequireDefault(require("refractor/lang/go"));

var _java = _interopRequireDefault(require("refractor/lang/java"));

var _javascript = _interopRequireDefault(require("refractor/lang/javascript"));

var _json = _interopRequireDefault(require("refractor/lang/json"));

var _markup = _interopRequireDefault(require("refractor/lang/markup"));

var _objectivec = _interopRequireDefault(require("refractor/lang/objectivec"));

var _perl = _interopRequireDefault(require("refractor/lang/perl"));

var _php = _interopRequireDefault(require("refractor/lang/php"));

var _powershell = _interopRequireDefault(require("refractor/lang/powershell"));

var _python = _interopRequireDefault(require("refractor/lang/python"));

var _ruby = _interopRequireDefault(require("refractor/lang/ruby"));

var _rust = _interopRequireDefault(require("refractor/lang/rust"));

var _solidity = _interopRequireDefault(require("refractor/lang/solidity"));

var _sql = _interopRequireDefault(require("refractor/lang/sql"));

var _typescript = _interopRequireDefault(require("refractor/lang/typescript"));

var _yaml = _interopRequireDefault(require("refractor/lang/yaml"));

var _toggleBlockType = _interopRequireDefault(require("../commands/toggleBlockType"));

var _Prism = _interopRequireWildcard(require("../plugins/Prism"));

var _isInCode = _interopRequireDefault(require("../queries/isInCode"));

var _Node2 = _interopRequireDefault(require("./Node"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var PERSISTENCE_KEY = "rme-code-language";
var DEFAULT_LANGUAGE = "javascript";
[_bash.default, _css.default, _clike.default, _csharp.default, _go.default, _java.default, _javascript.default, _json.default, _markup.default, _objectivec.default, _perl.default, _php.default, _python.default, _powershell.default, _ruby.default, _rust.default, _sql.default, _solidity.default, _typescript.default, _yaml.default].forEach(_core.default.register);

var CodeFence = /*#__PURE__*/function (_Node) {
  _inherits(CodeFence, _Node);

  var _super = _createSuper(CodeFence);

  function CodeFence(options) {
    var _this;

    _classCallCheck(this, CodeFence);

    _this = _super.call(this, options);

    _this.handleCopyToClipboard = function (event) {
      var view = _this.editor.view;
      var element = event.target;

      if (!(element instanceof HTMLButtonElement)) {
        return;
      }

      var _element$getBoundingC = element.getBoundingClientRect(),
          top = _element$getBoundingC.top,
          left = _element$getBoundingC.left;

      var result = view.posAtCoords({
        top: top,
        left: left
      });

      if (result) {
        var node = view.state.doc.nodeAt(result.pos);

        if (node) {
          (0, _copyToClipboard.default)(node.textContent);

          _this.options.onShowToast(_this.options.dictionary.codeCopied);
        }
      }
    };

    _this.handleLanguageChange = function (event) {
      var view = _this.editor.view;
      var tr = view.state.tr;
      var element = event.currentTarget;

      if (!(element instanceof HTMLSelectElement)) {
        return;
      }

      var _element$getBoundingC2 = element.getBoundingClientRect(),
          top = _element$getBoundingC2.top,
          left = _element$getBoundingC2.left;

      var result = view.posAtCoords({
        top: top,
        left: left
      });

      if (result) {
        var _localStorage;

        var language = element.value;
        var transaction = tr.setSelection(_prosemirrorState.Selection.near(view.state.doc.resolve(result.inside))).setNodeMarkup(result.inside, undefined, {
          language: language
        });
        view.dispatch(transaction);
        (_localStorage = localStorage) === null || _localStorage === void 0 ? void 0 : _localStorage.setItem(PERSISTENCE_KEY, language);
      }
    };

    return _this;
  }

  _createClass(CodeFence, [{
    key: "languageOptions",
    get: function get() {
      return Object.entries(_Prism.LANGUAGES);
    }
  }, {
    key: "name",
    get: function get() {
      return "code_fence";
    }
  }, {
    key: "schema",
    get: function get() {
      var _this2 = this;

      return {
        attrs: {
          language: {
            default: DEFAULT_LANGUAGE
          }
        },
        content: "text*",
        marks: "",
        group: "block",
        code: true,
        defining: true,
        draggable: false,
        parseDOM: [{
          tag: "code"
        }, {
          tag: "pre",
          preserveWhitespace: "full"
        }, {
          tag: ".code-block",
          preserveWhitespace: "full",
          contentElement: "code",
          getAttrs: function getAttrs(dom) {
            return {
              language: dom.dataset.language
            };
          }
        }],
        toDOM: function toDOM(node) {
          var button = document.createElement("button");
          button.innerText = "Copy";
          button.type = "button";
          button.addEventListener("click", _this2.handleCopyToClipboard);
          var select = document.createElement("select");
          select.addEventListener("change", _this2.handleLanguageChange);
          var actions = document.createElement("div");
          actions.className = "code-actions";
          actions.appendChild(select);
          actions.appendChild(button);

          _this2.languageOptions.forEach(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                key = _ref2[0],
                label = _ref2[1];

            var option = document.createElement("option");
            var value = key === "none" ? "" : key;
            option.value = value;
            option.innerText = label;
            option.selected = node.attrs.language === value;
            select.appendChild(option);
          });

          return ["div", {
            class: "code-block",
            "data-language": node.attrs.language
          }, ["div", {
            contentEditable: "false"
          }, actions], ["pre", ["code", {
            spellCheck: "false"
          }, 0]]];
        }
      };
    }
  }, {
    key: "commands",
    value: function commands(_ref3) {
      var type = _ref3.type,
          schema = _ref3.schema;
      return function (attrs) {
        var _localStorage2;

        return (0, _toggleBlockType.default)(type, schema.nodes.paragraph, _objectSpread({
          language: ((_localStorage2 = localStorage) === null || _localStorage2 === void 0 ? void 0 : _localStorage2.getItem(PERSISTENCE_KEY)) || DEFAULT_LANGUAGE
        }, attrs));
      };
    }
  }, {
    key: "keys",
    value: function keys(_ref4) {
      var type = _ref4.type,
          schema = _ref4.schema;
      return {
        "Shift-Ctrl-\\": (0, _toggleBlockType.default)(type, schema.nodes.paragraph),
        "Shift-Enter": function ShiftEnter(state, dispatch) {
          var _selection$$anchor, _selection$$anchor$no;

          if (!(0, _isInCode.default)(state)) {
            return false;
          }

          var tr = state.tr,
              selection = state.selection;
          var text = selection === null || selection === void 0 ? void 0 : (_selection$$anchor = selection.$anchor) === null || _selection$$anchor === void 0 ? void 0 : (_selection$$anchor$no = _selection$$anchor.nodeBefore) === null || _selection$$anchor$no === void 0 ? void 0 : _selection$$anchor$no.text;
          var newText = "\n";

          if (text) {
            var splitByNewLine = text.split("\n");
            var numOfSpaces = splitByNewLine[splitByNewLine.length - 1].search(/\S|$/);
            newText += " ".repeat(numOfSpaces);
          }

          dispatch(tr.insertText(newText, selection.from, selection.to));
          return true;
        },
        Tab: function Tab(state, dispatch) {
          if (!(0, _isInCode.default)(state)) {
            return false;
          }

          var tr = state.tr,
              selection = state.selection;
          dispatch(tr.insertText("  ", selection.from, selection.to));
          return true;
        }
      };
    }
  }, {
    key: "plugins",
    get: function get() {
      return [(0, _Prism.default)({
        name: this.name
      })];
    }
  }, {
    key: "inputRules",
    value: function inputRules(_ref5) {
      var type = _ref5.type;
      return [(0, _prosemirrorInputrules.textblockTypeInputRule)(/^```$/, type)];
    }
  }, {
    key: "toMarkdown",
    value: function toMarkdown(state, node) {
      state.write("```" + (node.attrs.language || "") + "\n");
      state.text(node.textContent, false);
      state.ensureNewLine();
      state.write("```");
      state.closeBlock(node);
    }
  }, {
    key: "markdownToken",
    get: function get() {
      return "fence";
    }
  }, {
    key: "parseMarkdown",
    value: function parseMarkdown() {
      return {
        block: "code_block",
        getAttrs: function getAttrs(tok) {
          return {
            language: tok.info
          };
        }
      };
    }
  }]);

  return CodeFence;
}(_Node2.default);

exports.default = CodeFence;