"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pagination;

var _querystring = _interopRequireDefault(require("querystring"));

var _errors = require("./../../../errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function pagination(options) {
  return async function paginationMiddleware(ctx, next) {
    const opts = {
      defaultLimit: 15,
      defaultOffset: 0,
      maxLimit: 100,
      ...options
    };
    const query = ctx.request.query;
    const body = ctx.request.body;
    let limit = query.limit || body.limit;
    let offset = query.offset || body.offset;

    if (limit && isNaN(limit)) {
      throw (0, _errors.InvalidRequestError)(`Pagination limit must be a valid number`);
    }

    if (offset && isNaN(offset)) {
      throw (0, _errors.InvalidRequestError)(`Pagination offset must be a valid number`);
    }

    limit = parseInt(limit || opts.defaultLimit, 10);
    offset = parseInt(offset || opts.defaultOffset, 10);

    if (limit > opts.maxLimit) {
      throw (0, _errors.InvalidRequestError)(`Pagination limit is too large (max ${opts.maxLimit})`);
    }

    if (limit <= 0) {
      throw (0, _errors.InvalidRequestError)(`Pagination limit must be greater than 0`);
    }

    if (offset < 0) {
      throw (0, _errors.InvalidRequestError)(`Pagination offset must be greater than or equal to 0`);
    }

    ctx.state.pagination = {
      limit,
      offset
    };
    query.limit = ctx.state.pagination.limit;
    query.offset = ctx.state.pagination.offset + query.limit;
    ctx.state.pagination.nextPath = `/api${ctx.request.path}?${_querystring.default.stringify(query)}`;
    return next();
  };
}