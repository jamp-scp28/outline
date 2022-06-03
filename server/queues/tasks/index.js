"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = require("./../../utils/fs");

const tasks = {};
(0, _fs.requireDirectory)(__dirname).forEach(([module, id]) => {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'default' does not exist on type 'unknown'
  const {
    default: Task
  } = module;

  if (id === "index") {
    return;
  }

  tasks[id] = Task;
});
var _default = tasks;
exports.default = _default;