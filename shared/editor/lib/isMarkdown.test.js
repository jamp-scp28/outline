"use strict";

var _isMarkdown = _interopRequireDefault(require("./isMarkdown"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test("returns false for an empty string", function () {
  expect((0, _isMarkdown.default)("")).toBe(false);
});
test("returns false for plain text", function () {
  expect((0, _isMarkdown.default)("plain text")).toBe(false);
});
test("returns true for bullet list", function () {
  expect((0, _isMarkdown.default)("- item one\n- item two\n  - nested item")).toBe(true);
});
test("returns true for numbered list", function () {
  expect((0, _isMarkdown.default)("1. item one\n1. item two")).toBe(true);
  expect((0, _isMarkdown.default)("1. item one\n2. item two")).toBe(true);
});
test("returns true for code fence", function () {
  expect((0, _isMarkdown.default)("```javascript\nthis is code\n```")).toBe(true);
});
test("returns false for non-closed fence", function () {
  expect((0, _isMarkdown.default)("```\nthis is not code\n")).toBe(false);
});
test("returns true for heading", function () {
  expect((0, _isMarkdown.default)("# Heading 1")).toBe(true);
  expect((0, _isMarkdown.default)("## Heading 2")).toBe(true);
  expect((0, _isMarkdown.default)("### Heading 3")).toBe(true);
});
test("returns false for hashtag", function () {
  expect((0, _isMarkdown.default)("Test #hashtag")).toBe(false);
  expect((0, _isMarkdown.default)(" #hashtag")).toBe(false);
});
test("returns true for absolute link", function () {
  expect((0, _isMarkdown.default)("[title](http://www.google.com)")).toBe(true);
});
test("returns true for relative link", function () {
  expect((0, _isMarkdown.default)("[title](/doc/mydoc-234tnes)")).toBe(true);
});
test("returns true for relative image", function () {
  expect((0, _isMarkdown.default)("![alt](/coolimage.png)")).toBe(true);
});
test("returns true for absolute image", function () {
  expect((0, _isMarkdown.default)("![alt](https://www.google.com/coolimage.png)")).toBe(true);
});