"use strict";

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.match.js");

var _Prezi = _interopRequireDefault(require("./Prezi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("Prezi", function () {
  var match = _Prezi.default.ENABLED[0];
  test("to be enabled on share link", function () {
    expect("https://prezi.com/view/39mn8Rn1ZkoeEKQCgk5C".match(match)).toBeTruthy();
  });
  test("to be enabled on embed link", function () {
    expect("https://prezi.com/view/39mn8Rn1ZkoeEKQCgk5C/embed".match(match)).toBeTruthy();
  });
  test("to not be enabled elsewhere", function () {
    expect("https://prezi.com".match(match)).toBe(null);
    expect("https://prezi.com/pricing".match(match)).toBe(null);
  });
});