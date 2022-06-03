"use strict";

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.match.js");

var _InVision = _interopRequireDefault(require("./InVision"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("InVision", function () {
  var match = _InVision.default.ENABLED[0];
  test("to be enabled on shortlink", function () {
    expect("https://invis.io/69PG07QYQTE".match(match)).toBeTruthy();
  });
  test("to be enabled on share", function () {
    expect("https://projects.invisionapp.com/share/69PG07QYQTE".match(match)).toBeTruthy();
  });
  test("to not be enabled elsewhere", function () {
    expect("https://invis.io".match(match)).toBe(null);
    expect("https://invisionapp.com".match(match)).toBe(null);
    expect("https://projects.invisionapp.com".match(match)).toBe(null);
  });
});