"use strict";

var _filterExcessSeparators = _interopRequireDefault(require("./filterExcessSeparators"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var embedDescriptor = {
  icon: function icon() {
    return null;
  },
  matcher: function matcher() {
    return true;
  },
  component: function component() {
    return null;
  }
};
describe("filterExcessSeparators", function () {
  test("filter hanging end separators", function () {
    expect((0, _filterExcessSeparators.default)([embedDescriptor, {
      name: "separator"
    }, {
      name: "separator"
    }, {
      name: "separator"
    }, {
      name: "separator"
    }])).toStrictEqual([embedDescriptor]);
  });
  test("filter hanging start separators", function () {
    expect((0, _filterExcessSeparators.default)([{
      name: "separator"
    }, {
      name: "separator"
    }, {
      name: "separator"
    }, {
      name: "separator"
    }, embedDescriptor])).toStrictEqual([embedDescriptor]);
  });
  test("filter surrounding separators", function () {
    expect((0, _filterExcessSeparators.default)([{
      name: "separator"
    }, embedDescriptor, {
      name: "separator"
    }])).toStrictEqual([embedDescriptor]);
  });
});