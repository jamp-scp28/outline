"use strict";

var _renderToHtml = _interopRequireDefault(require("./renderToHtml"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test("renders an empty string", () => {
  expect((0, _renderToHtml.default)("")).toBe("");
});
test("renders plain text as paragraph", () => {
  expect((0, _renderToHtml.default)("plain text")).toMatchSnapshot();
});
test("renders blockquote", () => {
  expect((0, _renderToHtml.default)("> blockquote")).toMatchSnapshot();
});
test("renders code block", () => {
  expect((0, _renderToHtml.default)(`
    this is indented code
`)).toMatchSnapshot();
});
test("renders code fence", () => {
  expect((0, _renderToHtml.default)(`\`\`\`javascript
this is code
\`\`\``)).toMatchSnapshot();
});
test("renders checkbox list", () => {
  expect((0, _renderToHtml.default)(`- [ ] unchecked
- [x] checked`)).toMatchSnapshot();
});
test("renders bullet list", () => {
  expect((0, _renderToHtml.default)(`- item one
- item two
  - nested item`)).toMatchSnapshot();
});
test("renders info notice", () => {
  expect((0, _renderToHtml.default)(`:::info
content of notice
:::`)).toMatchSnapshot();
});
test("renders warning notice", () => {
  expect((0, _renderToHtml.default)(`:::warning
content of notice
:::`)).toMatchSnapshot();
});
test("renders tip notice", () => {
  expect((0, _renderToHtml.default)(`:::tip
content of notice
:::`)).toMatchSnapshot();
});
test("renders headings", () => {
  expect((0, _renderToHtml.default)(`# Heading 1

## Heading 2

### Heading 3

#### Heading 4`)).toMatchSnapshot();
});
test("renders horizontal rule", () => {
  expect((0, _renderToHtml.default)(`---`)).toMatchSnapshot();
});
test("renders image", () => {
  expect((0, _renderToHtml.default)(`![caption](https://lorempixel.com/200/200)`)).toMatchSnapshot();
});
test("renders image with alignment", () => {
  expect((0, _renderToHtml.default)(`![caption](https://lorempixel.com/200/200 "left-40")`)).toMatchSnapshot();
});
test("renders table", () => {
  expect((0, _renderToHtml.default)(`
| heading | centered | right aligned |
|---------|:--------:|--------------:|
|         | center   |               |
|         |          |      bottom r |
`)).toMatchSnapshot();
});
test("renders bold marks", () => {
  expect((0, _renderToHtml.default)(`this is **bold** text`)).toMatchSnapshot();
});
test("renders code marks", () => {
  expect((0, _renderToHtml.default)(`this is \`inline code\` text`)).toMatchSnapshot();
});
test("renders highlight marks", () => {
  expect((0, _renderToHtml.default)(`this is ==highlighted== text`)).toMatchSnapshot();
});
test("renders italic marks", () => {
  expect((0, _renderToHtml.default)(`this is *italic* text`)).toMatchSnapshot();
  expect((0, _renderToHtml.default)(`this is _also italic_ text`)).toMatchSnapshot();
});
test("renders template placeholder marks", () => {
  expect((0, _renderToHtml.default)(`this is !!a placeholder!!`)).toMatchSnapshot();
});
test("renders underline marks", () => {
  expect((0, _renderToHtml.default)(`this is __underlined__ text`)).toMatchSnapshot();
});
test("renders link marks", () => {
  expect((0, _renderToHtml.default)(`this is [linked](https://www.example.com) text`)).toMatchSnapshot();
});
test("renders underline marks", () => {
  expect((0, _renderToHtml.default)(`this is ~~strikethrough~~ text`)).toMatchSnapshot();
});
test("renders ordered list", () => {
  expect((0, _renderToHtml.default)(`1. item one
1. item two`)).toMatchSnapshot();
  expect((0, _renderToHtml.default)(`1. item one
2. item two`)).toMatchSnapshot();
});