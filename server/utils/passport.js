"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StateStore = void 0;
exports.request = request;

var _crypto = _interopRequireDefault(require("crypto"));

var _dateFns = require("date-fns");

var _fetchWithProxy = _interopRequireDefault(require("fetch-with-proxy"));

var _errors = require("../errors");

var _domains = require("./domains");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class StateStore {
  constructor() {
    _defineProperty(this, "key", "state");

    _defineProperty(this, "store", (ctx, callback) => {
      // Produce a random string as state
      const state = _crypto.default.randomBytes(8).toString("hex");

      ctx.cookies.set(this.key, state, {
        httpOnly: false,
        expires: (0, _dateFns.addMinutes)(new Date(), 10),
        domain: (0, _domains.getCookieDomain)(ctx.hostname)
      });
      callback(null, state);
    });

    _defineProperty(this, "verify", (ctx, providedState, callback) => {
      const state = ctx.cookies.get(this.key);

      if (!state) {
        return callback((0, _errors.OAuthStateMismatchError)("State not return in OAuth flow"), false, state);
      }

      ctx.cookies.set(this.key, "", {
        httpOnly: false,
        expires: (0, _dateFns.subMinutes)(new Date(), 1),
        domain: (0, _domains.getCookieDomain)(ctx.hostname)
      });

      if (state !== providedState) {
        return callback((0, _errors.OAuthStateMismatchError)(), false, state);
      } // @ts-expect-error Type in library is wrong


      callback(null, true, state);
    });
  }

}

exports.StateStore = StateStore;

async function request(endpoint, accessToken) {
  const response = await (0, _fetchWithProxy.default)(endpoint, {
    method: "GET",
    credentials: "same-origin",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  });
  return response.json();
}