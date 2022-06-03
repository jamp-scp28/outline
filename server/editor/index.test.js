"use strict";

var _ = require(".");

test("renders an empty doc", () => {
  const ast = _.parser.parse("");

  expect(ast.toJSON()).toEqual({
    content: [{
      type: "paragraph"
    }],
    type: "doc"
  });
});