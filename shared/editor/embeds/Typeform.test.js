"use strict";

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.match.js");

var _Typeform = _interopRequireDefault(require("./Typeform"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("Typeform", function () {
  var match = _Typeform.default.ENABLED[0];
  test("to be enabled on share link", function () {
    expect("https://beardyman.typeform.com/to/zvlr4L".match(match)).toBeTruthy();
  });
  test("to not be enabled elsewhere", function () {
    expect("https://www.typeform.com".match(match)).toBe(null);
    expect("https://typeform.com/to/zvlr4L".match(match)).toBe(null);
    expect("https://typeform.com/features".match(match)).toBe(null);
  });
});