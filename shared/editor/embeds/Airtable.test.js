"use strict";

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.match.js");

var _Airtable = _interopRequireDefault(require("./Airtable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("Airtable", function () {
  var match = _Airtable.default.ENABLED[0];
  test("to be enabled on share link", function () {
    expect("https://airtable.com/shrEoQs3erLnppMie".match(match)).toBeTruthy();
  });
  test("to be enabled on embed link", function () {
    expect("https://airtable.com/embed/shrEoQs3erLnppMie".match(match)).toBeTruthy();
  });
  test("to not be enabled elsewhere", function () {
    expect("https://airtable.com".match(match)).toBe(null);
    expect("https://airtable.com/features".match(match)).toBe(null);
    expect("https://airtable.com/pricing".match(match)).toBe(null);
  });
});