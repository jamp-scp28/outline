"use strict";

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.match.js");

var _Figma = _interopRequireDefault(require("./Figma"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("Figma", function () {
  var match = _Figma.default.ENABLED[0];
  test("to be enabled on file link", function () {
    expect("https://www.figma.com/file/LKQ4FJ4bTnCSjedbRpk931".match(match)).toBeTruthy();
  });
  test("to be enabled on prototype link", function () {
    expect("https://www.figma.com/proto/LKQ4FJ4bTnCSjedbRpk931".match(match)).toBeTruthy();
  });
  test("to not be enabled elsewhere", function () {
    expect("https://www.figma.com".match(match)).toBe(null);
    expect("https://www.figma.com/features".match(match)).toBe(null);
  });
});