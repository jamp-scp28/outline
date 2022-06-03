"use strict";

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.match.js");

var _GoogleSheets = _interopRequireDefault(require("./GoogleSheets"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("GoogleSheets", function () {
  var match = _GoogleSheets.default.ENABLED[0];
  test("to be enabled on share link", function () {
    expect("https://docs.google.com/spreadsheets/d/e/2PACX-1vTdddHPoZ5M_47wmSHCoigRIt2cj_Pd-kgtaNQY6H0Jzn0_CVGbxC1GcK5IoNzU615lzguexFwxasAW/pub".match(match)).toBeTruthy();
    expect("https://docs.google.com/spreadsheets/d/e/2PACX-1vTdddHPoZ5M_47wmSHCoigR/edit".match(match)).toBeTruthy();
  });
  test("to not be enabled elsewhere", function () {
    expect("https://docs.google.com/spreadsheets".match(match)).toBe(null);
    expect("https://docs.google.com".match(match)).toBe(null);
    expect("https://www.google.com".match(match)).toBe(null);
  });
});