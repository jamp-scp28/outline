"use strict";

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.match.js");

var _Mindmeister = _interopRequireDefault(require("./Mindmeister"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("Mindmeister", function () {
  var match = _Mindmeister.default.ENABLED[0];
  test("to be enabled on mm.tt link", function () {
    expect("https://mm.tt/326377934".match(match)).toBeTruthy();
  });
  test("to be enabled on mm.tt link with token parameter", function () {
    expect("https://mm.tt/326377934?t=r9NcnTRr18".match(match)).toBeTruthy();
  });
  test("to be enabled on embed link", function () {
    expect("https://www.mindmeister.com/maps/public_map_shell/326377934/paper-digital-or-online-mind-mapping".match(match)).toBeTruthy();
  });
  test("to be enabled on public link", function () {
    expect("https://www.mindmeister.com/326377934/paper-digital-or-online-mind-mapping".match(match)).toBeTruthy();
  });
  test("to be enabled without www", function () {
    expect("https://mindmeister.com/326377934/paper-digital-or-online-mind-mapping".match(match)).toBeTruthy();
  });
  test("to be enabled without slug", function () {
    expect("https://mindmeister.com/326377934".match(match)).toBeTruthy();
  });
  test("to not be enabled elsewhere", function () {
    expect("https://mindmeister.com".match(match)).toBe(null);
    expect("https://www.mindmeister.com/pricing".match(match)).toBe(null);
  });
});