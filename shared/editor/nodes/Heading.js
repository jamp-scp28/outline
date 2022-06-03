"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es.reflect.construct.js");

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.object.get-own-property-descriptors.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.weak-map.js");

require("core-js/modules/esnext.weak-map.delete-all.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.string.repeat.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.array.reduce.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.regexp.constructor.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.object.set-prototype-of.js");

require("core-js/modules/es.object.get-prototype-of.js");

var _copyToClipboard = _interopRequireDefault(require("copy-to-clipboard"));

var _prosemirrorInputrules = require("prosemirror-inputrules");

var _prosemirrorState = require("prosemirror-state");

var _prosemirrorView = require("prosemirror-view");

var _backspaceToParagraph = _interopRequireDefault(require("../commands/backspaceToParagraph"));

var _splitHeading = _interopRequireDefault(require("../commands/splitHeading"));

var _toggleBlockType = _interopRequireDefault(require("../commands/toggleBlockType"));

var _headingToSlug = _interopRequireWildcard(require("../lib/headingToSlug"));

var _Node2 = _interopRequireDefault(require("./Node"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var Heading = /*#__PURE__*/function (_Node) {
  _inherits(Heading, _Node);

  var _super = _createSuper(Heading);

  function Heading() {
    var _temp, _this;

    _classCallCheck(this, Heading);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _super.call.apply(_super, [this].concat(args)), _this.className = "heading-name", _this.handleFoldContent = function (event) {
      event.preventDefault();

      if (!(event.currentTarget instanceof HTMLButtonElement)) {
        return;
      }

      var view = _this.editor.view;
      var hadFocus = view.hasFocus();
      var tr = view.state.tr;

      var _event$currentTarget$ = event.currentTarget.getBoundingClientRect(),
          top = _event$currentTarget$.top,
          left = _event$currentTarget$.left;

      var result = view.posAtCoords({
        top: top,
        left: left
      });

      if (result) {
        var node = view.state.doc.nodeAt(result.inside);

        if (node) {
          var endOfHeadingPos = result.inside + node.nodeSize;
          var $pos = view.state.doc.resolve(endOfHeadingPos);
          var collapsed = !node.attrs.collapsed;

          if (collapsed && view.state.selection.to > endOfHeadingPos) {
            // move selection to the end of the collapsed heading
            tr.setSelection(_prosemirrorState.Selection.near($pos, -1));
          }

          var transaction = tr.setNodeMarkup(result.inside, undefined, _objectSpread(_objectSpread({}, node.attrs), {}, {
            collapsed: collapsed
          }));
          var persistKey = (0, _headingToSlug.headingToPersistenceKey)(node, _this.editor.props.id);

          if (collapsed) {
            var _localStorage;

            (_localStorage = localStorage) === null || _localStorage === void 0 ? void 0 : _localStorage.setItem(persistKey, "collapsed");
          } else {
            var _localStorage2;

            (_localStorage2 = localStorage) === null || _localStorage2 === void 0 ? void 0 : _localStorage2.removeItem(persistKey);
          }

          view.dispatch(transaction);

          if (hadFocus) {
            view.focus();
          }
        }
      }
    }, _this.handleCopyLink = function (event) {
      var _event$currentTarget$2, _event$currentTarget$3;

      // this is unfortunate but appears to be the best way to grab the anchor
      // as it's added directly to the dom by a decoration.
      var anchor = event.currentTarget instanceof HTMLButtonElement && ((_event$currentTarget$2 = event.currentTarget.parentNode) === null || _event$currentTarget$2 === void 0 ? void 0 : (_event$currentTarget$3 = _event$currentTarget$2.parentNode) === null || _event$currentTarget$3 === void 0 ? void 0 : _event$currentTarget$3.previousSibling);

      if (!anchor || !anchor.className.includes(_this.className)) {
        throw new Error("Did not find anchor as previous sibling of heading");
      }

      var hash = "#".concat(anchor.id); // the existing url might contain a hash already, lets make sure to remove
      // that rather than appending another one.

      var urlWithoutHash = window.location.href.split("#")[0];
      (0, _copyToClipboard.default)(urlWithoutHash + hash);

      _this.options.onShowToast(_this.options.dictionary.linkCopied);
    }, _temp));
  }

  _createClass(Heading, [{
    key: "name",
    get: function get() {
      return "heading";
    }
  }, {
    key: "defaultOptions",
    get: function get() {
      return {
        levels: [1, 2, 3, 4],
        collapsed: undefined
      };
    }
  }, {
    key: "schema",
    get: function get() {
      var _this2 = this;

      return {
        attrs: {
          level: {
            default: 1
          },
          collapsed: {
            default: undefined
          }
        },
        content: "inline*",
        group: "block",
        defining: true,
        draggable: false,
        parseDOM: this.options.levels.map(function (level) {
          return {
            tag: "h".concat(level),
            attrs: {
              level: level
            },
            contentElement: ".heading-content"
          };
        }),
        toDOM: function toDOM(node) {
          var anchor = document.createElement("button");
          anchor.innerText = "#";
          anchor.type = "button";
          anchor.className = "heading-anchor";
          anchor.addEventListener("click", function (event) {
            return _this2.handleCopyLink(event);
          });
          var fold = document.createElement("button");
          fold.innerText = "";
          fold.innerHTML = '<svg fill="currentColor" width="12" height="24" viewBox="6 0 12 24" xmlns="http://www.w3.org/2000/svg"><path d="M8.23823905,10.6097108 L11.207376,14.4695888 L11.207376,14.4695888 C11.54411,14.907343 12.1719566,14.989236 12.6097108,14.652502 C12.6783439,14.5997073 12.7398293,14.538222 12.792624,14.4695888 L15.761761,10.6097108 L15.761761,10.6097108 C16.0984949,10.1719566 16.0166019,9.54410997 15.5788477,9.20737601 C15.4040391,9.07290785 15.1896811,9 14.969137,9 L9.03086304,9 L9.03086304,9 C8.47857829,9 8.03086304,9.44771525 8.03086304,10 C8.03086304,10.2205442 8.10377089,10.4349022 8.23823905,10.6097108 Z" /></svg>';
          fold.type = "button";
          fold.className = "heading-fold ".concat(node.attrs.collapsed ? "collapsed" : "");
          fold.addEventListener("mousedown", function (event) {
            return _this2.handleFoldContent(event);
          });
          return ["h".concat(node.attrs.level + (_this2.options.offset || 0)), ["span", {
            contentEditable: "false",
            class: "heading-actions ".concat(node.attrs.collapsed ? "collapsed" : "")
          }, anchor, fold], ["span", {
            class: "heading-content"
          }, 0]];
        }
      };
    }
  }, {
    key: "toMarkdown",
    value: function toMarkdown(state, node) {
      state.write(state.repeat("#", node.attrs.level) + " ");
      state.renderInline(node);
      state.closeBlock(node);
    }
  }, {
    key: "parseMarkdown",
    value: function parseMarkdown() {
      return {
        block: "heading",
        getAttrs: function getAttrs(token) {
          return {
            level: +token.tag.slice(1)
          };
        }
      };
    }
  }, {
    key: "commands",
    value: function commands(_ref) {
      var type = _ref.type,
          schema = _ref.schema;
      return function (attrs) {
        return (0, _toggleBlockType.default)(type, schema.nodes.paragraph, attrs);
      };
    }
  }, {
    key: "keys",
    value: function keys(_ref2) {
      var type = _ref2.type,
          schema = _ref2.schema;
      var options = this.options.levels.reduce(function (items, level) {
        return _objectSpread(_objectSpread({}, items), _defineProperty({}, "Shift-Ctrl-".concat(level), (0, _toggleBlockType.default)(type, schema.nodes.paragraph, {
          level: level
        })));
      }, {});
      return _objectSpread(_objectSpread({}, options), {}, {
        Backspace: (0, _backspaceToParagraph.default)(type),
        Enter: (0, _splitHeading.default)(type)
      });
    }
  }, {
    key: "plugins",
    get: function get() {
      var _this3 = this;

      var getAnchors = function getAnchors(doc) {
        var decorations = [];
        var previouslySeen = {};
        doc.descendants(function (node, pos) {
          if (node.type.name !== _this3.name) {
            return;
          } // calculate the optimal id


          var slug = (0, _headingToSlug.default)(node);
          var id = slug; // check if we've already used it, and if so how many times?
          // Make the new id based on that number ensuring that we have
          // unique ID's even when headings are identical

          if (previouslySeen[slug] > 0) {
            id = (0, _headingToSlug.default)(node, previouslySeen[slug]);
          } // record that we've seen this slug for the next loop


          previouslySeen[slug] = previouslySeen[slug] !== undefined ? previouslySeen[slug] + 1 : 1;
          decorations.push(_prosemirrorView.Decoration.widget(pos, function () {
            var anchor = document.createElement("a");
            anchor.id = id;
            anchor.className = _this3.className;
            return anchor;
          }, {
            side: -1,
            key: id
          }));
        });
        return _prosemirrorView.DecorationSet.create(doc, decorations);
      };

      var plugin = new _prosemirrorState.Plugin({
        state: {
          init: function init(config, state) {
            return getAnchors(state.doc);
          },
          apply: function apply(tr, oldState) {
            return tr.docChanged ? getAnchors(tr.doc) : oldState;
          }
        },
        props: {
          decorations: function decorations(state) {
            return plugin.getState(state);
          }
        }
      });
      return [plugin];
    }
  }, {
    key: "inputRules",
    value: function inputRules(_ref3) {
      var type = _ref3.type;
      return this.options.levels.map(function (level) {
        return (0, _prosemirrorInputrules.textblockTypeInputRule)(new RegExp("^(#{1,".concat(level, "})\\s$")), type, function () {
          return {
            level: level
          };
        });
      });
    }
  }]);

  return Heading;
}(_Node2.default);

exports.default = Heading;