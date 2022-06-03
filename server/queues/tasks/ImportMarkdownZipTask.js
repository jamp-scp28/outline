"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jszip = _interopRequireDefault(require("jszip"));

var _lodash = require("lodash");

var _mimeTypes = _interopRequireDefault(require("mime-types"));

var _uuid = require("uuid");

var _documentImporter = _interopRequireDefault(require("./../../commands/documentImporter"));

var _Logger = _interopRequireDefault(require("./../../logging/Logger"));

var _models = require("./../../models");

var _zip = require("./../../utils/zip");

var _ImportTask = _interopRequireDefault(require("./ImportTask"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ImportMarkdownZipTask extends _ImportTask.default {
  async parseData(buffer, fileOperation) {
    const zip = await _jszip.default.loadAsync(buffer);
    const tree = (0, _zip.zipAsFileTree)(zip);
    return this.parseFileTree({
      fileOperation,
      zip,
      tree
    });
  }
  /**
   * Converts the file structure from zipAsFileTree into documents,
   * collections, and attachments.
   *
   * @param tree An array of FileTreeNode representing root files in the zip
   * @returns A StructuredImportData object
   */


  async parseFileTree({
    zip,
    tree,
    fileOperation
  }) {
    const user = await _models.User.findByPk(fileOperation.userId);
    const output = {
      collections: [],
      documents: [],
      attachments: []
    };

    async function parseNodeChildren(children, collectionId, parentDocumentId) {
      if (!user) {
        throw new Error("User not found");
      }

      await Promise.all(children.map(async child => {
        // special case for folders of attachments
        if (child.name === "uploads" || child.children.length > 0 && child.path.includes("/uploads/")) {
          return parseNodeChildren(child.children, collectionId);
        }

        const zipObject = zip.files[child.path];
        const id = (0, _uuid.v4)(); // this is an attachment

        if (child.path.includes("/uploads/") && child.children.length === 0) {
          output.attachments.push({
            id,
            name: child.name,
            path: child.path,
            mimeType: _mimeTypes.default.lookup(child.path) || "application/octet-stream",
            buffer: await zipObject.async("nodebuffer")
          });
          return;
        }

        const {
          title,
          text
        } = await (0, _documentImporter.default)({
          mimeType: "text/markdown",
          fileName: child.name,
          content: await zipObject.async("string"),
          user,
          ip: user.lastActiveIp || undefined
        });
        let metadata;

        try {
          metadata = zipObject.comment ? JSON.parse(zipObject.comment) : {};
        } catch (err) {
          _Logger.default.debug("task", `ZIP comment found for ${child.name}, but could not be parsed as metadata: ${zipObject.comment}`);
        }

        const createdAt = metadata.createdAt ? new Date(metadata.createdAt) : zipObject.date;
        const updatedAt = metadata.updatedAt ? new Date(metadata.updatedAt) : zipObject.date;
        const existingEmptyDocumentIndex = output.documents.findIndex(doc => doc.title === title && doc.collectionId === collectionId && doc.parentDocumentId === parentDocumentId && doc.text === ""); // When there is a file and a folder with the same name this handles
        // the case by combining the two into one document with nested children

        if (existingEmptyDocumentIndex !== -1) {
          output.documents[existingEmptyDocumentIndex].text = text;
        } else {
          output.documents.push({
            id,
            title,
            text,
            updatedAt,
            createdAt,
            collectionId,
            parentDocumentId,
            path: child.path
          });
        }

        await parseNodeChildren(child.children, collectionId, id);
      }));
    } // All nodes in the root level should be collections


    for (const node of tree) {
      if (node.path.endsWith("/")) {
        const collectionId = (0, _uuid.v4)();
        output.collections.push({
          id: collectionId,
          name: node.title
        });
        await parseNodeChildren(node.children, collectionId);
      } else {
        _Logger.default.debug("task", `Unhandled file in zip: ${node.path}`, {
          fileOperationId: fileOperation.id
        });
      }
    } // Check all of the attachments we've created against urls in the text
    // and replace them out with attachment redirect urls before continuing.


    for (const document of output.documents) {
      for (const attachment of output.attachments) {
        // Pull the collection and subdirectory out of the path name, upload
        // folders in an export are relative to the document itself
        const normalizedAttachmentPath = attachment.path.replace(/(.*)uploads\//, "uploads/");
        const reference = `<<${attachment.id}>>`;
        document.text = document.text.replace(new RegExp((0, _lodash.escapeRegExp)(attachment.path), "g"), reference).replace(new RegExp((0, _lodash.escapeRegExp)(normalizedAttachmentPath), "g"), reference).replace(new RegExp((0, _lodash.escapeRegExp)(`/${normalizedAttachmentPath}`), "g"), reference);
      }
    }

    return output;
  }

}

exports.default = ImportMarkdownZipTask;