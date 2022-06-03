"use strict";

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.match.js");

var _ModeAnalytics = _interopRequireDefault(require("./ModeAnalytics"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("ModeAnalytics", function () {
  var match = _ModeAnalytics.default.ENABLED[0];
  test("to be enabled on report link", function () {
    expect("https://modeanalytics.com/outline/reports/5aca06064f56".match(match)).toBeTruthy();
  });
  test("to not be enabled elsewhere", function () {
    expect("https://modeanalytics.com".match(match)).toBe(null);
    expect("https://modeanalytics.com/outline".match(match)).toBe(null);
    expect("https://modeanalytics.com/outline/reports".match(match)).toBe(null);
  });
});