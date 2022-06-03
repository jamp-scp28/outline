"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateAvatarUrl = generateAvatarUrl;

var _crypto = _interopRequireDefault(require("crypto"));

var _fetchWithProxy = _interopRequireDefault(require("fetch-with-proxy"));

var _env = _interopRequireDefault(require("./../env"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function generateAvatarUrl({
  id,
  domain,
  name = "Unknown"
}) {
  // attempt to get logo from Clearbit API. If one doesn't exist then
  // fall back to using tiley to generate a placeholder logo
  const hash = _crypto.default.createHash("sha256");

  hash.update(id);
  const hashedId = hash.digest("hex");
  let cbResponse, cbUrl;

  if (domain) {
    cbUrl = `https://logo.clearbit.com/${domain}`;

    try {
      cbResponse = await (0, _fetchWithProxy.default)(cbUrl);
    } catch (err) {// okay
    }
  }

  const tileyUrl = `${_env.default.DEFAULT_AVATAR_HOST}/avatar/${hashedId}/${encodeURIComponent(name[0])}.png`;
  return cbUrl && cbResponse && cbResponse.status === 200 ? cbUrl : tileyUrl;
}