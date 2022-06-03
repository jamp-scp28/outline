"use strict";

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.match.js");

var _Gist = _interopRequireDefault(require("./Gist"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("Gist", function () {
  var match = _Gist.default.ENABLED[0];
  test("to be enabled on gist link", function () {
    expect("https://gist.github.com/wmertens/0b4fd66ca7055fd290ecc4b9d95271a9".match(match)).toBeTruthy();
    expect("https://gist.github.com/n3n/eb51ada6308b539d388c8ff97711adfa".match(match)).toBeTruthy();
    expect("https://gist.github.com/ShubhanjanMedhi-dev/900c9c14093611898a4a085938bb90d9".match(match)).toBeTruthy();
  });
  test("to not be enabled elsewhere", function () {
    expect("https://gist.github.com/tommoor".match(match)).toBe(null);
  });
});