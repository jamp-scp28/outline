"use strict";

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.match.js");

var _GoogleCalendar = _interopRequireDefault(require("./GoogleCalendar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("GoogleCalendar", function () {
  var match = _GoogleCalendar.default.ENABLED[0];
  test("to be enabled on share link", function () {
    expect("https://calendar.google.com/calendar/embed?src=tom%40outline.com&ctz=America%2FSao_Paulo".match(match)).toBeTruthy();
  });
  test("to not be enabled elsewhere", function () {
    expect("https://calendar.google.com/calendar".match(match)).toBe(null);
    expect("https://calendar.google.com".match(match)).toBe(null);
    expect("https://www.google.com".match(match)).toBe(null);
  });
});