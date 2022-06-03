"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSSLOptions = getSSLOptions;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _env = _interopRequireDefault(require("../env"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Find if SSL certs are available in the environment or filesystem and return
 * as a valid ServerOptions object
 */
function getSSLOptions() {
  function safeReadFile(name) {
    try {
      return _fs.default.readFileSync(_path.default.normalize(`${__dirname}/../../../${name}`), "utf8");
    } catch (err) {
      return undefined;
    }
  }

  try {
    return {
      key: (_env.default.SSL_KEY ? Buffer.from(_env.default.SSL_KEY, "base64").toString("ascii") : undefined) || safeReadFile("private.key") || safeReadFile("private.pem"),
      cert: (_env.default.SSL_CERT ? Buffer.from(_env.default.SSL_CERT, "base64").toString("ascii") : undefined) || safeReadFile("public.cert") || safeReadFile("public.pem")
    };
  } catch (err) {
    return {
      key: undefined,
      cert: undefined
    };
  }
}