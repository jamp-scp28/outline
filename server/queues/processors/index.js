"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = require("./../../utils/fs");

const processors = {};
(0, _fs.requireDirectory)(__dirname).forEach(([module, id]) => {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'default' does not exist on type 'unknown'
  const {
    default: Processor
  } = module;

  if (id === "index") {
    return;
  }

  processors[id] = Processor;
});
var _default = processors;
exports.default = _default;