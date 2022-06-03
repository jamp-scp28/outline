"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _util = _interopRequireDefault(require("util"));

var _koa = _interopRequireDefault(require("koa"));

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _koaSend = _interopRequireDefault(require("koa-send"));

var _koaStatic = _interopRequireDefault(require("koa-static"));

var _lodash = require("lodash");

var _isUUID = _interopRequireDefault(require("validator/lib/isUUID"));

var _i18n = require("./../../shared/i18n");

var _env = _interopRequireDefault(require("./../env"));

var _errors = require("./../errors");

var _Share = _interopRequireDefault(require("./../models/Share"));

var _opensearch = require("./../utils/opensearch");

var _prefetchTags = _interopRequireDefault(require("./../utils/prefetchTags"));

var _robots = require("./../utils/robots");

var _apexRedirect = _interopRequireDefault(require("../middlewares/apexRedirect"));

var _env2 = _interopRequireDefault(require("../presenters/env"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isProduction = _env.default.ENVIRONMENT === "production";
const isTest = _env.default.ENVIRONMENT === "test";
const koa = new _koa.default();
const router = new _koaRouter.default();

const readFile = _util.default.promisify(_fs.default.readFile);

const readIndexFile = async ctx => {
  if (isProduction) {
    return readFile(_path.default.join(__dirname, "../../app/index.html"));
  }

  if (isTest) {
    return readFile(_path.default.join(__dirname, "../static/index.html"));
  }

  const middleware = ctx.devMiddleware;
  await new Promise(resolve => middleware.waitUntilValid(resolve));
  return new Promise((resolve, reject) => {
    middleware.fileSystem.readFile(`${ctx.webpackConfig.output.path}/index.html`, (err, result) => {
      if (err) {
        return reject(err);
      }

      resolve(result);
    });
  });
};

const renderApp = async (ctx, next, options = {}) => {
  const {
    title = "Outline",
    description = "A modern team knowledge base for your internal documentation, product specs, support answers, meeting notes, onboarding, &amp; more…",
    canonical = ctx.request.href
  } = options;

  if (ctx.request.path === "/realtime/") {
    return next();
  }

  const {
    shareId
  } = ctx.params;
  const page = await readIndexFile(ctx);
  const environment = `
    window.env = ${JSON.stringify((0, _env2.default)(_env.default))};
  `;
  ctx.body = page.toString().replace(/\/\/inject-env\/\//g, environment).replace(/\/\/inject-title\/\//g, (0, _lodash.escape)(title)).replace(/\/\/inject-description\/\//g, (0, _lodash.escape)(description)).replace(/\/\/inject-canonical\/\//g, canonical).replace(/\/\/inject-prefetch\/\//g, shareId ? "" : _prefetchTags.default).replace(/\/\/inject-slack-app-id\/\//g, _env.default.SLACK_APP_ID || "");
};

const renderShare = async (ctx, next) => {
  var _share, _share$document, _share2, _share2$document;

  const {
    shareId
  } = ctx.params; // Find the share record if publicly published so that the document title
  // can be be returned in the server-rendered HTML. This allows it to appear in
  // unfurls with more reliablity

  let share;

  if ((0, _isUUID.default)(shareId)) {
    share = await _Share.default.findOne({
      where: {
        id: shareId,
        published: true
      }
    });
  } // Allow shares to be embedded in iframes on other websites


  ctx.remove("X-Frame-Options"); // Inject share information in SSR HTML

  return renderApp(ctx, next, {
    title: (_share = share) === null || _share === void 0 ? void 0 : (_share$document = _share.document) === null || _share$document === void 0 ? void 0 : _share$document.title,
    description: (_share2 = share) === null || _share2 === void 0 ? void 0 : (_share2$document = _share2.document) === null || _share2$document === void 0 ? void 0 : _share2$document.getSummary(),
    canonical: share ? ctx.request.href.replace(ctx.request.origin, share.team.url) : undefined
  });
}; // serve static assets


koa.use((0, _koaStatic.default)(_path.default.resolve(__dirname, "../../../public"), {
  maxage: 60 * 60 * 24 * 30 * 1000
}));

if (isProduction) {
  router.get("/static/*", async ctx => {
    try {
      const pathname = ctx.path.substring(8);

      if (!pathname) {
        throw (0, _errors.NotFoundError)();
      }

      await (0, _koaSend.default)(ctx, pathname, {
        root: _path.default.join(__dirname, "../../app/"),
        setHeaders: res => {
          res.setHeader("Service-Worker-Allowed", "/");
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.setHeader("Cache-Control", `max-age=${365 * 24 * 60 * 60}`);
        }
      });
    } catch (err) {
      if (err.status === 404) {
        // Serve a bad request instead of not found if the file doesn't exist
        // This prevents CDN's from caching the response, allowing them to continue
        // serving old file versions
        ctx.status = 400;
        return;
      }

      throw err;
    }
  });
}

router.get("/locales/:lng.json", async ctx => {
  const {
    lng
  } = ctx.params;

  if (!_i18n.languages.includes(lng)) {
    ctx.status = 404;
    return;
  }

  await (0, _koaSend.default)(ctx, _path.default.join(lng, "translation.json"), {
    setHeaders: res => {
      res.setHeader("Cache-Control", isProduction ? `max-age=${7 * 24 * 60 * 60}` : "no-cache");
    },
    root: _path.default.join(__dirname, "../../shared/i18n/locales")
  });
});
router.get("/robots.txt", ctx => {
  ctx.body = (0, _robots.robotsResponse)();
});
router.get("/opensearch.xml", ctx => {
  ctx.type = "text/xml";
  ctx.body = (0, _opensearch.opensearchResponse)(ctx.request.URL.origin);
});
router.get("/share/:shareId", renderShare);
router.get("/share/:shareId/*", renderShare); // catch all for application

router.get("*", renderApp); // In order to report all possible performance metrics to Sentry this header
// must be provided when serving the application, see:
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Timing-Allow-Origin

const timingOrigins = [_env.default.URL];

if (_env.default.SENTRY_DSN) {
  timingOrigins.push("https://sentry.io");
}

koa.use(async (ctx, next) => {
  ctx.set("Timing-Allow-Origin", timingOrigins.join(", "));
  await next();
});
koa.use((0, _apexRedirect.default)());
koa.use(router.routes());
var _default = koa;
exports.default = _default;