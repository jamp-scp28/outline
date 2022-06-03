"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = auth;

var _tracing = _interopRequireWildcard(require("./../logging/tracing"));

var _models = require("./../models");

var _jwt = require("./../utils/jwt");

var _errors = require("../errors");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function auth(options = {}) {
  return async function authMiddleware(ctx, next) {
    let token;
    const authorizationHeader = ctx.request.get("authorization");

    if (authorizationHeader) {
      const parts = authorizationHeader.split(" ");

      if (parts.length === 2) {
        const scheme = parts[0];
        const credentials = parts[1];

        if (/^Bearer$/i.test(scheme)) {
          token = credentials;
        }
      } else {
        throw (0, _errors.AuthenticationError)(`Bad Authorization header format. Format is "Authorization: Bearer <token>"`);
      } // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.

    } else if (ctx.body && ctx.body.token) {
      // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
      token = ctx.body.token;
    } else if (ctx.request.query.token) {
      token = ctx.request.query.token;
    } else {
      token = ctx.cookies.get("accessToken");
    }

    if (!token && options.required !== false) {
      throw (0, _errors.AuthenticationError)("Authentication required");
    }

    let user;

    if (token) {
      if (String(token).match(/^[\w]{38}$/)) {
        ctx.state.authType = "api";
        let apiKey;

        try {
          apiKey = await _models.ApiKey.findOne({
            where: {
              secret: token
            }
          });
        } catch (err) {
          throw (0, _errors.AuthenticationError)("Invalid API key");
        }

        if (!apiKey) {
          throw (0, _errors.AuthenticationError)("Invalid API key");
        }

        user = await _models.User.findByPk(apiKey.userId, {
          include: [{
            model: _models.Team,
            as: "team",
            required: true
          }]
        });

        if (!user) {
          throw (0, _errors.AuthenticationError)("Invalid API key");
        }
      } else {
        ctx.state.authType = "app";
        user = await (0, _jwt.getUserForJWT)(String(token));
      }

      if (user.isSuspended) {
        const suspendingAdmin = await _models.User.findOne({
          where: {
            id: user.suspendedById
          },
          paranoid: false
        });
        throw (0, _errors.UserSuspendedError)({
          adminEmail: (suspendingAdmin === null || suspendingAdmin === void 0 ? void 0 : suspendingAdmin.email) || undefined
        });
      } // not awaiting the promise here so that the request is not blocked


      user.updateActiveAt(ctx.request.ip);
      ctx.state.token = String(token);
      ctx.state.user = user;

      if (_tracing.default) {
        _tracing.APM.addTags({
          "request.userId": user.id,
          "request.teamId": user.teamId,
          "request.authType": ctx.state.authType
        }, _tracing.APM.getRootSpanFromRequestContext(ctx));
      }
    }

    return next();
  };
}