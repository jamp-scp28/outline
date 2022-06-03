"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es.weak-map.js");

require("core-js/modules/esnext.weak-map.delete-all.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.findPlaceholder = findPlaceholder;

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/web.url.js");

require("core-js/modules/web.url-search-params.js");

require("core-js/modules/es.array.find.js");

var _prosemirrorState = require("prosemirror-state");

var _prosemirrorView = require("prosemirror-view");

var React = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _FileExtension = _interopRequireDefault(require("../components/FileExtension"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// based on the example at: https://prosemirror.net/examples/upload/
var uploadPlaceholder = new _prosemirrorState.Plugin({
  state: {
    init: function init() {
      return _prosemirrorView.DecorationSet.empty;
    },
    apply: function apply(tr, set) {
      // Adjust decoration positions to changes made by the transaction
      set = set.map(tr.mapping, tr.doc); // See if the transaction adds or removes any placeholders

      var action = tr.getMeta(this);

      if (action !== null && action !== void 0 && action.add) {
        if (action.add.replaceExisting) {
          var _$pos$nodeAfter;

          var $pos = tr.doc.resolve(action.add.pos);

          if (((_$pos$nodeAfter = $pos.nodeAfter) === null || _$pos$nodeAfter === void 0 ? void 0 : _$pos$nodeAfter.type.name) === "image") {
            var deco = _prosemirrorView.Decoration.node($pos.pos, $pos.pos + $pos.nodeAfter.nodeSize, {
              class: "image-replacement-uploading"
            }, {
              id: action.add.id
            });

            set = set.add(tr.doc, [deco]);
          }
        } else if (action.add.isImage) {
          var element = document.createElement("div");
          element.className = "image placeholder";
          var img = document.createElement("img");
          img.src = URL.createObjectURL(action.add.file);
          element.appendChild(img);

          var _deco = _prosemirrorView.Decoration.widget(action.add.pos, element, {
            id: action.add.id
          });

          set = set.add(tr.doc, [_deco]);
        } else {
          var _element = document.createElement("div");

          _element.className = "attachment placeholder";
          var icon = document.createElement("div");
          icon.className = "icon";
          var component = /*#__PURE__*/React.createElement(_FileExtension.default, {
            title: action.add.file.name
          });

          _reactDom.default.render(component, icon);

          _element.appendChild(icon);

          var text = document.createElement("span");
          text.innerText = action.add.file.name;

          _element.appendChild(text);

          var status = document.createElement("span");
          status.innerText = "Uploading…";
          status.className = "status";

          _element.appendChild(status);

          var _deco2 = _prosemirrorView.Decoration.widget(action.add.pos, _element, {
            id: action.add.id
          });

          set = set.add(tr.doc, [_deco2]);
        }
      }

      if (action !== null && action !== void 0 && action.remove) {
        set = set.remove(set.find(undefined, undefined, function (spec) {
          return spec.id === action.remove.id;
        }));
      }

      return set;
    }
  },
  props: {
    decorations: function decorations(state) {
      return this.getState(state);
    }
  }
});
var _default = uploadPlaceholder;
exports.default = _default;

function findPlaceholder(state, id) {
  var decos = uploadPlaceholder.getState(state);
  var found = decos.find(undefined, undefined, function (spec) {
    return spec.id === id;
  });
  return found.length ? [found[0].from, found[0].to] : null;
}