"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.languages = exports.languageOptions = exports.initI18n = void 0;

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.replace.js");

var _i18next = _interopRequireDefault(require("i18next"));

var _i18nextHttpBackend = _interopRequireDefault(require("i18next-http-backend"));

var _reactI18next = require("react-i18next");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Note: Updating the available languages? Make sure to also update the
// locales array in app/utils/i18n.js to enable translation for timestamps.
var languageOptions = [{
  label: "English (US)",
  value: "en_US"
}, {
  label: "简体中文 (Chinese, Simplified)",
  value: "zh_CN"
}, {
  label: "繁體中文 (Chinese, Traditional)",
  value: "zh_TW"
}, {
  label: "Deutsch (Deutschland)",
  value: "de_DE"
}, {
  label: "Español (España)",
  value: "es_ES"
}, {
  label: "فارسی (Persian)",
  value: "fa_IR"
}, {
  label: "Français (France)",
  value: "fr_FR"
}, {
  label: "Italiano (Italia)",
  value: "it_IT"
}, {
  label: "日本語 (Japanese)",
  value: "ja_JP"
}, {
  label: "한국어 (Korean)",
  value: "ko_KR"
}, {
  label: "Português (Brazil)",
  value: "pt_BR"
}, {
  label: "Português (Portugal)",
  value: "pt_PT"
}, {
  label: "Pусский (Россия)",
  value: "ru_RU"
}, {
  label: "Polskie (Polska)",
  value: "pl_PL"
}, {
  label: "Tiếng Việt (Vietnamese)",
  value: "vi_VN"
}, {
  label: "Türkçe (Turkish)",
  value: "tr_TR"
}];
exports.languageOptions = languageOptions;
var languages = languageOptions.map(function (i) {
  return i.value;
}); // Languages are stored in en_US format in the database, however the
// frontend translation framework (i18next) expects en-US

exports.languages = languages;

var underscoreToDash = function underscoreToDash(text) {
  return text.replace("_", "-");
};

var dashToUnderscore = function dashToUnderscore(text) {
  return text.replace("-", "_");
};

var initI18n = function initI18n() {
  var defaultLanguage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "en_US";
  var lng = underscoreToDash(defaultLanguage);

  _i18next.default.use(_i18nextHttpBackend.default).use(_reactI18next.initReactI18next).init({
    compatibilityJSON: "v3",
    backend: {
      // this must match the path defined in routes. It's the path that the
      // frontend UI code will hit to load missing translations.
      loadPath: function loadPath(languages) {
        return "/locales/".concat(dashToUnderscore(languages[0]), ".json");
      }
    },
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    },
    lng: lng,
    fallbackLng: lng,
    supportedLngs: languages.map(underscoreToDash),
    // Uncomment when debugging translation framework, otherwise it's noisy
    keySeparator: false
  });

  return _i18next.default;
};

exports.initI18n = initI18n;