"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.websocketQueue = exports.taskQueue = exports.processorEventQueue = exports.globalEventQueue = void 0;

var _queue = require("./../utils/queue");

const globalEventQueue = (0, _queue.createQueue)("globalEvents", {
  attempts: 5,
  backoff: {
    type: "exponential",
    delay: 1000
  }
});
exports.globalEventQueue = globalEventQueue;
const processorEventQueue = (0, _queue.createQueue)("processorEvents", {
  attempts: 5,
  backoff: {
    type: "exponential",
    delay: 10 * 1000
  }
});
exports.processorEventQueue = processorEventQueue;
const websocketQueue = (0, _queue.createQueue)("websockets", {
  timeout: 10 * 1000
});
exports.websocketQueue = websocketQueue;
const taskQueue = (0, _queue.createQueue)("tasks", {
  attempts: 5,
  backoff: {
    type: "exponential",
    delay: 10 * 1000
  }
});
exports.taskQueue = taskQueue;