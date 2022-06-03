"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ioredis = _interopRequireDefault(require("ioredis"));

var _lodash = require("lodash");

var _env = _interopRequireDefault(require("./env"));

var _Logger = _interopRequireDefault(require("./logging/Logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const defaultOptions = {
  maxRetriesPerRequest: 20,

  retryStrategy(times) {
    _Logger.default.warn(`Retrying redis connection: attempt ${times}`);

    return Math.min(times * 100, 3000);
  },

  // support Heroku Redis, see:
  // https://devcenter.heroku.com/articles/heroku-redis#ioredis-module
  tls: (_env.default.REDIS_URL || "").startsWith("rediss://") ? {
    rejectUnauthorized: false
  } : undefined
};

class RedisAdapter extends _ioredis.default {
  constructor(url) {
    if (!url || !url.startsWith("ioredis://")) {
      super(_env.default.REDIS_URL, defaultOptions);
    } else {
      let customOptions = {};

      try {
        const decodedString = Buffer.from(url.slice(10), "base64").toString();
        customOptions = JSON.parse(decodedString);
      } catch (error) {
        throw new Error(`Failed to decode redis adapter options: ${error}`);
      }

      try {
        const mergedOptions = (0, _lodash.defaults)(defaultOptions, customOptions);
        super(mergedOptions);
      } catch (error) {
        throw new Error(`Failed to initialize redis client: ${error}`);
      }
    } // More than the default of 10 listeners is expected for the amount of queues
    // we're running. Increase the max here to prevent a warning in the console:
    // https://github.com/OptimalBits/bull/issues/1192


    this.setMaxListeners(100);
  }

  static get defaultClient() {
    return this._client || (this._client = new this(_env.default.REDIS_URL));
  }

  static get defaultSubscriber() {
    return this._subscriber || (this._subscriber = new this(_env.default.REDIS_URL));
  }

}

exports.default = RedisAdapter;