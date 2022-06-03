"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = apiWrapper;

var _stream = _interopRequireDefault(require("stream"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function apiWrapper() {
  return async function apiWrapperMiddleware(ctx, next) {
    await next();
    const ok = ctx.status < 400;

    if (typeof ctx.body !== "string" && !(ctx.body instanceof _stream.default.Readable)) {
      ctx.body = { // @ts-expect-error ts-migrate(2698) FIXME: Spread types may only be created from object types... Remove this comment to see the full error message
        ...ctx.body,
        status: ctx.status,
        ok
      };
    }
  };
}