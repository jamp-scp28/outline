"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ImportNotionTask extends _ImportTask.default {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "ImageRegex", /!\[(?<alt>[^\][]*?)]\((?<filename>[^\][]*?)(?=“|\))“?(?<title>[^\][”]+)?”?\)/g);

    _defineProperty(this, "NotionLinkRegex", /\[([^[]+)]\((.*?([0-9a-fA-F]{32})\..*?)\)/g);

    _defineProperty(this, "NotionUUIDRegex", /\s([0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}|[0-9a-fA-F]{32})$/);
  }

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

    if (!user) {
      throw new Error("User not found");
    }

    const output = {
      collections: [],
      documents: [],
      attachments: []
    };

    const parseNodeChildren = async (children, collectionId, parentDocumentId) => {
      if (!user) {
        throw new Error("User not found");
      }

      await Promise.all(children.map(async child => {
        // Ignore the CSV's for databases upfront
        if (child.path.endsWith(".csv")) {
          return;
        }

        const zipObject = zip.files[child.path];
        const id = (0, _uuid.v4)();
        const match = child.title.match(this.NotionUUIDRegex);
        const name = child.title.replace(this.NotionUUIDRegex, "");
        const sourceId = match ? match[0].trim() : undefined; // If it's not a text file we're going to treat it as an attachment.

        const mimeType = _mimeTypes.default.lookup(child.name);

        const isDocument = mimeType === "text/markdown" || mimeType === "text/plain" || mimeType === "text/html"; // If it's not a document and not a folder, treat it as an attachment

        if (!isDocument && mimeType) {
          output.attachments.push({
            id,
            name: child.name,
            path: child.path,
            mimeType,
            buffer: await zipObject.async("nodebuffer"),
            sourceId
          });
          return;
        }

        _Logger.default.debug("task", `Processing ${name} as ${mimeType}`);

        const {
          title,
          text
        } = await (0, _documentImporter.default)({
          mimeType: mimeType || "text/markdown",
          fileName: name,
          content: await zipObject.async("string"),
          user,
          ip: user.lastActiveIp || undefined
        });
        const existingDocumentIndex = output.documents.findIndex(doc => doc.sourceId === sourceId);
        const existingDocument = output.documents[existingDocumentIndex]; // If there is an existing document with the same sourceId that means
        // we've already parsed either a folder or a file referencing the same
        // document, as such we should merge.

        if (existingDocument) {
          if (existingDocument.text === "") {
            output.documents[existingDocumentIndex].text = text;
          }

          await parseNodeChildren(child.children, collectionId, existingDocument.id);
        } else {
          output.documents.push({
            id,
            title,
            text,
            collectionId,
            parentDocumentId,
            path: child.path,
            sourceId
          });
          await parseNodeChildren(child.children, collectionId, id);
        }
      }));
    };

    const replaceInternalLinksAndImages = text => {
      // Find if there are any images in this document
      const imagesInText = this.parseImages(text);

      for (const image of imagesInText) {
        const name = _path.default.basename(image.src);

        const attachment = output.attachments.find(att => att.name === name);

        if (!attachment) {
          _Logger.default.info("task", `Could not find referenced attachment with name ${name} and src ${image.src}`);
        } else {
          text = text.replace(new RegExp((0, _lodash.escapeRegExp)(image.src), "g"), `<<${attachment.id}>>`);
        }
      } // With Notion's HTML import, images sometimes come wrapped in anchor tags
      // This isn't supported in Outline's editor, so we need to strip them.


      text = text.replace(/\[!\[([^[]+)]/g, "![]"); // Find if there are any links in this document pointing to other documents

      const internalLinksInText = this.parseInternalLinks(text); // For each link update to the standardized format of <<documentId>>
      // instead of a relative or absolute URL within the original zip file.

      for (const link of internalLinksInText) {
        const doc = output.documents.find(doc => doc.sourceId === link.sourceId);

        if (!doc) {
          _Logger.default.info("task", `Could not find referenced document with sourceId ${link.sourceId}`);
        } else {
          text = text.replace(link.href, `<<${doc.id}>>`);
        }
      }

      return text;
    }; // All nodes in the root level should become collections


    for (const node of tree) {
      const match = node.title.match(this.NotionUUIDRegex);
      const name = node.title.replace(this.NotionUUIDRegex, "");
      const sourceId = match ? match[0].trim() : undefined;

      const mimeType = _mimeTypes.default.lookup(node.name);

      const existingCollectionIndex = output.collections.findIndex(collection => collection.sourceId === sourceId);
      const existingCollection = output.collections[existingCollectionIndex];
      const collectionId = (existingCollection === null || existingCollection === void 0 ? void 0 : existingCollection.id) || (0, _uuid.v4)();
      let description; // Root level docs become the descriptions of collections

      if (mimeType === "text/markdown" || mimeType === "text/plain" || mimeType === "text/html") {
        const zipObject = zip.files[node.path];
        const {
          text
        } = await (0, _documentImporter.default)({
          mimeType,
          fileName: name,
          content: await zipObject.async("string"),
          user,
          ip: user.lastActiveIp || undefined
        });
        description = text;
      } else if (node.children.length > 0) {
        await parseNodeChildren(node.children, collectionId);
      } else {
        _Logger.default.debug("task", `Unhandled file in zip: ${node.path}`, {
          fileOperationId: fileOperation.id
        });

        continue;
      }

      if (existingCollectionIndex !== -1) {
        if (description) {
          output.collections[existingCollectionIndex].description = description;
        }
      } else {
        output.collections.push({
          id: collectionId,
          name,
          description,
          sourceId
        });
      }
    }

    for (const document of output.documents) {
      document.text = replaceInternalLinksAndImages(document.text);
    }

    for (const collection of output.collections) {
      if (collection.description) {
        collection.description = replaceInternalLinksAndImages(collection.description);
      }
    }

    return output;
  }
  /**
   * Extracts internal links from a markdown document, taking into account the
   * sourceId of the document, which is part of the link title.
   *
   * @param text The markdown text to parse
   * @returns An array of internal links
   */


  parseInternalLinks(text) {
    return (0, _lodash.compact)([...text.matchAll(this.NotionLinkRegex)].map(match => ({
      title: match[1],
      href: match[2],
      sourceId: match[3]
    })));
  }
  /**
   * Extracts images from the markdown document
   *
   * @param text The markdown text to parse
   * @returns An array of internal links
   */


  parseImages(text) {
    return (0, _lodash.compact)([...text.matchAll(this.ImageRegex)].map(match => ({
      alt: match[1],
      src: match[2]
    })));
  }
  /**
   * Regex to find markdown images of all types
   */


}

exports.default = ImportNotionTask;