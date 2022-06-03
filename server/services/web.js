"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = init;

var _koa = _interopRequireDefault(require("koa"));

var _koaHelmet = require("koa-helmet");

var _koaMount = _interopRequireDefault(require("koa-mount"));

var _env = _interopRequireDefault(require("./../env"));

var _Logger = _interopRequireDefault(require("./../logging/Logger"));

var _routes = _interopRequireDefault(require("../routes"));

var _api = _interopRequireDefault(require("../routes/api"));

var _auth = _interopRequireDefault(require("../routes/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable @typescript-eslint/no-var-requires */
const isProduction = _env.default.ENVIRONMENT === "production";
const isTest = _env.default.ENVIRONMENT === "test"; // Construct scripts CSP based on services in use by this installation

const defaultSrc = ["'self'"];
const scriptSrc = ["'self'", "'unsafe-inline'", "'unsafe-eval'", "gist.github.com"];

if (_env.default.GOOGLE_ANALYTICS_ID) {
  scriptSrc.push("www.google-analytics.com");
}

if (_env.default.CDN_URL) {
  scriptSrc.push(_env.default.CDN_URL);
  defaultSrc.push(_env.default.CDN_URL);
}

function init(app = new _koa.default()) {
  if (isProduction) {
    // Force redirect to HTTPS protocol unless explicitly disabled
    if (_env.default.FORCE_HTTPS) {
      _Logger.default.info("ok..."); // app.use(
      //   enforceHttps({
      //     // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ trustProtoHeader: boolean; }' ... Remove this comment to see the full error message
      //     trustProtoHeader: true,
      //   })
      // );

    } else {
      _Logger.default.warn("Enforced https was disabled with FORCE_HTTPS env variable");
    } // trust header fields set by our proxy. eg X-Forwarded-For


    app.proxy = false;
  } else if (!isTest) {
    const convert = require("koa-convert");

    const webpack = require("webpack");

    const devMiddleware = require("koa-webpack-dev-middleware");

    const hotMiddleware = require("koa-webpack-hot-middleware");

    const config = require("../../webpack.config.dev");

    const compile = webpack(config);
    /* eslint-enable global-require */

    const middleware = devMiddleware(compile, {
      // display no info to console (only warnings and errors)
      noInfo: true,
      // display nothing to the console
      quiet: false,
      watchOptions: {
        poll: 1000,
        ignored: ["node_modules", "flow-typed", "server", "build", "__mocks__"]
      },
      // public path to bind the middleware to
      // use the same as in webpack
      publicPath: config.output.publicPath,
      // options for formatting the statistics
      stats: {
        colors: true
      }
    });
    app.use(async (ctx, next) => {
      ctx.webpackConfig = config;
      ctx.devMiddleware = middleware;
      await next();
    });
    app.use(convert(middleware));
    app.use(convert(hotMiddleware(compile, {
      // @ts-expect-error ts-migrate(7019) FIXME: Rest parameter 'args' implicitly has an 'any[]' ty... Remove this comment to see the full error message
      log: (...args) => _Logger.default.info("lifecycle", ...args),
      path: "/__webpack_hmr",
      heartbeat: 10 * 1000
    })));
  }

  app.use((0, _koaMount.default)("/auth", _auth.default));
  app.use((0, _koaMount.default)("/api", _api.default)); // Sets common security headers by default, such as no-sniff, hsts, hide powered
  // by etc, these are applied after auth and api so they are only returned on
  // standard non-XHR accessed routes

  app.use((0, _koaHelmet.contentSecurityPolicy)({
    directives: {
      defaultSrc,
      scriptSrc,
      styleSrc: ["'self'", "'unsafe-inline'", "github.githubassets.com"],
      imgSrc: ["*", "data:", "blob:"],
      frameSrc: ["*", "data:"],
      connectSrc: ["*"] // Do not use connect-src: because self + websockets does not work in
      // Safari, ref: https://bugs.webkit.org/show_bug.cgi?id=201591

    }
  })); // Allow DNS prefetching for performance, we do not care about leaking requests
  // to our own CDN's

  app.use((0, _koaHelmet.dnsPrefetchControl)({
    allow: true
  }));
  app.use((0, _koaHelmet.referrerPolicy)({
    policy: "no-referrer"
  }));
  app.use((0, _koaMount.default)(_routes.default));
  return app;
}