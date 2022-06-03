"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.requestErrorHandler = requestErrorHandler;

var Sentry = _interopRequireWildcard(require("@sentry/node"));

var _env = _interopRequireDefault(require("./../env"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

if (_env.default.SENTRY_DSN) {
  Sentry.init({
    dsn: _env.default.SENTRY_DSN,
    environment: _env.default.ENVIRONMENT,
    release: _env.default.RELEASE,
    maxBreadcrumbs: 0,
    ignoreErrors: [// emitted by Koa when bots attempt to snoop on paths such as wp-admin
    // or the user client submits a bad request. These are expected in normal
    // running of the application and don't need to be reported.
    "BadRequestError", "UnauthorizedError"]
  });
}

function requestErrorHandler(error, ctx) {
  // we don't need to report every time a request stops to the bug tracker
  if (error.code === "EPIPE" || error.code === "ECONNRESET") {
    console.warn("Connection error", {
      error
    });
    return;
  }

  if (_env.default.SENTRY_DSN) {
    Sentry.withScope(function (scope) {
      var _ctx$state, _ctx$state2, _ctx$state2$user, _ctx$state3, _ctx$state3$user;

      const requestId = ctx.headers["x-request-id"];

      if (requestId) {
        scope.setTag("request_id", requestId);
      }

      const authType = ((_ctx$state = ctx.state) === null || _ctx$state === void 0 ? void 0 : _ctx$state.authType) ?? undefined;

      if (authType) {
        scope.setTag("auth_type", authType);
      }

      const teamId = ((_ctx$state2 = ctx.state) === null || _ctx$state2 === void 0 ? void 0 : (_ctx$state2$user = _ctx$state2.user) === null || _ctx$state2$user === void 0 ? void 0 : _ctx$state2$user.teamId) ?? undefined;

      if (teamId) {
        scope.setTag("team_id", teamId);
      }

      const userId = ((_ctx$state3 = ctx.state) === null || _ctx$state3 === void 0 ? void 0 : (_ctx$state3$user = _ctx$state3.user) === null || _ctx$state3$user === void 0 ? void 0 : _ctx$state3$user.id) ?? undefined;

      if (userId) {
        scope.setUser({
          id: userId
        });
      }

      scope.addEventProcessor(function (event) {
        return Sentry.Handlers.parseRequest(event, ctx.request);
      });
      Sentry.captureException(error);
    });
  } else {
    console.error(error);
  }
}

var _default = Sentry;
exports.default = _default;