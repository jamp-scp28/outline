"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.weak-map.js");

require("core-js/modules/esnext.weak-map.delete-all.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.string.starts-with.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.promise.js");

require("core-js/modules/es.promise.finally.js");

var Sentry = _interopRequireWildcard(require("@sentry/react"));

var _prosemirrorState = require("prosemirror-state");

var _uuid = require("uuid");

var _uploadPlaceholder = _interopRequireWildcard(require("../lib/uploadPlaceholder"));

var _findAttachmentById = _interopRequireDefault(require("../queries/findAttachmentById"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var insertFiles = function insertFiles(view, event, pos, files, options) {
  var dictionary = options.dictionary,
      uploadFile = options.uploadFile,
      onFileUploadStart = options.onFileUploadStart,
      onFileUploadStop = options.onFileUploadStop,
      onShowToast = options.onShowToast;

  if (!uploadFile) {
    console.warn("uploadFile callback must be defined to handle uploads.");
    return;
  } // okay, we have some dropped files and a handler – lets stop this
  // event going any further up the stack


  event.preventDefault(); // let the user know we're starting to process the files

  if (onFileUploadStart) {
    onFileUploadStart();
  }

  var schema = view.state.schema; // we'll use this to track of how many files have succeeded or failed

  var complete = 0; // the user might have dropped multiple files at once, we need to loop

  var _iterator = _createForOfIteratorHelper(files),
      _step;

  try {
    var _loop = function _loop() {
      var file = _step.value;
      var id = "upload-".concat((0, _uuid.v4)());
      var isImage = file.type.startsWith("image/") && !options.isAttachment;
      var tr = view.state.tr;

      if (isImage) {
        // insert a placeholder at this position, or mark an existing file as being
        // replaced
        tr.setMeta(_uploadPlaceholder.default, {
          add: {
            id: id,
            file: file,
            pos: pos,
            isImage: isImage,
            replaceExisting: options.replaceExisting
          }
        });
        view.dispatch(tr);
      } else {
        var _$pos$nodeAfter, _file$name;

        var $pos = tr.doc.resolve(pos);
        view.dispatch(view.state.tr.replaceWith($pos.pos, $pos.pos + (((_$pos$nodeAfter = $pos.nodeAfter) === null || _$pos$nodeAfter === void 0 ? void 0 : _$pos$nodeAfter.nodeSize) || 0), schema.nodes.attachment.create({
          id: id,
          title: (_file$name = file.name) !== null && _file$name !== void 0 ? _file$name : "Untitled",
          size: file.size
        })));
      } // start uploading the file to the server. Using "then" syntax
      // to allow all placeholders to be entered at once with the uploads
      // happening in the background in parallel.


      uploadFile(file).then(function (src) {
        if (isImage) {
          var newImg = new Image();

          newImg.onload = function () {
            var result = (0, _uploadPlaceholder.findPlaceholder)(view.state, id); // if the content around the placeholder has been deleted
            // then forget about inserting this file

            if (result === null) {
              return;
            }

            var _result = _slicedToArray(result, 2),
                from = _result[0],
                to = _result[1];

            view.dispatch(view.state.tr.replaceWith(from, to || from, schema.nodes.image.create({
              src: src
            })).setMeta(_uploadPlaceholder.default, {
              remove: {
                id: id
              }
            })); // If the users selection is still at the file then make sure to select
            // the entire node once done. Otherwise, if the selection has moved
            // elsewhere then we don't want to modify it

            if (view.state.selection.from === from) {
              view.dispatch(view.state.tr.setSelection(new _prosemirrorState.NodeSelection(view.state.doc.resolve(from))));
            }
          };

          newImg.onerror = function (error) {
            throw error;
          };

          newImg.src = src;
        } else {
          var _file$name2;

          var result = (0, _findAttachmentById.default)(view.state, id); // if the attachment has been deleted then forget about updating it

          if (result === null) {
            return;
          }

          var _result2 = _slicedToArray(result, 2),
              from = _result2[0],
              to = _result2[1];

          view.dispatch(view.state.tr.replaceWith(from, to || from, schema.nodes.attachment.create({
            href: src,
            title: (_file$name2 = file.name) !== null && _file$name2 !== void 0 ? _file$name2 : "Untitled",
            size: file.size
          }))); // If the users selection is still at the file then make sure to select
          // the entire node once done. Otherwise, if the selection has moved
          // elsewhere then we don't want to modify it

          if (view.state.selection.from === from) {
            view.dispatch(view.state.tr.setSelection(new _prosemirrorState.NodeSelection(view.state.doc.resolve(from))));
          }
        }
      }).catch(function (error) {
        Sentry.captureException(error); // cleanup the placeholder if there is a failure

        if (isImage) {
          view.dispatch(view.state.tr.setMeta(_uploadPlaceholder.default, {
            remove: {
              id: id
            }
          }));
        } else {
          var result = (0, _findAttachmentById.default)(view.state, id); // if the attachment has been deleted then forget about updating it

          if (result === null) {
            return;
          }

          var _result3 = _slicedToArray(result, 2),
              from = _result3[0],
              to = _result3[1];

          view.dispatch(view.state.tr.deleteRange(from, to || from));
        }

        onShowToast(error.message || dictionary.fileUploadError);
      }).finally(function () {
        complete++; // once everything is done, let the user know

        if (complete === files.length && onFileUploadStop) {
          onFileUploadStop();
        }
      });
    };

    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      _loop();
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
};

var _default = insertFiles;
exports.default = _default;