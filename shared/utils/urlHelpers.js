"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SLUG_URL_REGEX = void 0;
exports.changelogUrl = changelogUrl;
exports.developersUrl = developersUrl;
exports.feedbackUrl = feedbackUrl;
exports.githubIssuesUrl = githubIssuesUrl;
exports.githubUrl = githubUrl;
exports.signin = signin;
exports.slackAuth = slackAuth;
exports.twitterUrl = twitterUrl;

require("core-js/modules/es.array.join.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.array.concat.js");

var _env = _interopRequireDefault(require("../env"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function slackAuth(state) {
  var scopes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ["identity.email", "identity.basic", "identity.avatar", "identity.team"];
  var clientId = arguments.length > 2 ? arguments[2] : undefined;
  var redirectUri = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "".concat(_env.default.URL, "/auth/slack.callback");
  var baseUrl = "https://slack.com/oauth/authorize";
  var params = {
    client_id: clientId,
    scope: scopes ? scopes.join(" ") : "",
    redirect_uri: redirectUri,
    state: state
  };
  var urlParams = Object.keys(params).map(function (key) {
    return "".concat(key, "=").concat(encodeURIComponent(params[key]));
  }).join("&");
  return "".concat(baseUrl, "?").concat(urlParams);
}

function githubUrl() {
  return "https://www.github.com/outline";
}

function githubIssuesUrl() {
  return "https://www.github.com/outline/outline/issues";
}

function twitterUrl() {
  return "https://twitter.com/getoutline";
}

function feedbackUrl() {
  return "https://www.getoutline.com/contact";
}

function developersUrl() {
  return "https://www.getoutline.com/developers";
}

function changelogUrl() {
  return "https://www.getoutline.com/changelog";
}

function signin() {
  var service = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "slack";
  return "".concat(_env.default.URL, "/auth/").concat(service);
}

var SLUG_URL_REGEX = /^(?:[0-9a-zA-Z-_~]*-)?([a-zA-Z0-9]{10,15})$/;
exports.SLUG_URL_REGEX = SLUG_URL_REGEX;