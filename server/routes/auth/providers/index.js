"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _urlHelpers = require("./../../../../shared/utils/urlHelpers");

var _fs = require("./../../../utils/fs");

const providers = [];
(0, _fs.requireDirectory)(__dirname).forEach(([module, id]) => {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'config' does not exist on type 'unknown'... Remove this comment to see the full error message
  const {
    config,
    default: router
  } = module;

  if (id === "index") {
    return;
  }

  if (!config) {
    throw new Error(`Auth providers must export a 'config' object, missing in ${id}`);
  }

  if (!router || !router.routes) {
    throw new Error(`Default export of an auth provider must be a koa-router, missing in ${id}`);
  }

  if (config && config.enabled) {
    providers.push({
      id,
      name: config.name,
      enabled: config.enabled,
      authUrl: (0, _urlHelpers.signin)(id),
      router: router
    });
  }
});
var _default = providers;
exports.default = _default;