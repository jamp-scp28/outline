"use strict";

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.match.js");

var _Spotify = _interopRequireDefault(require("./Spotify"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("Spotify", function () {
  var match = _Spotify.default.ENABLED[0];
  test("to be enabled on song link", function () {
    expect("https://open.spotify.com/track/29G1ScCUhgjgI0H72qN4DE?si=DxjEUxV2Tjmk6pSVckPDRg".match(match)).toBeTruthy();
  });
  test("to be enabled on playlist link", function () {
    expect("https://open.spotify.com/user/spotify/playlist/29G1ScCUhgjgI0H72qN4DE?si=DxjEUxV2Tjmk6pSVckPDRg".match(match)).toBeTruthy();
  });
  test("to not be enabled elsewhere", function () {
    expect("https://spotify.com".match(match)).toBe(null);
    expect("https://open.spotify.com".match(match)).toBe(null);
    expect("https://www.spotify.com".match(match)).toBe(null);
  });
});