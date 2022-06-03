"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createQueue = createQueue;

var _bull = _interopRequireDefault(require("bull"));

var _lodash = require("lodash");

var _env = _interopRequireDefault(require("./../env"));

var _metrics = _interopRequireDefault(require("./../logging/metrics"));

var _redis = _interopRequireDefault(require("../redis"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createQueue(name, defaultJobOptions) {
  const prefix = `queue.${(0, _lodash.snakeCase)(name)}`;
  const queue = new _bull.default(name, {
    createClient(type) {
      switch (type) {
        case "client":
          return _redis.default.defaultClient;

        case "subscriber":
          return _redis.default.defaultSubscriber;

        default:
          return new _redis.default(_env.default.REDIS_URL);
      }
    },

    defaultJobOptions: {
      removeOnComplete: true,
      removeOnFail: true,
      ...defaultJobOptions
    }
  });
  queue.on("stalled", () => {
    _metrics.default.increment(`${prefix}.jobs.stalled`);
  });
  queue.on("completed", () => {
    _metrics.default.increment(`${prefix}.jobs.completed`);
  });
  queue.on("error", () => {
    _metrics.default.increment(`${prefix}.jobs.errored`);
  });
  queue.on("failed", () => {
    _metrics.default.increment(`${prefix}.jobs.failed`);
  });
  setInterval(async () => {
    _metrics.default.gauge(`${prefix}.count`, await queue.count());

    _metrics.default.gauge(`${prefix}.delayed_count`, await queue.getDelayedCount());
  }, 5 * 1000);
  return queue;
}