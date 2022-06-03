"use strict";

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.match.js");

var _Lucidchart = _interopRequireDefault(require("./Lucidchart"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("Lucidchart", function () {
  var match = _Lucidchart.default.ENABLED[0];
  test("to be enabled on view link", function () {
    expect("https://www.lucidchart.com/documents/view/2f4a79cb-7637-433d-8ffb-27cce65a05e7".match(match)).toBeTruthy();
  });
  test("to be enabled on root link", function () {
    expect("https://lucidchart.com/documents/view/2f4a79cb-7637-433d-8ffb-27cce65a05e7".match(match)).toBeTruthy();
  });
  test("to be enabled on app link", function () {
    expect("https://app.lucidchart.com/documents/view/2f4a79cb-7637-433d-8ffb-27cce65a05e7".match(match)).toBeTruthy();
  });
  test("to be enabled on visited link", function () {
    expect("https://www.lucidchart.com/documents/view/2f4a79cb-7637-433d-8ffb-27cce65a05e7/0".match(match)).toBeTruthy();
  });
  test("to be enabled on embedded link", function () {
    expect("https://app.lucidchart.com/documents/embeddedchart/1af2bdfa-da7d-4ea1-aa1d-bec5677a9837".match(match)).toBeTruthy();
  });
  test("to not be enabled elsewhere", function () {
    expect("https://lucidchart.com".match(match)).toBe(null);
    expect("https://app.lucidchart.com".match(match)).toBe(null);
    expect("https://www.lucidchart.com".match(match)).toBe(null);
    expect("https://www.lucidchart.com/features".match(match)).toBe(null);
    expect("https://www.lucidchart.com/documents/view".match(match)).toBe(null);
  });
});