"use strict";

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.match.js");

var _Marvel = _interopRequireDefault(require("./Marvel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("Marvel", function () {
  var match = _Marvel.default.ENABLED[0];
  test("to be enabled on share link", function () {
    expect("https://marvelapp.com/75hj91".match(match)).toBeTruthy();
  });
  test("to not be enabled elsewhere", function () {
    expect("https://marvelapp.com".match(match)).toBe(null);
    expect("https://marvelapp.com/features".match(match)).toBe(null);
  });
});