"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.string.iterator.js");

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

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.match.js");

var React = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Image = _interopRequireDefault(require("../components/Image"));

var _Abstract = _interopRequireDefault(require("./Abstract"));

var _Airtable = _interopRequireDefault(require("./Airtable"));

var _Berrycast = _interopRequireDefault(require("./Berrycast"));

var _Bilibili = _interopRequireDefault(require("./Bilibili"));

var _Cawemo = _interopRequireDefault(require("./Cawemo"));

var _ClickUp = _interopRequireDefault(require("./ClickUp"));

var _Codepen = _interopRequireDefault(require("./Codepen"));

var _DBDiagram = _interopRequireDefault(require("./DBDiagram"));

var _Descript = _interopRequireDefault(require("./Descript"));

var _Diagrams = _interopRequireDefault(require("./Diagrams"));

var _Figma = _interopRequireDefault(require("./Figma"));

var _Framer = _interopRequireDefault(require("./Framer"));

var _Gist = _interopRequireDefault(require("./Gist"));

var _Gliffy = _interopRequireDefault(require("./Gliffy"));

var _GoogleCalendar = _interopRequireDefault(require("./GoogleCalendar"));

var _GoogleDataStudio = _interopRequireDefault(require("./GoogleDataStudio"));

var _GoogleDocs = _interopRequireDefault(require("./GoogleDocs"));

var _GoogleDrawings = _interopRequireDefault(require("./GoogleDrawings"));

var _GoogleDrive = _interopRequireDefault(require("./GoogleDrive"));

var _GoogleSheets = _interopRequireDefault(require("./GoogleSheets"));

var _GoogleSlides = _interopRequireDefault(require("./GoogleSlides"));

var _InVision = _interopRequireDefault(require("./InVision"));

var _JSFiddle = _interopRequireDefault(require("./JSFiddle"));

var _Loom = _interopRequireDefault(require("./Loom"));

var _Lucidchart = _interopRequireDefault(require("./Lucidchart"));

var _Marvel = _interopRequireDefault(require("./Marvel"));

var _Mindmeister = _interopRequireDefault(require("./Mindmeister"));

var _Miro = _interopRequireDefault(require("./Miro"));

var _ModeAnalytics = _interopRequireDefault(require("./ModeAnalytics"));

var _Otter = _interopRequireDefault(require("./Otter"));

var _Pitch = _interopRequireDefault(require("./Pitch"));

var _Prezi = _interopRequireDefault(require("./Prezi"));

var _Scribe = _interopRequireDefault(require("./Scribe"));

var _Spotify = _interopRequireDefault(require("./Spotify"));

var _Tldraw = _interopRequireDefault(require("./Tldraw"));

var _Trello = _interopRequireDefault(require("./Trello"));

var _Typeform = _interopRequireDefault(require("./Typeform"));

var _Vimeo = _interopRequireDefault(require("./Vimeo"));

var _Whimsical = _interopRequireDefault(require("./Whimsical"));

