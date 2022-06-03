"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _models = require("./../../models");

var _factories = require("./../../test/factories");

var _support = require("./../../test/support");

var _ImportNotionTask = _interopRequireDefault(require("./ImportNotionTask"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

beforeEach(() => (0, _support.flushdb)());
describe("ImportNotionTask", () => {
  it("should import successfully from a Markdown export", async () => {
    const fileOperation = await (0, _factories.buildFileOperation)();
    Object.defineProperty(fileOperation, "buffer", {
      get() {
        return _fs.default.readFileSync(_path.default.resolve(__dirname, "..", "..", "test", "fixtures", "notion-markdown.zip"));
      }

    });
    jest.spyOn(_models.FileOperation, "findByPk").mockResolvedValue(fileOperation);
    const props = {
      fileOperationId: fileOperation.id
    };
    const task = new _ImportNotionTask.default();
    const response = await task.perform(props);
    expect(response.collections.size).toEqual(2);
    expect(response.documents.size).toEqual(6);
    expect(response.attachments.size).toEqual(1); // Check that the image url was replaced in the text with a redirect

    const attachments = Array.from(response.attachments.values());
    const documents = Array.from(response.documents.values());
    expect(documents[2].text).toContain(attachments[0].redirectUrl);
  });
  it("should import successfully from a HTML export", async () => {
    const fileOperation = await (0, _factories.buildFileOperation)();
    Object.defineProperty(fileOperation, "buffer", {
      get() {
        return _fs.default.readFileSync(_path.default.resolve(__dirname, "..", "..", "test", "fixtures", "notion-html.zip"));
      }

    });
    jest.spyOn(_models.FileOperation, "findByPk").mockResolvedValue(fileOperation);
    const props = {
      fileOperationId: fileOperation.id
    };
    const task = new _ImportNotionTask.default();
    const response = await task.perform(props);
    expect(response.collections.size).toEqual(2);
    expect(response.documents.size).toEqual(6);
    expect(response.attachments.size).toEqual(4); // Check that the image url was replaced in the text with a redirect

    const attachments = Array.from(response.attachments.values());
    const documents = Array.from(response.documents.values());
    expect(documents[1].text).toContain(attachments[1].redirectUrl);
  });
});