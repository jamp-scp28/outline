"use strict";

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.match.js");

var _Diagrams = _interopRequireDefault(require("./Diagrams"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("Diagrams", function () {
  var match = _Diagrams.default.ENABLED[0];
  test("to be enabled on viewer link", function () {
    expect("https://viewer.diagrams.net/?target=blank&nav=1#ABCDefgh_A12345-6789".match(match)).toBeTruthy();
  });
  test("to not be enabled elsewhere", function () {
    expect("https://app.diagrams.net/#ABCDefgh_A12345-6789".match(match)).toBe(null);
  });
});