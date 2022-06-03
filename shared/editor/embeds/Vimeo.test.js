"use strict";

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.match.js");

var _Vimeo = _interopRequireDefault(require("./Vimeo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("Vimeo", function () {
  var match = _Vimeo.default.ENABLED[0];
  test("to be enabled on video link", function () {
    expect("https://vimeo.com/265045525".match(match)).toBeTruthy();
    expect("https://vimeo.com/265045525/b9fefc8598".match(match)).toBeTruthy();
  });
  test("to not be enabled elsewhere", function () {
    expect("https://vimeo.com".match(match)).toBe(null);
    expect("https://www.vimeo.com".match(match)).toBe(null);
    expect("https://vimeo.com/upgrade".match(match)).toBe(null);
    expect("https://vimeo.com/features/video-marketing".match(match)).toBe(null);
  });
});