var _YouTube = _interopRequireDefault(require("./YouTube"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function matcher(Component) {
  return function (url) {
    // @ts-expect-error not aware of static
    var regexes = Component.ENABLED;

    var _iterator = _createForOfIteratorHelper(regexes),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var regex = _step.value;
        var result = url.match(regex);

        if (result) {
          return result;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return false;
  };
}

var Img = (0, _styledComponents.default)(_Image.default).withConfig({
  displayName: "embeds__Img",
  componentId: "dijc80-0"
})(["margin:4px;width:18px;height:18px;"]);
var embeds = [{
  title: "Abstract",
  keywords: "design",
  defaultHidden: true,
  icon: function icon() {
    return /*#__PURE__*/React.createElement(Img, {
      src: "/images/abstract.png",
      alt: "Abstract"
    });
  },
  component: _Abstract.default,
  matcher: matcher(_Abstract.default)
}, {
  title: "Airtable",
  keywords: "spreadsheet",
  icon: function icon() {
    return /*#__PURE__*/React.createElement(Img, {
      src: "/images/airtable.png",
      alt: "Airtable"
    });
  },
  component: _Airtable.default,
  matcher: matcher(_Airtable.default)
}, {
  title: "Berrycast",
  keywords: "video",
  defaultHidden: true,
  icon: function icon() {
    return /*#__PURE__*/React.createElement(Img, {
      src: "/images/berrycast.png",
      alt: "Berrycast"
    });
  },
  component: _Berrycast.default,
  matcher: matcher(_Berrycast.default)
}, {
  title: "Bilibili",
  keywords: "video",
  defaultHidden: true,
  icon: function icon() {
    return /*#__PURE__*/React.createElement(Img, {
      src: "/images/bilibili.png",
      alt: "Bilibili"
    });
  },
  component: _Bilibili.default,
  matcher: matcher(_Bilibili.default)
}, {
  title: "Cawemo",
  keywords: "bpmn process",
  defaultHidden: true,
  icon: function icon() {
    return /*#__PURE__*/React.createElement(Img, {
      src: "/images/cawemo.png",
      alt: "Cawemo"
    });
  },
  component: _Cawemo.default,
  matcher: matcher(_Cawemo.default)
}, {
  title: "ClickUp",
  keywords: "project",
  icon: function icon() {
    return /*#__PURE__*/React.createElement(Img, {
      src: "/images/clickup.png",
      alt: "ClickUp"
    });
  },
  component: _ClickUp.default,
  matcher: matcher(_ClickUp.default)
}, {
  title: "Codepen",
  keywords: "code editor",
  icon: function icon() {
    return /*#__PURE__*/React.createElement(Img, {
      src: "/images/codepen.png",
      alt: "Codepen"
    });
  },
  component: _Codepen.default,
  matcher: matcher(_Codepen.default)
}, {
  title: "DBDiagram",
  keywords: "diagrams database",
  icon: function icon() {
    return /*#__PURE__*/React.createElement(Img, {
      src: "/images/dbdiagram.png",
      alt: "DBDiagram"
    });
  },
  component: _DBDiagram.default,
  matcher: matcher(_DBDiagram.default)
}, {
  title: "Descript",
  keywords: "audio",
  icon: function icon() {
    return /*#__PURE__*/React.createElement(Img, {
      src: "/images/descript.png",
      alt: "Descript"
    });
  },
  component: _Descript.default,
  matcher: matcher(_Descript.default)
}, {
  title: "Figma",
  keywords: "design svg vector",
  icon: function icon() {
    return /*#__PURE__*/React.createElement(Img, {
      src: "/images/figma.png",
      alt: "Figma"
    });
  },
  component: _Figma.default,
  matcher: matcher(_Figma.default)
}, {
  title: "Framer",
  keywords: "design prototyping",
  icon: function icon() {
    return /*#__PURE__*/React.createElement(Img, {
      src: "/images/framer.png",
      alt: "Framer"
    });
  },
  component: _Framer.default,
  matcher: matcher(_Framer.default)
}, {
  title: "GitHub Gist",
  keywords: "code",
  icon: function icon() {
    return /*#__PURE__*/React.createElement(Img, {
      src: "/images/github-gist.png",
      alt: "GitHub"
    });
  },
  component: _Gist.default,
  matcher: matcher(_Gist.default)
}, {
  title: "Gliffy",
  keywords: "diagram",
  icon: function icon() {
    return /*#__PURE__*/React.createElement(Img, {
      src: "/images/gliffy.png",
      alt: "Gliffy"
    });
  },
  component: _Gliffy.default,
  matcher: matcher(_Gliffy.default)
}, {
  title: "Diagrams.net",
  keywords: "diagrams drawio",
  icon: function icon() {
    return /*#__PURE__*/React.createElement(Img, {
      src: "/images/diagrams.png",
      alt: "Diagrams.net"
    });
  },
  component: _Diagrams.default,
  matcher: matcher(_Diagrams.default)
}, {
  title: "Google Drawings",
  keywords: "drawings",
  icon: function icon() {
    return /*#__PURE__*/React.createElement(Img, {
      src: "/images/google-drawings.png",
      alt: "Google Drawings"
    });
  },
  component: _GoogleDrawings.default,
  matcher: matcher(_GoogleDrawings.default)
}, {
  title: "Google Drive",
  keywords: "drive",
  icon: function icon() {
    return /*#__PURE__*/React.createElement(Img, {
      src: "/images/google-drive.png",
      alt: "Google Drive"
    });
  },
  component: _GoogleDrive.default,
  matcher: matcher(_GoogleDrive.default)
}, {
  title: "Google Docs",
  keywords: "documents word",
  icon: function icon() {
    return /*#__PURE__*/React.createElement(Img, {
      src: "/images/google-docs.png",
      alt: "Google Docs"
    });
  },
  component: _GoogleDocs.default,
  matcher: matcher(_GoogleDocs.default)
}, {
  title: "Google Sheets",
  keywords: "excel spreadsheet",
  icon: function icon() {
    return /*#__PURE__*/React.createElement(Img, {
      src: "/images/google-sheets.png",
      alt: "Google Sheets"
    });
  },
  component: _GoogleSheets.default,
  matcher: matcher(_GoogleSheets.default)
}, {
  title: "Google Slides",
  keywords: "presentation slideshow",
  icon: function icon() {
    return /*#__PURE__*/React.createElement(Img, {
      src: "/images/google-slides.png",
      alt: "Google Slides"
    });
  },
  component: _GoogleSlides.default,
  matcher: matcher(_GoogleSlides.default)
}, {
  title: "Google Calendar",
  keywords: "calendar",
  icon: function icon() {
    return /*#__PURE__*/React.createElement(Img, {
      src: "/images/google-calendar.png",
      alt: "Google Calendar"
    });
  },
  component: _GoogleCalendar.default,
  matcher: matcher(_GoogleCalendar.default)
}, {
  title: "Google Data Studio",
  keywords: "bi business intelligence",
  icon: function icon() {
    return /*#__PURE__*/React.createElement(Img, {
      src: "/images/google-datastudio.png",
      alt: "Google Data Studio"
    });
  },
  component: _GoogleDataStudio.default,
  matcher: matcher(_GoogleDataStudio.default)
}, {
  title: "InVision",
  keywords: "design prototype",
  defaultHidden: true,
  icon: function icon() {
    return /*#__PURE__*/React.createElement(Img, {
      src: "/images/invision.png",
      alt: "InVision"
    });
  },
  component: _InVision.default,
  matcher: matcher(_InVision.default)
}, {
  title: "JSFiddle",
  keywords: "code",
  defaultHidden: true,
  icon: function icon() {
    return /*#__PURE__*/React.createElement(Img, {
      src: "/images/jsfiddle.png",
      alt: "JSFiddle"
    });
  },
  component: _JSFiddle.default,
  matcher: matcher(_JSFiddle.default)
}, {
  title: "Loom",
  keywords: "video screencast",
  icon: function icon() {
    return /*#__PURE__*/React.createElement(Img, {
      src: "/images/loom.png",
      alt: "Loom"
    });
  },
  component: _Loom.default,
  matcher: matcher(_Loom.default)
}, {
  title: "Lucidchart",
  keywords: "chart",
  icon: function icon() {
    return /*#__PURE__*/React.createElement(Img, {
      src: "/images/lucidchart.png",
      alt: "Lucidchart"
    });
  },
  component: _Lucidchart.default,
  matcher: matcher(_Lucidchart.default)
}, {
  title: "Marvel",
  keywords: "design prototype",
  icon: function icon() {
    return /*#__PURE__*/React.createElement(Img, {
      src: "/images/marvel.png",
      alt: "Marvel"
    });
  },
  component: _Marvel.default,
  matcher: matcher(_Marvel.default)
}, {
  title: "Mindmeister",
  keywords: "mindmap",
  icon: function icon() {
    return /*#__PURE__*/React.createElement(Img, {
      src: "/images/mindmeister.png",
      alt: "Mindmeister"
    });
  },
  component: _Mindmeister.default,
  matcher: matcher(_Mindmeister.default)
}, {
  title: "Miro",
  keywords: "whiteboard",
  icon: function icon() {
    return /*#__PURE__*/React.createElement(Img, {
      src: "/images/miro.png",
      alt: "Miro"
    });
  },
  component: _Miro.default,
  matcher: matcher(_Miro.default)
}, {
  title: "Mode",
  keywords: "analytics",
  defaultHidden: true,
  icon: function icon() {
    return /*#__PURE__*/React.createElement(Img, {
      src: "/images/mode-analytics.png",
      alt: "Mode"
    });
  },
  component: _ModeAnalytics.default,
  matcher: matcher(_ModeAnalytics.default)
}, {
  title: "Otter.ai",
  keywords: "audio transcription meeting notes",
  defaultHidden: true,
  icon: function icon() {
    return /*#__PURE__*/React.createElement(Img, {
      src: "/images/otter.png",
      alt: "Otter.ai"
    });
  },
  component: _Otter.default,
  matcher: matcher(_Otter.default)
}, {
  title: "Pitch",
  keywords: "presentation",
  defaultHidden: true,
  icon: function icon() {
    return /*#__PURE__*/React.createElement(Img, {
      src: "/images/pitch.png",
      alt: "Pitch"
    });
  },
  component: _Pitch.default,
  matcher: matcher(_Pitch.default)
}, {
  title: "Prezi",
  keywords: "presentation",
  icon: function icon() {
    return /*#__PURE__*/React.createElement(Img, {
      src: "/images/prezi.png",
      alt: "Prezi"
    });
  },
  component: _Prezi.default,
  matcher: matcher(_Prezi.default)
}, {
  title: "Scribe",
  keywords: "screencast",
  icon: function icon() {
    return /*#__PURE__*/React.createElement(Img, {
      src: "/images/scribe.png",
      alt: "Scribe"
    });
  },
  component: _Scribe.default,
  matcher: matcher(_Scribe.default)
}, {
  title: "Spotify",
  keywords: "music",
  icon: function icon() {
    return /*#__PURE__*/React.createElement(Img, {
      src: "/images/spotify.png",
      alt: "Spotify"
    });
  },
  component: _Spotify.default,
  matcher: matcher(_Spotify.default)
}, {
  title: "Tldraw",
  keywords: "draw schematics diagrams",
  icon: function icon() {
    return /*#__PURE__*/React.createElement(Img, {
      src: "/images/tldraw.png",
      alt: "Tldraw"
    });
  },
  component: _Tldraw.default,
  matcher: matcher(_Tldraw.default)
}, {
  title: "Trello",
  keywords: "kanban",
  icon: function icon() {
    return /*#__PURE__*/React.createElement(Img, {
      src: "/images/trello.png",
      alt: "Trello"
    });
  },
  component: _Trello.default,
  matcher: matcher(_Trello.default)
}, {
  title: "Typeform",
  keywords: "form survey",
  icon: function icon() {
    return /*#__PURE__*/React.createElement(Img, {
      src: "/images/typeform.png",
      alt: "Typeform"
    });
  },
  component: _Typeform.default,
  matcher: matcher(_Typeform.default)
}, {
  title: "Vimeo",
  keywords: "video",
  icon: function icon() {
    return /*#__PURE__*/React.createElement(Img, {
      src: "/images/vimeo.png",
      alt: "Vimeo"
    });
  },
  component: _Vimeo.default,
  matcher: matcher(_Vimeo.default)
}, {
  title: "Whimsical",
  keywords: "whiteboard",
  icon: function icon() {
    return /*#__PURE__*/React.createElement(Img, {
      src: "/images/whimsical.png",
      alt: "Whimsical"
    });
  },
  component: _Whimsical.default,
  matcher: matcher(_Whimsical.default)
}, {
  title: "YouTube",
  keywords: "google video",
  icon: function icon() {
    return /*#__PURE__*/React.createElement(Img, {
      src: "/images/youtube.png",
      alt: "YouTube"
    });
  },
  component: _YouTube.default,
  matcher: matcher(_YouTube.default)
}];
var _default = embeds;
exports.default = _default;