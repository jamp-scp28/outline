"use strict";

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.match.js");

var _Abstract = _interopRequireDefault(require("./Abstract"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("Abstract", function () {
  var match = _Abstract.default.ENABLED[0];
  var match2 = _Abstract.default.ENABLED[1];
  test("to be enabled on share subdomain link", function () {
    expect("https://share.goabstract.com/aaec8bba-f473-4f64-96e7-bff41c70ff8a".match(match)).toBeTruthy();
    expect("https://share.abstract.com/aaec8bba-f473-4f64-96e7-bff41c70ff8a".match(match)).toBeTruthy();
  });
  test("to be enabled on share link", function () {
    expect("https://app.goabstract.com/share/aaec8bba-f473-4f64-96e7-bff41c70ff8a".match(match2)).toBeTruthy();
    expect("https://app.abstract.com/share/aaec8bba-f473-4f64-96e7-bff41c70ff8a".match(match2)).toBeTruthy();
  });
  test("to be enabled on embed link", function () {
    expect("https://app.goabstract.com/embed/aaec8bba-f473-4f64-96e7-bff41c70ff8a".match(match2)).toBeTruthy();
    expect("https://app.abstract.com/embed/aaec8bba-f473-4f64-96e7-bff41c70ff8a".match(match2)).toBeTruthy();
  });
  test("to not be enabled elsewhere", function () {
    expect("https://abstract.com".match(match)).toBe(null);
    expect("https://goabstract.com".match(match)).toBe(null);
    expect("https://app.goabstract.com".match(match)).toBe(null);
    expect("https://abstract.com/features".match(match)).toBe(null);
    expect("https://app.abstract.com/home".match(match)).toBe(null);
    expect("https://abstract.com/pricing".match(match)).toBe(null);
    expect("https://goabstract.com/pricing".match(match)).toBe(null);
    expect("https://www.goabstract.com/pricing".match(match)).toBe(null);
  });
});