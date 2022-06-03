"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _chalk = _interopRequireDefault(require("chalk"));

var _lodash = require("lodash");

var _winston = _interopRequireDefault(require("winston"));

var _env = _interopRequireDefault(require("./../env"));

var _metrics = _interopRequireDefault(require("./metrics"));

var _sentry = _interopRequireDefault(require("./sentry"));

var Tracing = _interopRequireWildcard(require("./tracing"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isProduction = _env.default.ENVIRONMENT === "production";

class Logger {
  constructor() {
    this.output = _winston.default.createLogger();
    this.output.add(new _winston.default.transports.Console({
      format: isProduction ? _winston.default.format.json() : _winston.default.format.combine(_winston.default.format.colorize(), _winston.default.format.printf(({
        message,
        level,
        label,
        ...extra
      }) => `${level}: ${label ? _chalk.default.bold("[" + label + "] ") : ""}${message} ${(0, _lodash.isEmpty)(extra) ? "" : JSON.stringify(extra)}`))
    }));
  }
  /**
   * Log information
   *
   * @param category A log message category that will be prepended
   * @param extra Arbitrary data to be logged that will appear in prod logs
   */


  info(label, message, extra) {
    this.output.info(message, { ...extra,
      label
    });
  }
  /**
   * Debug information
   *
   * @param category A log message category that will be prepended
   * @param extra Arbitrary data to be logged that will appear in prod logs
   */


  debug(label, message, extra) {
    this.output.debug(message, { ...extra,
      label
    });
  }
  /**
   * Log a warning
   *
   * @param message A warning message
   * @param extra Arbitrary data to be logged that will appear in prod logs
   */


  warn(message, extra) {
    _metrics.default.increment("logger.warning");

    if (_env.default.SENTRY_DSN) {
      _sentry.default.withScope(function (scope) {
        scope.setLevel(_sentry.default.Severity.Warning);

        for (const key in extra) {
          scope.setExtra(key, extra[key]);
        }

        _sentry.default.captureMessage(message);
      });
    }

    if (isProduction) {
      this.output.warn(message, extra);
    } else if (extra) {
      console.warn(message, extra);
    } else {
      console.warn(message);
    }
  }
  /**
   * Report a runtime error
   *
   * @param message A description of the error
   * @param error The error that occurred
   * @param extra Arbitrary data to be logged that will appear in prod logs
   */


  error(message, error, extra) {
    _metrics.default.increment("logger.error");

    Tracing.setError(error);

    if (_env.default.SENTRY_DSN) {
      _sentry.default.withScope(function (scope) {
        scope.setLevel(_sentry.default.Severity.Error);

        for (const key in extra) {
          scope.setExtra(key, extra[key]);
        }

        _sentry.default.captureException(error);
      });
    }

    if (isProduction) {
      this.output.error(message, {
        error: error.message,
        stack: error.stack
      });
    } else {
      console.error(message, {
        error,
        extra
      });
    }
  }

}

var _default = new Logger();

exports.default = _default;