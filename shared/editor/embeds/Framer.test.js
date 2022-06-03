"use strict";

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.match.js");

var _Framer = _interopRequireDefault(require("./Framer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("Framer", function () {
  var match = _Framer.default.ENABLED[0];
  test("to be enabled on share link", function () {
    expect("https://framer.cloud/PVwJO".match(match)).toBeTruthy();
  });
  test("to not be enabled on root", function () {
    expect("https://framer.cloud".match(match)).toBe(null);
  });
});