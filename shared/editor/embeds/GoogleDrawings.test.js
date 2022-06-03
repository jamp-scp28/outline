"use strict";

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.match.js");

var _GoogleDrawings = _interopRequireDefault(require("./GoogleDrawings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("GoogleDrawings", function () {
  var match = _GoogleDrawings.default.ENABLED[0];
  test("to be enabled on share link", function () {
    expect("https://docs.google.com/drawings/d/1zDLtJ4HSCnjGCGSoCgqGe3F8p6o7R8Vjk8MDR6dKf-U/edit".match(match)).toBeTruthy();
    expect("https://docs.google.com/drawings/d/1zDLtJ4HSCnjGCGSoCgqGe3F8p6o7R8Vjk8MDR6dKf-U/edit?usp=sharing".match(match)).toBeTruthy();
  });
  test("to not be enabled elsewhere", function () {
    expect("https://docs.google.com/drawings/d/e/2PACX-1vRtzIzEWN6svSrIYZq-kq2XZEN6WaOFXHbPKRLXNOFRlxLIdJg0Vo6RfretGqs9SzD-fUazLeS594Kw/pub?w=960&h=720".match(match)).toBe(null);
    expect("https://docs.google.com/drawings".match(match)).toBe(null);
    expect("https://docs.google.com".match(match)).toBe(null);
    expect("https://www.google.com".match(match)).toBe(null);
  });
});