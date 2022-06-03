"use strict";

require("core-js/modules/es.function.name.js");

var _naturalSort = _interopRequireDefault(require("./naturalSort"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("#naturalSort", function () {
  it("should sort a list of objects by the given key", function () {
    var items = [{
      name: "Joan"
    }, {
      name: "Pedro"
    }, {
      name: "Mark"
    }];
    expect((0, _naturalSort.default)(items, "name")).toEqual([{
      name: "Joan"
    }, {
      name: "Mark"
    }, {
      name: "Pedro"
    }]);
  });
  it("should accept a function as the object key", function () {
    var items = [{
      name: "Joan"
    }, {
      name: "Pedro"
    }, {
      name: "Mark"
    }];
    expect((0, _naturalSort.default)(items, function (item) {
      return item.name;
    })).toEqual([{
      name: "Joan"
    }, {
      name: "Mark"
    }, {
      name: "Pedro"
    }]);
  });
  it("should accept natural-sort options", function () {
    var items = [{
      name: "Joan"
    }, {
      name: "joan"
    }, {
      name: "Pedro"
    }, {
      name: "Mark"
    }];
    expect((0, _naturalSort.default)(items, "name", {
      direction: "desc",
      caseSensitive: true
    })).toEqual([{
      name: "joan"
    }, {
      name: "Pedro"
    }, {
      name: "Mark"
    }, {
      name: "Joan"
    }]);
  });
  it("should ignore non basic latin letters", function () {
    var items = [{
      name: "Abel"
    }, {
      name: "Martín"
    }, {
      name: "Ávila"
    }];
    expect((0, _naturalSort.default)(items, "name")).toEqual([{
      name: "Abel"
    }, {
      name: "Ávila"
    }, {
      name: "Martín"
    }]);
  });
  it("should ignore emojis", function () {
    var items = [{
      title: "🍔 Document 2"
    }, {
      title: "🐻 Document 3"
    }, {
      title: "🙂 Document 1"
    }];
    expect((0, _naturalSort.default)(items, "title")).toEqual([{
      title: "🙂 Document 1"
    }, {
      title: "🍔 Document 2"
    }, {
      title: "🐻 Document 3"
    }]);
  });
});