"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = errorHandling;

var _lodash = require("lodash");

var _sequelize = require("sequelize");

function errorHandling() {
  return async function errorHandlingMiddleware(ctx, next) {
    try {
      await next();
    } catch (err) {
      ctx.status = err.status || 500;
      let message = err.message || err.name;
      let error;

      if (err instanceof _sequelize.ValidationError) {
        // super basic form error handling
        ctx.status = 400;

        if (err.errors && err.errors[0]) {
          message = `${err.errors[0].message} (${err.errors[0].path})`;
        }
      }

      if (message.match(/Not found/i)) {
        ctx.status = 404;
        error = "not_found";
      }

      if (message.match(/Authorization error/i)) {
        ctx.status = 403;
        error = "authorization_error";
      }

      if (ctx.status === 500) {
        message = "Internal Server Error";
        error = "internal_server_error";
        ctx.app.emit("error", err, ctx);
      }

      ctx.body = {
        ok: false,
        error: (0, _lodash.snakeCase)(err.id || error),
        status: err.status,
        message,
        data: err.errorData
      }; // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.

      if (!ctx.body.data) {
        // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
        delete ctx.body.data;
      }
    }
  };
}