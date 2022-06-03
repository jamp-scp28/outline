"use strict";

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.match.js");

var _GoogleDataStudio = _interopRequireDefault(require("./GoogleDataStudio"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("GoogleDataStudio", function () {
  var match = _GoogleDataStudio.default.ENABLED[0];
  test("to be enabled on share link", function () {
    expect("https://datastudio.google.com/embed/reporting/aab01789-f3a2-4ff3-9cba-c4c94c4a92e8/page/7zFD".match(match)).toBeTruthy();
  });
  test("to not be enabled elsewhere", function () {
    expect("https://datastudio.google.com/u/0/".match(match)).toBe(null);
    expect("https://datastudio.google.com".match(match)).toBe(null);
    expect("https://www.google.com".match(match)).toBe(null);
  });
});