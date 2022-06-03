"use strict";

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.match.js");

var _Miro = _interopRequireDefault(require("./Miro"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("Miro", function () {
  var match = _Miro.default.ENABLED[0];
  test("to be enabled on old domain share link", function () {
    expect("https://realtimeboard.com/app/board/o9J_k0fwiss=".match(match)).toBeTruthy();
  });
  test("to be enabled on share link", function () {
    expect("https://miro.com/app/board/o9J_k0fwiss=".match(match)).toBeTruthy();
  });
  test("to extract the domain as part of the match for later use", function () {
    var _httpsRealtimeboar;

    expect((_httpsRealtimeboar = "https://realtimeboard.com/app/board/o9J_k0fwiss=".match(match)) === null || _httpsRealtimeboar === void 0 ? void 0 : _httpsRealtimeboar[1]).toBe("realtimeboard");
  });
  test("to not be enabled elsewhere", function () {
    expect("https://miro.com".match(match)).toBe(null);
    expect("https://realtimeboard.com".match(match)).toBe(null);
    expect("https://realtimeboard.com/features".match(match)).toBe(null);
  });
});