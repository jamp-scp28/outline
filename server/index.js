"use strict";

var _env = _interopRequireDefault(require("./env"));

require("./logging/tracing");

var _http = _interopRequireDefault(require("http"));

var _koa = _interopRequireDefault(require("koa"));

var _koaCompress = _interopRequireDefault(require("koa-compress"));

var _koaHelmet = _interopRequireDefault(require("koa-helmet"));

var _koaLogger = _interopRequireDefault(require("koa-logger"));

var _koaOnerror = _interopRequireDefault(require("koa-onerror"));

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _lodash = require("lodash");

var _stoppable = _interopRequireDefault(require("stoppable"));

var _throng = _interopRequireDefault(require("throng"));

var _Logger = _interopRequireDefault(require("./logging/Logger"));

var _sentry = require("./logging/sentry");

var _services = _interopRequireDefault(require("./services"));

var _args = require("./utils/args");

var _ssl = require("./utils/ssl");

var _startup = require("./utils/startup");

var _updates = require("./utils/updates");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/order */
// must come before importing any instrumented module
// If a services flag is passed it takes priority over the environment variable
// for example: --services=web,worker
const normalizedServiceFlag = (0, _args.getArg)("services"); // The default is to run all services to make development and OSS installations
// easier to deal with. Separate services are only needed at scale.

const serviceNames = (0, _lodash.uniq)((normalizedServiceFlag || _env.default.SERVICES).split(",").map(service => service.trim())); // The number of processes to run, defaults to the number of CPU's available
// for the web service, and 1 for collaboration during the beta period.

let processCount = _env.default.WEB_CONCURRENCY;

if (serviceNames.includes("collaboration")) {
  if (processCount !== 1) {
    _Logger.default.info("lifecycle", "Note: Restricting process count to 1 due to use of collaborative service");
  }

  processCount = 1;
} // This function will only be called once in the original process


async function master() {
  await (0, _startup.checkEnv)();
  await (0, _startup.checkMigrations)();

  if (_env.default.TELEMETRY && _env.default.ENVIRONMENT === "production") {
    (0, _updates.checkUpdates)();
    setInterval(_updates.checkUpdates, 24 * 3600 * 1000);
  }
} // This function will only be called in each forked process


async function start(id, disconnect) {
  // Find if SSL certs are available
  const ssl = (0, _ssl.getSSLOptions)();
  const useHTTPS = !!ssl.key && !!ssl.cert; // If a --port flag is passed then it takes priority over the env variable

  const normalizedPortFlag = (0, _args.getArg)("port", "p");
  const app = new _koa.default();
  const server = (0, _stoppable.default)(_http.default.createServer(app.callback()));
  const router = new _koaRouter.default(); // install basic middleware shared by all services

  if (_env.default.DEBUG.includes("http")) {
    app.use((0, _koaLogger.default)(str => _Logger.default.info("http", str)));
  }

  app.use((0, _koaCompress.default)());
  app.use((0, _koaHelmet.default)()); // catch errors in one place, automatically set status and response headers

  (0, _koaOnerror.default)(app);
  app.on("error", _sentry.requestErrorHandler); // install health check endpoint for all services

  router.get("/_health", ctx => ctx.body = "OK");
  app.use(router.routes()); // loop through requested services at startup

  for (const name of serviceNames) {
    if (!Object.keys(_services.default).includes(name)) {
      throw new Error(`Unknown service ${name}`);
    }

    _Logger.default.info("lifecycle", `Starting ${name} service`);

    const init = _services.default[name];
    await init(app, server);
  }

  server.on("error", err => {
    throw err;
  });
  server.on("listening", () => {
    const address = server.address();

    _Logger.default.info("lifecycle", `Listening on http://localhost:${address.port}`);
  });
  server.listen(normalizedPortFlag || _env.default.PORT || "3000");
  process.once("SIGTERM", shutdown);
  process.once("SIGINT", shutdown);

  function shutdown() {
    _Logger.default.info("lifecycle", "Stopping server");

    server.emit("shutdown");
    server.stop(disconnect);
  }
}

(0, _throng.default)({
  master,
  worker: start,
  count: processCount
});