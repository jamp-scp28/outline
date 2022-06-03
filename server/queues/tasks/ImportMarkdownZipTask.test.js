"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _models = require("./../../models");

var _factories = require("./../../test/factories");

var _support = require("./../../test/support");

var _ImportMarkdownZipTask = _interopRequireDefault(require("./ImportMarkdownZipTask"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

beforeEach(() => (0, _support.flushdb)());
describe("ImportMarkdownZipTask", () => {
  it("should import the documents, attachments", async () => {
    const fileOperation = await (0, _factories.buildFileOperation)();
    Object.defineProperty(fileOperation, "buffer", {
      get() {
        return _fs.default.readFileSync(_path.default.resolve(__dirname, "..", "..", "test", "fixtures", "outline.zip"));
      }

    });
    jest.spyOn(_models.FileOperation, "findByPk").mockResolvedValue(fileOperation);
    const props = {
      fileOperationId: fileOperation.id
    };
    const task = new _ImportMarkdownZipTask.default();
    const response = await task.perform(props);
    expect(response.collections.size).toEqual(1);
    expect(response.documents.size).toEqual(8);
    expect(response.attachments.size).toEqual(6);
  });
  it("should throw an error with corrupt zip", async () => {
    const fileOperation = await (0, _factories.buildFileOperation)();
    Object.defineProperty(fileOperation, "buffer", {
      get() {
        return _fs.default.readFileSync(_path.default.resolve(__dirname, "..", "..", "test", "fixtures", "corrupt.zip"));
      }

    });
    jest.spyOn(_models.FileOperation, "findByPk").mockResolvedValue(fileOperation);
    const props = {
      fileOperationId: fileOperation.id
    };
    let error;

    try {
      const task = new _ImportMarkdownZipTask.default();
      await task.perform(props);
    } catch (err) {
      error = err;
    }

    expect(error && error.message).toBeTruthy();
  });
  it("should throw an error with empty collection in zip", async () => {
    const fileOperation = await (0, _factories.buildFileOperation)();
    Object.defineProperty(fileOperation, "buffer", {
      get() {
        return _fs.default.readFileSync(_path.default.resolve(__dirname, "..", "..", "test", "fixtures", "empty.zip"));
      }

    });
    jest.spyOn(_models.FileOperation, "findByPk").mockResolvedValue(fileOperation);
    const props = {
      fileOperationId: fileOperation.id
    };
    let error;

    try {
      const task = new _ImportMarkdownZipTask.default();
      await task.perform(props);
    } catch (err) {
      error = err;
    }

    expect(error && error.message).toBe("Uploaded file does not contain any valid documents");
  });
});