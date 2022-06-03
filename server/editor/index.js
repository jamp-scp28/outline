"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serializer = exports.schema = exports.renderToHtml = exports.parser = void 0;

var _prosemirrorModel = require("prosemirror-model");

var _ExtensionManager = _interopRequireDefault(require("./../../shared/editor/lib/ExtensionManager"));

var _full = _interopRequireDefault(require("./../../shared/editor/packages/full"));

var _renderToHtml = _interopRequireDefault(require("./renderToHtml"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const extensions = new _ExtensionManager.default(_full.default);
const schema = new _prosemirrorModel.Schema({
  nodes: extensions.nodes,
  marks: extensions.marks
});
exports.schema = schema;
const parser = extensions.parser({
  schema,
  plugins: extensions.rulePlugins
});
exports.parser = parser;
const serializer = extensions.serializer();
exports.serializer = serializer;

const renderToHtml = markdown => (0, _renderToHtml.default)(markdown, extensions.rulePlugins);

exports.renderToHtml = renderToHtml;