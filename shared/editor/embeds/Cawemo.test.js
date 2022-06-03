"use strict";

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.match.js");

var _Cawemo = _interopRequireDefault(require("./Cawemo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("Cawemo", function () {
  var match = _Cawemo.default.ENABLED[0];
  test("to be enabled on embed link", function () {
    expect("https://cawemo.com/embed/a82e9f22-e283-4253-8d11".match(match)).toBeTruthy();
  });
  test("to be enabled on share link", function () {
    expect("https://cawemo.com/embed/a82e9f22-e283-4253-8d11".match(match)).toBeTruthy();
  });
  test("to not be enabled elsewhere", function () {
    expect("https://cawemo.com/".match(match)).toBe(null);
    expect("https://cawemo.com/diagrams".match(match)).toBe(null);
  });
});