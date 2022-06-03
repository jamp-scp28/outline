"use strict";

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.object.get-own-property-descriptors.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.regexp.exec.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.array.reduce.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.object.entries.js");

var _prosemirrorKeymap = require("prosemirror-keymap");

var _prosemirrorMarkdown = require("prosemirror-markdown");

var _rules = _interopRequireDefault(require("./markdown/rules"));

var _serializer = require("./markdown/serializer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var ExtensionManager = /*#__PURE__*/function () {
  function ExtensionManager() {
    var _this = this;

    var extensions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var editor = arguments.length > 1 ? arguments[1] : undefined;

    _classCallCheck(this, ExtensionManager);

    this.extensions = [];
    extensions.forEach(function (ext) {
      var extension;

      if (typeof ext === "function") {
        extension = new ext(editor === null || editor === void 0 ? void 0 : editor.props);
      } else {
        extension = ext;
      }

      if (editor) {
        extension.bindEditor(editor);
      }

      _this.extensions.push(extension);
    });
  }

  _createClass(ExtensionManager, [{
    key: "nodes",
    get: function get() {
      return this.extensions.filter(function (extension) {
        return extension.type === "node";
      }).reduce(function (nodes, node) {
        return _objectSpread(_objectSpread({}, nodes), {}, _defineProperty({}, node.name, node.schema));
      }, {});
    }
  }, {
    key: "serializer",
    value: function serializer() {
      var nodes = this.extensions.filter(function (extension) {
        return extension.type === "node";
      }).reduce(function (nodes, extension) {
        return _objectSpread(_objectSpread({}, nodes), {}, _defineProperty({}, extension.name, extension.toMarkdown));
      }, {});
      var marks = this.extensions.filter(function (extension) {
        return extension.type === "mark";
      }).reduce(function (marks, extension) {
        return _objectSpread(_objectSpread({}, marks), {}, _defineProperty({}, extension.name, extension.toMarkdown));
      }, {});
      return new _serializer.MarkdownSerializer(nodes, marks);
    }
  }, {
    key: "parser",
    value: function parser(_ref) {
      var schema = _ref.schema,
          rules = _ref.rules,
          plugins = _ref.plugins;
      var tokens = this.extensions.filter(function (extension) {
        return extension.type === "mark" || extension.type === "node";
      }).reduce(function (nodes, extension) {
        var md = extension.parseMarkdown();

        if (!md) {
          return nodes;
        }

        return _objectSpread(_objectSpread({}, nodes), {}, _defineProperty({}, extension.markdownToken || extension.name, md));
      }, {});
      return new _prosemirrorMarkdown.MarkdownParser(schema, (0, _rules.default)({
        rules: rules,
        plugins: plugins
      }), tokens);
    }
  }, {
    key: "marks",
    get: function get() {
      return this.extensions.filter(function (extension) {
        return extension.type === "mark";
      }).reduce(function (marks, _ref2) {
        var name = _ref2.name,
            schema = _ref2.schema;
        return _objectSpread(_objectSpread({}, marks), {}, _defineProperty({}, name, schema));
      }, {});
    }
  }, {
    key: "plugins",
    get: function get() {
      return this.extensions.filter(function (extension) {
        return "plugins" in extension;
      }).reduce(function (allPlugins, _ref3) {
        var plugins = _ref3.plugins;
        return [].concat(_toConsumableArray(allPlugins), _toConsumableArray(plugins));
      }, []);
    }
  }, {
    key: "rulePlugins",
    get: function get() {
      return this.extensions.filter(function (extension) {
        return "rulePlugins" in extension;
      }).reduce(function (allRulePlugins, _ref4) {
        var rulePlugins = _ref4.rulePlugins;
        return [].concat(_toConsumableArray(allRulePlugins), _toConsumableArray(rulePlugins));
      }, []);
    }
  }, {
    key: "keymaps",
    value: function keymaps(_ref5) {
      var schema = _ref5.schema;
      var keymaps = this.extensions.filter(function (extension) {
        return extension.keys;
      }).map(function (extension) {
        return ["node", "mark"].includes(extension.type) ? extension.keys({
          type: schema["".concat(extension.type, "s")][extension.name],
          schema: schema
        }) : extension.keys({
          schema: schema
        });
      });
      return keymaps.map(_prosemirrorKeymap.keymap);
    }
  }, {
    key: "inputRules",
    value: function inputRules(_ref6) {
      var schema = _ref6.schema;
      var extensionInputRules = this.extensions.filter(function (extension) {
        return ["extension"].includes(extension.type);
      }).filter(function (extension) {
        return extension.inputRules;
      }).map(function (extension) {
        return extension.inputRules({
          schema: schema
        });
      });
      var nodeMarkInputRules = this.extensions.filter(function (extension) {
        return ["node", "mark"].includes(extension.type);
      }).filter(function (extension) {
        return extension.inputRules;
      }).map(function (extension) {
        return extension.inputRules({
          type: schema["".concat(extension.type, "s")][extension.name],
          schema: schema
        });
      });
      return [].concat(_toConsumableArray(extensionInputRules), _toConsumableArray(nodeMarkInputRules)).reduce(function (allInputRules, inputRules) {
        return [].concat(_toConsumableArray(allInputRules), _toConsumableArray(inputRules));
      }, []);
    }
  }, {
    key: "commands",
    value: function commands(_ref7) {
      var schema = _ref7.schema,
          view = _ref7.view;
      return this.extensions.filter(function (extension) {
        return extension.commands;
      }).reduce(function (allCommands, extension) {
        var name = extension.name,
            type = extension.type;
        var commands = {}; // @ts-expect-error FIXME

        var value = extension.commands(_objectSpread({
          schema: schema
        }, ["node", "mark"].includes(type) ? {
          type: schema["".concat(type, "s")][name]
        } : {}));

        var apply = function apply(callback, attrs) {
          if (!view.editable) {
            return false;
          }

          view.focus();
          return callback(attrs)(view.state, view.dispatch, view);
        };

        var handle = function handle(_name, _value) {
          if (Array.isArray(_value)) {
            commands[_name] = function (attrs) {
              return _value.forEach(function (callback) {
                return apply(callback, attrs);
              });
            };
          } else if (typeof _value === "function") {
            commands[_name] = function (attrs) {
              return apply(_value, attrs);
            };
          }
        };

        if (_typeof(value) === "object") {
          Object.entries(value).forEach(function (_ref8) {
            var _ref9 = _slicedToArray(_ref8, 2),
                commandName = _ref9[0],
                commandValue = _ref9[1];

            handle(commandName, commandValue);
          });
        } else {
          handle(name, value);
        }

        return _objectSpread(_objectSpread({}, allCommands), commands);
      }, {});
    }
  }]);

  return ExtensionManager;
}();

exports.default = ExtensionManager;