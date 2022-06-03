"use strict";

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.match.js");

var _Codepen = _interopRequireDefault(require("./Codepen"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("Codepen", function () {
  var match = _Codepen.default.ENABLED[0];
  test("to be enabled on pen link", function () {
    expect("https://codepen.io/chriscoyier/pen/gfdDu".match(match)).toBeTruthy();
  });
  test("to be enabled on embed link", function () {
    expect("https://codepen.io/chriscoyier/embed/gfdDu".match(match)).toBeTruthy();
  });
  test("to not be enabled elsewhere", function () {
    expect("https://codepen.io".match(match)).toBe(null);
    expect("https://codepen.io/chriscoyier".match(match)).toBe(null);
  });
});