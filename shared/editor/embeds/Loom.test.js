"use strict";

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.match.js");

var _Loom = _interopRequireDefault(require("./Loom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("Loom", function () {
  var match = _Loom.default.ENABLED[0];
  test("to be enabled on share link", function () {
    expect("https://www.loom.com/share/55327cbb265743f39c2c442c029277e0".match(match)).toBeTruthy();
    expect("https://www.useloom.com/share/55327cbb265743f39c2c442c029277e0".match(match)).toBeTruthy();
  });
  test("to be enabled on embed link", function () {
    expect("https://www.loom.com/embed/55327cbb265743f39c2c442c029277e0".match(match)).toBeTruthy();
    expect("https://www.useloom.com/embed/55327cbb265743f39c2c442c029277e0".match(match)).toBeTruthy();
  });
  test("to not be enabled elsewhere", function () {
    expect("https://www.useloom.com".match(match)).toBe(null);
    expect("https://www.useloom.com/features".match(match)).toBe(null);
  });
});