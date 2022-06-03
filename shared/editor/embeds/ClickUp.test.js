"use strict";

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.match.js");

var _ClickUp = _interopRequireDefault(require("./ClickUp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("ClickUp", function () {
  var match = _ClickUp.default.ENABLED[0];
  test("to be enabled on share link", function () {
    expect("https://share.clickup.com/b/h/6-9310960-2/c9d837d74182317".match(match)).toBeTruthy();
  });
  test("to not be enabled elsewhere", function () {
    expect("https://share.clickup.com".match(match)).toBe(null);
    expect("https://clickup.com/".match(match)).toBe(null);
    expect("https://clickup.com/features".match(match)).toBe(null);
  });
});