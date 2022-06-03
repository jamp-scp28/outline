"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.oauthAccess = oauthAccess;
exports.post = post;
exports.request = request;

var _querystring = _interopRequireDefault(require("querystring"));

var _fetchWithProxy = _interopRequireDefault(require("fetch-with-proxy"));

var _env = _interopRequireDefault(require("./../env"));

var _errors = require("../errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SLACK_API_URL = "https://slack.com/api";

async function post(endpoint, body) {
  let data;
  const token = body.token;

  try {
    const response = await (0, _fetchWithProxy.default)(`${SLACK_API_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
    data = await response.json();
  } catch (err) {
    throw (0, _errors.InvalidRequestError)(err.message);
  }

  if (!data.ok) {
    throw (0, _errors.InvalidRequestError)(data.error);
  }

  return data;
}

async function request(endpoint, body) {
  let data;

  try {
    const response = await (0, _fetchWithProxy.default)(`${SLACK_API_URL}/${endpoint}?${_querystring.default.stringify(body)}`);
    data = await response.json();
  } catch (err) {
    throw (0, _errors.InvalidRequestError)(err.message);
  }

  if (!data.ok) {
    throw (0, _errors.InvalidRequestError)(data.error);
  }

  return data;
}

async function oauthAccess(code, redirect_uri = `${_env.default.URL}/auth/slack.callback`) {
  return request("oauth.access", {
    client_id: _env.default.SLACK_CLIENT_ID,
    client_secret: _env.default.SLACK_CLIENT_SECRET,
    redirect_uri,
    code
  });
}