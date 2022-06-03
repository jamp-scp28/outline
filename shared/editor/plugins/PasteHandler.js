"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es.object.set-prototype-of.js");

require("core-js/modules/es.object.get-prototype-of.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.reflect.construct.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.match.js");

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.string.trim.js");

require("core-js/modules/es.string.link.js");

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.array.slice.js");

var _prosemirrorCommands = require("prosemirror-commands");

var _prosemirrorState = require("prosemirror-state");

var _prosemirrorTables = require("prosemirror-tables");

var _Extension2 = _interopRequireDefault(require("../lib/Extension"));

var _isMarkdown = _interopRequireDefault(require("../lib/isMarkdown"));

var _isUrl = _interopRequireDefault(require("../lib/isUrl"));

var _isInCode = _interopRequireDefault(require("../queries/isInCode"));

var _Prism = require("./Prism");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

function isDropboxPaper(html) {
  // The best we have to detect if a paste is likely coming from Paper
  // In this case it's actually better to use the text version
  return html === null || html === void 0 ? void 0 : html.includes("usually-unique-id");
}
/**
 * Add support for additional syntax that users paste even though it isn't
 * supported by the markdown parser directly by massaging the text content.
 *
 * @param text The incoming pasted plain text
 */


function normalizePastedMarkdown(text) {
  var CHECKBOX_REGEX = /^\s?(\[(X|\s|_|-)\]\s(.*)?)/gim; // find checkboxes not contained in a list and wrap them in list items

  while (text.match(CHECKBOX_REGEX)) {
    text = text.replace(CHECKBOX_REGEX, function (match) {
      return "- ".concat(match.trim());
    });
  } // find multiple newlines and insert a hard break to ensure they are respected


  text = text.replace(/\n{2,}/g, "\n\n\\\n");
  return text;
}

var PasteHandler = /*#__PURE__*/function (_Extension) {
  _inherits(PasteHandler, _Extension);

  var _super = _createSuper(PasteHandler);

  function PasteHandler() {
    _classCallCheck(this, PasteHandler);

    return _super.apply(this, arguments);
  }

  _createClass(PasteHandler, [{
    key: "name",
    get: function get() {
      return "markdown-paste";
    }
  }, {
    key: "plugins",
    get: function get() {
      var _this = this;

      return [new _prosemirrorState.Plugin({
        props: {
          transformPastedHTML: function transformPastedHTML(html) {
            if (isDropboxPaper(html)) {
              // Fixes double paragraphs when pasting from Dropbox Paper
              html = html.replace(/<div><br><\/div>/gi, "<p></p>");
            }

            return html;
          },
          handlePaste: function handlePaste(view, event) {
            if (view.props.editable && !view.props.editable(view.state)) {
              return false;
            }

            if (!event.clipboardData) {
              return false;
            }

            var text = event.clipboardData.getData("text/plain");
            var html = event.clipboardData.getData("text/html");
            var vscode = event.clipboardData.getData("vscode-editor-data");
            var state = view.state,
                dispatch = view.dispatch; // first check if the clipboard contents can be parsed as a single
            // url, this is mainly for allowing pasted urls to become embeds

            if ((0, _isUrl.default)(text)) {
              // just paste the link mark directly onto the selected text
              if (!state.selection.empty) {
                (0, _prosemirrorCommands.toggleMark)(_this.editor.schema.marks.link, {
                  href: text
                })(state, dispatch);
                return true;
              } // Is this link embeddable? Create an embed!


              var embeds = _this.editor.props.embeds;

              if (embeds && !(0, _prosemirrorTables.isInTable)(state)) {
                var _iterator = _createForOfIteratorHelper(embeds),
                    _step;

                try {
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    var embed = _step.value;
                    var matches = embed.matcher(text);

                    if (matches) {
                      _this.editor.commands.embed({
                        href: text
                      });

                      return true;
                    }
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }
              } // well, it's not an embed and there is no text selected – so just
              // go ahead and insert the link directly


              var transaction = view.state.tr.insertText(text, state.selection.from, state.selection.to).addMark(state.selection.from, state.selection.to + text.length, state.schema.marks.link.create({
                href: text
              }));
              view.dispatch(transaction);
              return true;
            } // If the users selection is currently in a code block then paste
            // as plain text, ignore all formatting and HTML content.


            if ((0, _isInCode.default)(view.state)) {
              event.preventDefault();
              view.dispatch(view.state.tr.insertText(text));
              return true;
            } // Because VSCode is an especially popular editor that places metadata
            // on the clipboard, we can parse it to find out what kind of content
            // was pasted.


            var vscodeMeta = vscode ? JSON.parse(vscode) : undefined;
            var pasteCodeLanguage = vscodeMeta === null || vscodeMeta === void 0 ? void 0 : vscodeMeta.mode;

            if (pasteCodeLanguage && pasteCodeLanguage !== "markdown") {
              event.preventDefault();
              view.dispatch(view.state.tr.replaceSelectionWith(view.state.schema.nodes.code_fence.create({
                language: Object.keys(_Prism.LANGUAGES).includes(vscodeMeta.mode) ? vscodeMeta.mode : null
              })).insertText(text));
              return true;
            } // If the HTML on the clipboard is from Prosemirror then the best
            // compatability is to just use the HTML parser, regardless of
            // whether it "looks" like Markdown, see: outline/outline#2416


            if (html !== null && html !== void 0 && html.includes("data-pm-slice")) {
              return false;
            } // If the text on the clipboard looks like Markdown OR there is no
            // html on the clipboard then try to parse content as Markdown


            if ((0, _isMarkdown.default)(text) && !isDropboxPaper(html) || html.length === 0 || pasteCodeLanguage === "markdown") {
              event.preventDefault();

              var paste = _this.editor.pasteParser.parse(normalizePastedMarkdown(text));

              var slice = paste.slice(0);

              var _transaction = view.state.tr.replaceSelection(slice);

              view.dispatch(_transaction);
              return true;
            } // otherwise use the default HTML parser which will handle all paste
            // "from the web" events


            return false;
          }
        }
      })];
    }
  }]);

  return PasteHandler;
}(_Extension2.default);

exports.default = PasteHandler;