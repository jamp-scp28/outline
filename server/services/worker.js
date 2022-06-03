"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = init;

var _Logger = _interopRequireDefault(require("./../logging/Logger"));

var Tracing = _interopRequireWildcard(require("./../logging/tracing"));

var _queues = require("../queues");

var _processors = _interopRequireDefault(require("../queues/processors"));

var _tasks = _interopRequireDefault(require("../queues/tasks"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function init() {
  // This queue processes the global event bus
  _queues.globalEventQueue.process(Tracing.APM.traceFunction({
    serviceName: "worker",
    spanName: "process",
    isRoot: true
  })(async function (job) {
    const event = job.data;
    let err;
    Tracing.setResource(`Event.${event.name}`);

    _Logger.default.info("worker", `Processing ${event.name}`, {
      name: event.name,
      modelId: event.modelId,
      attempt: job.attemptsMade
    }); // For each registered processor we check to see if it wants to handle the
    // event (applicableEvents), and if so add a new queued job specifically
    // for that processor.


    for (const name in _processors.default) {
      const ProcessorClass = _processors.default[name];

      if (!ProcessorClass) {
        throw new Error(`Received event "${event.name}" for processor (${name}) that isn't registered. Check the file name matches the class name.`);
      }

      try {
        if (name === "WebsocketsProcessor") {
          // websockets are a special case on their own queue because they must
          // only be consumed by the websockets service rather than workers.
          await _queues.websocketQueue.add(job.data);
        } else if (ProcessorClass.applicableEvents.includes(event.name) || ProcessorClass.applicableEvents.includes("*")) {
          await _queues.processorEventQueue.add({
            event,
            name
          });
        }
      } catch (error) {
        _Logger.default.error(`Error adding ${event.name} to ${name} queue`, error, event);

        err = error;
      }
    }

    if (err) {
      throw err;
    }
  })); // Jobs for individual processors are processed here. Only applicable events
  // as unapplicable events were filtered in the global event queue above.


  _queues.processorEventQueue.process(Tracing.APM.traceFunction({
    serviceName: "worker",
    spanName: "process",
    isRoot: true
  })(async function (job) {
    const {
      event,
      name
    } = job.data;
    const ProcessorClass = _processors.default[name];
    Tracing.setResource(`Processor.${name}`);

    if (!ProcessorClass) {
      throw new Error(`Received event "${event.name}" for processor (${name}) that isn't registered. Check the file name matches the class name.`);
    }

    const processor = new ProcessorClass();

    if (processor.perform) {
      _Logger.default.info("worker", `${name} running ${event.name}`, {
        name: event.name,
        modelId: event.modelId
      });

      try {
        await processor.perform(event);
      } catch (err) {
        _Logger.default.error(`Error processing ${event.name} in ${name}`, err, event);

        throw err;
      }
    }
  })); // Jobs for async tasks are processed here.


  _queues.taskQueue.process(Tracing.APM.traceFunction({
    serviceName: "worker",
    spanName: "process",
    isRoot: true
  })(async function (job) {
    const {
      name,
      props
    } = job.data;
    const TaskClass = _tasks.default[name];
    Tracing.setResource(`Task.${name}`);

    if (!TaskClass) {
      throw new Error(`Task "${name}" is not registered. Check the file name matches the class name.`);
    }

    _Logger.default.info("worker", `${name} running`, props);

    const task = new TaskClass();

    try {
      await task.perform(props);
    } catch (err) {
      _Logger.default.error(`Error processing task in ${name}`, err, props);

      throw err;
    }
  }));
}