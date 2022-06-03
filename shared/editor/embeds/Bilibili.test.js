"use strict";

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.match.js");

var _Bilibili = _interopRequireDefault(require("./Bilibili"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("Bilibili", function () {
  var match = _Bilibili.default.ENABLED[0];
  test("to be enabled on video link", function () {
    expect("https://www.bilibili.com/video/BV1CV411s7jd?spm_id_from=333.999.0.0".match(match)).toBeTruthy();
  });
  test("to not be enabled elsewhere", function () {
    expect("https://youtu.be".match(match)).toBe(null);
    expect("https://bilibili.com".match(match)).toBe(null);
    expect("https://www.bilibili.com".match(match)).toBe(null);
    expect("https://www.bilibili.com/logout".match(match)).toBe(null);
    expect("https://www.bilibili.com/feed/subscriptions".match(match)).toBe(null);
  });
});