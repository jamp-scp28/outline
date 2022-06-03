"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es.regexp.constructor.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.weak-map.js");

require("core-js/modules/esnext.weak-map.delete-all.js");

require("core-js/modules/es.array.reduce.js");

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.symbol.replace.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.object.get-prototype-of.js");

require("core-js/modules/es.reflect.construct.js");

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.object.get-own-property-descriptors.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.from.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("regenerator-runtime/runtime.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.promise.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/web.url.js");

require("core-js/modules/web.url-search-params.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.string.match.js");

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.array.join.js");

require("core-js/modules/es.object.set-prototype-of.js");

var _outlineIcons = require("outline-icons");

var _prosemirrorInputrules = require("prosemirror-inputrules");

var _prosemirrorState = require("prosemirror-state");

var React = _interopRequireWildcard(require("react"));

var _reactMediumImageZoom = _interopRequireDefault(require("react-medium-image-zoom"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _files = require("../../utils/files");

var _getDataTransferFiles = _interopRequireDefault(require("../../utils/getDataTransferFiles"));

var _insertFiles = _interopRequireDefault(require("../commands/insertFiles"));

var _uploadPlaceholder = _interopRequireDefault(require("../lib/uploadPlaceholder"));

var _Node2 = _interopRequireDefault(require("./Node"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _wrapRegExp() { _wrapRegExp = function _wrapRegExp(re, groups) { return new BabelRegExp(re, void 0, groups); }; var _super = RegExp.prototype, _groups = new WeakMap(); function BabelRegExp(re, flags, groups) { var _this = new RegExp(re, flags); return _groups.set(_this, groups || _groups.get(re)), _setPrototypeOf(_this, BabelRegExp.prototype); } function buildGroups(result, re) { var g = _groups.get(re); return Object.keys(g).reduce(function (groups, name) { return groups[name] = result[g[name]], groups; }, Object.create(null)); } return _inherits(BabelRegExp, RegExp), BabelRegExp.prototype.exec = function (str) { var result = _super.exec.call(this, str); return result && (result.groups = buildGroups(result, this)), result; }, BabelRegExp.prototype[Symbol.replace] = function (str, substitution) { if ("string" == typeof substitution) { var groups = _groups.get(this); return _super[Symbol.replace].call(this, str, substitution.replace(/\$<([^>]+)>/g, function (_, name) { return "$" + groups[name]; })); } if ("function" == typeof substitution) { var _this = this; return _super[Symbol.replace].call(this, str, function () { var args = arguments; return "object" != _typeof(args[args.length - 1]) && (args = [].slice.call(args)).push(buildGroups(args, _this)), substitution.apply(this, args); }); } return _super[Symbol.replace].call(this, str, substitution); }, _wrapRegExp.apply(this, arguments); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * Matches following attributes in Markdown-typed image: [, alt, src, class]
 *
 * Example:
 * ![Lorem](image.jpg) -> [, "Lorem", "image.jpg"]
 * ![](image.jpg "class") -> [, "", "image.jpg", "small"]
 * ![Lorem](image.jpg "class") -> [, "Lorem", "image.jpg", "small"]
 */
var IMAGE_INPUT_REGEX = /*#__PURE__*/_wrapRegExp(/!\[((?:(?![\[\]])[\s\S])*?)\]\(((?:(?![\[\]])[\s\S])*?)(?=\u201C|\))\u201C?((?:(?![\[\]\u201D])[\s\S])+)?\u201D?\)$/, {
  alt: 1,
  filename: 2,
  layoutclass: 3
});

var uploadPlugin = function uploadPlugin(options) {
  return new _prosemirrorState.Plugin({
    props: {
      handleDOMEvents: {
        paste: function paste(view, event) {
          if (view.props.editable && !view.props.editable(view.state) || !options.uploadFile) {
            return false;
          }

          if (!event.clipboardData) {
            return false;
          } // check if we actually pasted any files


          var files = Array.prototype.slice.call(event.clipboardData.items).filter(function (dt) {
            return dt.kind !== "string";
          }).map(function (dt) {
            return dt.getAsFile();
          }).filter(Boolean);

          if (files.length === 0) {
            return false;
          }

          var tr = view.state.tr;

          if (!tr.selection.empty) {
            tr.deleteSelection();
          }

          var pos = tr.selection.from;
          (0, _insertFiles.default)(view, event, pos, files, options);
          return true;
        },
        drop: function drop(view, event) {
          if (view.props.editable && !view.props.editable(view.state) || !options.uploadFile) {
            return false;
          } // filter to only include image files


          var files = (0, _getDataTransferFiles.default)(event).filter(function (dt) {
            return dt.kind !== "string";
          });

          if (files.length === 0) {
            return false;
          } // grab the position in the document for the cursor


          var result = view.posAtCoords({
            left: event.clientX,
            top: event.clientY
          });

          if (result) {
            (0, _insertFiles.default)(view, event, result.pos, files, options);
            return true;
          }

          return false;
        }
      }
    }
  });
};

var IMAGE_CLASSES = ["right-50", "left-50"];

var getLayoutAndTitle = function getLayoutAndTitle(tokenTitle) {
  if (!tokenTitle) {
    return {};
  }

  if (IMAGE_CLASSES.includes(tokenTitle)) {
    return {
      layoutClass: tokenTitle
    };
  } else {
    return {
      title: tokenTitle
    };
  }
};

var downloadImageNode = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(node) {
    var image, imageBlob, imageURL, extension, potentialName, link;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch(node.attrs.src);

          case 2:
            image = _context.sent;
            _context.next = 5;
            return image.blob();

          case 5:
            imageBlob = _context.sent;
            imageURL = URL.createObjectURL(imageBlob);
            extension = imageBlob.type.split("/")[1];
            potentialName = node.attrs.alt || "image"; // create a temporary link node and click it with our image data

            link = document.createElement("a");
            link.href = imageURL;
            link.download = "".concat(potentialName, ".").concat(extension);
            document.body.appendChild(link);
            link.click(); // cleanup

            document.body.removeChild(link);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function downloadImageNode(_x) {
    return _ref.apply(this, arguments);
  };
}();

var Image = /*#__PURE__*/function (_Node) {
  _inherits(Image, _Node);

  var _super2 = _createSuper(Image);

  function Image() {
    var _temp, _this2;

    _classCallCheck(this, Image);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this2, (_temp = _this2 = _super2.call.apply(_super2, [this].concat(args)), _this2.handleKeyDown = function (_ref2) {
      var node = _ref2.node,
          getPos = _ref2.getPos;
      return function (event) {
        // Pressing Enter in the caption field should move the cursor/selection
        // below the image
        if (event.key === "Enter") {
          event.preventDefault();
          var view = _this2.editor.view;
          var $pos = view.state.doc.resolve(getPos() + node.nodeSize);
          view.dispatch(view.state.tr.setSelection(new _prosemirrorState.TextSelection($pos)).split($pos.pos));
          view.focus();
          return;
        } // Pressing Backspace in an an empty caption field should remove the entire
        // image, leaving an empty paragraph


        if (event.key === "Backspace" && event.currentTarget.innerText === "") {
          var _view = _this2.editor.view;

          var _$pos = _view.state.doc.resolve(getPos());

          var tr = _view.state.tr.setSelection(new _prosemirrorState.NodeSelection(_$pos));

          _view.dispatch(tr.deleteSelection());

          _view.focus();

          return;
        }
      };
    }, _this2.handleBlur = function (_ref3) {
      var node = _ref3.node,
          getPos = _ref3.getPos;
      return function (event) {
        var alt = event.currentTarget.innerText;
        var _node$attrs = node.attrs,
            src = _node$attrs.src,
            title = _node$attrs.title,
            layoutClass = _node$attrs.layoutClass;

        if (alt === node.attrs.alt) {
          return;
        }

        var view = _this2.editor.view;
        var tr = view.state.tr; // update meta on object

        var pos = getPos();
        var transaction = tr.setNodeMarkup(pos, undefined, {
          src: src,
          alt: alt,
          title: title,
          layoutClass: layoutClass
        });
        view.dispatch(transaction);
      };
    }, _this2.handleSelect = function (_ref4) {
      var getPos = _ref4.getPos;
      return function (event) {
        event.preventDefault();
        var view = _this2.editor.view;
        var $pos = view.state.doc.resolve(getPos());
        var transaction = view.state.tr.setSelection(new _prosemirrorState.NodeSelection($pos));
        view.dispatch(transaction);
      };
    }, _this2.handleDownload = function (_ref5) {
      var node = _ref5.node;
      return function (event) {
        event.preventDefault();
        event.stopPropagation();
        downloadImageNode(node);
      };
    }, _this2.handleMouseDown = function (ev) {
      if (document.activeElement !== ev.currentTarget) {
        ev.preventDefault();
        ev.stopPropagation();
        ev.currentTarget.focus();
      }
    }, _this2.component = function (props) {
      return /*#__PURE__*/React.createElement(ImageComponent, _extends({}, props, {
        onClick: _this2.handleSelect(props),
        onDownload: _this2.handleDownload(props)
      }), /*#__PURE__*/React.createElement(Caption, {
        onKeyDown: _this2.handleKeyDown(props),
        onBlur: _this2.handleBlur(props),
        onMouseDown: _this2.handleMouseDown,
        className: "caption",
        tabIndex: -1,
        role: "textbox",
        contentEditable: true,
        suppressContentEditableWarning: true,
        "data-caption": _this2.options.dictionary.imageCaptionPlaceholder
      }, props.node.attrs.alt));
    }, _temp));
  }

  _createClass(Image, [{
    key: "name",
    get: function get() {
      return "image";
    }
  }, {
    key: "schema",
    get: function get() {
      return {
        inline: true,
        attrs: {
          src: {},
          alt: {
            default: null
          },
          layoutClass: {
            default: null
          },
          title: {
            default: null
          }
        },
        content: "text*",
        marks: "",
        group: "inline",
        selectable: true,
        draggable: true,
        parseDOM: [{
          tag: "div[class~=image]",
          getAttrs: function getAttrs(dom) {
            var img = dom.getElementsByTagName("img")[0];
            var className = dom.className;
            var layoutClassMatched = className && className.match(/image-(.*)$/);
            var layoutClass = layoutClassMatched ? layoutClassMatched[1] : null;
            return {
              src: img === null || img === void 0 ? void 0 : img.getAttribute("src"),
              alt: img === null || img === void 0 ? void 0 : img.getAttribute("alt"),
              title: img === null || img === void 0 ? void 0 : img.getAttribute("title"),
              layoutClass: layoutClass
            };
          }
        }, {
          tag: "img",
          getAttrs: function getAttrs(dom) {
            return {
              src: dom.getAttribute("src"),
              alt: dom.getAttribute("alt"),
              title: dom.getAttribute("title")
            };
          }
        }],
        toDOM: function toDOM(node) {
          var className = node.attrs.layoutClass ? "image image-".concat(node.attrs.layoutClass) : "image";
          return ["div", {
            class: className
          }, ["img", _objectSpread(_objectSpread({}, node.attrs), {}, {
            contentEditable: "false"
          })], ["p", {
            class: "caption"
          }, 0]];
        }
      };
    }
  }, {
    key: "toMarkdown",
    value: function toMarkdown(state, node) {
      var markdown = " ![" + state.esc((node.attrs.alt || "").replace("\n", "") || "", false) + "](" + state.esc(node.attrs.src || "", false);

      if (node.attrs.layoutClass) {
        markdown += ' "' + state.esc(node.attrs.layoutClass, false) + '"';
      } else if (node.attrs.title) {
        markdown += ' "' + state.esc(node.attrs.title, false) + '"';
      }

      markdown += ")";
      state.write(markdown);
    }
  }, {
    key: "parseMarkdown",
    value: function parseMarkdown() {
      return {
        node: "image",
        getAttrs: function getAttrs(token) {
          return _objectSpread({
            src: token.attrGet("src"),
            alt: (token === null || token === void 0 ? void 0 : token.children) && token.children[0] && token.children[0].content || null
          }, getLayoutAndTitle(token === null || token === void 0 ? void 0 : token.attrGet("title")));
        }
      };
    }
  }, {
    key: "commands",
    value: function commands(_ref6) {
      var _this3 = this;

      var type = _ref6.type;
      return {
        downloadImage: function downloadImage() {
          return function (state) {
            if (!(state.selection instanceof _prosemirrorState.NodeSelection)) {
              return false;
            }

            var node = state.selection.node;

            if (node.type.name !== "image") {
              return false;
            }

            downloadImageNode(node);
            return true;
          };
        },
        deleteImage: function deleteImage() {
          return function (state, dispatch) {
            dispatch(state.tr.deleteSelection());
            return true;
          };
        },
        alignRight: function alignRight() {
          return function (state, dispatch) {
            if (!(state.selection instanceof _prosemirrorState.NodeSelection)) {
              return false;
            }

            var attrs = _objectSpread(_objectSpread({}, state.selection.node.attrs), {}, {
              title: null,
              layoutClass: "right-50"
            });

            var selection = state.selection;
            dispatch(state.tr.setNodeMarkup(selection.from, undefined, attrs));
            return true;
          };
        },
        alignLeft: function alignLeft() {
          return function (state, dispatch) {
            if (!(state.selection instanceof _prosemirrorState.NodeSelection)) {
              return false;
            }

            var attrs = _objectSpread(_objectSpread({}, state.selection.node.attrs), {}, {
              title: null,
              layoutClass: "left-50"
            });

            var selection = state.selection;
            dispatch(state.tr.setNodeMarkup(selection.from, undefined, attrs));
            return true;
          };
        },
        replaceImage: function replaceImage() {
          return function (state) {
            var view = _this3.editor.view;
            var _this3$editor$props = _this3.editor.props,
                uploadFile = _this3$editor$props.uploadFile,
                onFileUploadStart = _this3$editor$props.onFileUploadStart,
                onFileUploadStop = _this3$editor$props.onFileUploadStop,
                onShowToast = _this3$editor$props.onShowToast;

            if (!uploadFile) {
              throw new Error("uploadFile prop is required to replace images");
            } // create an input element and click to trigger picker


            var inputElement = document.createElement("input");
            inputElement.type = "file";
            inputElement.accept = _files.supportedImageMimeTypes.join(", ");

            inputElement.onchange = function (event) {
              var files = (0, _getDataTransferFiles.default)(event);
              (0, _insertFiles.default)(view, event, state.selection.from, files, {
                uploadFile: uploadFile,
                onFileUploadStart: onFileUploadStart,
                onFileUploadStop: onFileUploadStop,
                onShowToast: onShowToast,
                dictionary: _this3.options.dictionary,
                replaceExisting: true
              });
            };

            inputElement.click();
            return true;
          };
        },
        alignCenter: function alignCenter() {
          return function (state, dispatch) {
            if (!(state.selection instanceof _prosemirrorState.NodeSelection)) {
              return false;
            }

            var attrs = _objectSpread(_objectSpread({}, state.selection.node.attrs), {}, {
              layoutClass: null
            });

            var selection = state.selection;
            dispatch(state.tr.setNodeMarkup(selection.from, undefined, attrs));
            return true;
          };
        },
        createImage: function createImage(attrs) {
          return function (state, dispatch) {
            var _selection$$cursor;

            var selection = state.selection;
            var position = selection instanceof _prosemirrorState.TextSelection ? (_selection$$cursor = selection.$cursor) === null || _selection$$cursor === void 0 ? void 0 : _selection$$cursor.pos : selection.$to.pos;

            if (position === undefined) {
              return false;
            }

            var node = type.create(attrs);
            var transaction = state.tr.insert(position, node);
            dispatch(transaction);
            return true;
          };
        }
      };
    }
  }, {
    key: "inputRules",
    value: function inputRules(_ref7) {
      var type = _ref7.type;
      return [new _prosemirrorInputrules.InputRule(IMAGE_INPUT_REGEX, function (state, match, start, end) {
        var _match = _slicedToArray(match, 4),
            okay = _match[0],
            alt = _match[1],
            src = _match[2],
            matchedTitle = _match[3];

        var tr = state.tr;

        if (okay) {
          tr.replaceWith(start - 1, end, type.create(_objectSpread({
            src: src,
            alt: alt
          }, getLayoutAndTitle(matchedTitle))));
        }

        return tr;
      })];
    }
  }, {
    key: "plugins",
    get: function get() {
      return [_uploadPlaceholder.default, uploadPlugin(this.options)];
    }
  }]);

  return Image;
}(_Node2.default);

exports.default = Image;

var ImageComponent = function ImageComponent(props) {
  var theme = props.theme,
      isSelected = props.isSelected,
      node = props.node;
  var _node$attrs2 = node.attrs,
      alt = _node$attrs2.alt,
      src = _node$attrs2.src,
      layoutClass = _node$attrs2.layoutClass;
  var className = layoutClass ? "image image-".concat(layoutClass) : "image";

  var _React$useState = React.useState(0),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      width = _React$useState2[0],
      setWidth = _React$useState2[1];

  return /*#__PURE__*/React.createElement("div", {
    contentEditable: false,
    className: className
  }, /*#__PURE__*/React.createElement(ImageWrapper, {
    className: isSelected ? "ProseMirror-selectednode" : "",
    onClick: props.onClick,
    style: {
      width: width
    }
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: props.onDownload
  }, /*#__PURE__*/React.createElement(_outlineIcons.DownloadIcon, {
    color: "currentColor"
  })), /*#__PURE__*/React.createElement(_reactMediumImageZoom.default, {
    image: {
      src: src,
      alt: alt,
      // @ts-expect-error type is incorrect, allows spreading all img props
      onLoad: function onLoad(ev) {
        // For some SVG's Firefox does not provide the naturalWidth, in this
        // rare case we need to provide a default so that the image can be
        // seen and is not sized to 0px
        setWidth(ev.target.naturalWidth || "50%");
      }
    },
    defaultStyles: {
      overlay: {
        backgroundColor: theme.background
      }
    },
    shouldRespectMaxDimension: true
  })), props.children);
};

var Button = _styledComponents.default.button.withConfig({
  displayName: "Image__Button",
  componentId: "sc-17w43ff-0"
})(["position:absolute;top:8px;right:8px;border:0;margin:0;padding:0;border-radius:4px;background:", ";color:", ";width:24px;height:24px;display:inline-block;cursor:pointer;opacity:0;transition:opacity 100ms ease-in-out;&:active{transform:scale(0.98);}&:hover{color:", ";opacity:1;}"], function (props) {
  return props.theme.background;
}, function (props) {
  return props.theme.textSecondary;
}, function (props) {
  return props.theme.text;
});

var Caption = _styledComponents.default.p.withConfig({
  displayName: "Image__Caption",
  componentId: "sc-17w43ff-1"
})(["border:0;display:block;font-size:13px;font-style:italic;font-weight:normal;color:", ";padding:8px 0 4px;line-height:16px;text-align:center;min-height:1em;outline:none;background:none;resize:none;user-select:text;margin:0 !important;cursor:text;&:empty:not(:focus){display:none;}&:empty:before{color:", ";content:attr(data-caption);pointer-events:none;}"], function (props) {
  return props.theme.textSecondary;
}, function (props) {
  return props.theme.placeholder;
});

var ImageWrapper = _styledComponents.default.div.withConfig({
  displayName: "Image__ImageWrapper",
  componentId: "sc-17w43ff-2"
})(["line-height:0;position:relative;margin-left:auto;margin-right:auto;max-width:100%;&:hover{", "{opacity:0.9;}}&.ProseMirror-selectednode + ", "{display:block;}"], Button, Caption);