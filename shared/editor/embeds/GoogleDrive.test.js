"use strict";

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.match.js");

var _GoogleDrive = _interopRequireDefault(require("./GoogleDrive"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("GoogleDrive", function () {
  var match = _GoogleDrive.default.ENABLED[0];
  test("to be enabled on share link", function () {
    expect("https://drive.google.com/file/d/1ohkOgmE8MiNx68u6ynBfYkgjeKu_x3ZK/view?usp=sharing".match(match)).toBeTruthy();
    expect("https://drive.google.com/file/d/1ohkOgmE8MiNx68u6ynBfYkgjeKu_x3ZK/preview?usp=sharing".match(match)).toBeTruthy();
    expect("https://drive.google.com/file/d/1ohkOgmE8MiNx68u6ynBfYkgjeKu_x3ZK/preview?usp=sharing&resourceKey=BG8k4dEt1p2gisnVdlaSpA".match(match)).toBeTruthy();
  });
  test("to not be enabled elsewhere", function () {
    expect("https://drive.google.com/file".match(match)).toBe(null);
    expect("https://drive.google.com".match(match)).toBe(null);
    expect("https://www.google.com".match(match)).toBe(null);
  });
});