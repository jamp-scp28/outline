"use strict";

var _factories = require("./../test/factories");

var _support = require("./../test/support");

var _Revision = _interopRequireDefault(require("./Revision"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

beforeEach(() => (0, _support.flushdb)());
beforeEach(jest.resetAllMocks);
describe("#findLatest", () => {
  test("should return latest revision", async () => {
    const document = await (0, _factories.buildDocument)({
      title: "Title",
      text: "Content"
    });
    await _Revision.default.createFromDocument(document);
    document.title = "Changed 1";
    await document.save();
    await _Revision.default.createFromDocument(document);
    document.title = "Changed 2";
    await document.save();
    await _Revision.default.createFromDocument(document);
    const revision = await _Revision.default.findLatest(document.id);
    expect(revision === null || revision === void 0 ? void 0 : revision.title).toBe("Changed 2");
    expect(revision === null || revision === void 0 ? void 0 : revision.text).toBe("Content");
  });
});