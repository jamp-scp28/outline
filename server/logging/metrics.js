"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _datadogMetrics = _interopRequireDefault(require("datadog-metrics"));

var _env = _interopRequireDefault(require("./../env"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Metrics {
  constructor() {
    _defineProperty(this, "enabled", !!_env.default.DD_API_KEY);

    if (!this.enabled) {
      return;
    }

    _datadogMetrics.default.init({
      apiKey: _env.default.DD_API_KEY,
      prefix: "outline.",
      defaultTags: [`env:${process.env.DD_ENV ?? _env.default.ENVIRONMENT}`]
    });
  }

  gauge(key, value, tags) {
    if (!this.enabled) {
      return;
    }

    return _datadogMetrics.default.gauge(key, value, tags);
  }

  gaugePerInstance(key, value, tags = []) {
    if (!this.enabled) {
      return;
    }

    const instanceId = process.env.INSTANCE_ID || process.env.HEROKU_DYNO_ID;

    if (!instanceId) {
      throw new Error("INSTANCE_ID or HEROKU_DYNO_ID must be set when using DataDog");
    }

    return _datadogMetrics.default.gauge(key, value, [...tags, `instance:${instanceId}`]);
  }

  increment(key, _tags) {
    if (!this.enabled) {
      return;
    }

    return _datadogMetrics.default.increment(key);
  }

}

var _default = new Metrics();

exports.default = _default;