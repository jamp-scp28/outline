"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.archiveCollections = archiveCollections;
exports.zipAsFileTree = zipAsFileTree;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _jszip = _interopRequireDefault(require("jszip"));

var _lodash = require("lodash");

var _tmp = _interopRequireDefault(require("tmp"));

var _Logger = _interopRequireDefault(require("./../logging/Logger"));

var _Attachment = _interopRequireDefault(require("./../models/Attachment"));

var _Document = _interopRequireDefault(require("./../models/Document"));

var _fs2 = require("./fs");

var _parseAttachmentIds = _interopRequireDefault(require("./parseAttachmentIds"));

var _s = require("./s3");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function addDocumentTreeToArchive(zip, documents) {
  for (const doc of documents) {
    const document = await _Document.default.findByPk(doc.id);

    if (!document) {
      continue;
    }

    let text = document.toMarkdown();
    const attachments = await _Attachment.default.findAll({
      where: {
        teamId: document.teamId,
        id: (0, _parseAttachmentIds.default)(document.text)
      }
    });

    for (const attachment of attachments) {
      await addImageToArchive(zip, attachment.key);
      text = text.replace(attachment.redirectUrl, encodeURI(attachment.key));
    }

    let title = (0, _fs2.serializeFilename)(document.title) || "Untitled";
    title = safeAddFileToArchive(zip, `${title}.md`, text, {
      date: document.updatedAt,
      comment: JSON.stringify({
        createdAt: document.createdAt,
        updatedAt: document.updatedAt
      })
    });

    if (doc.children && doc.children.length) {
      const folder = zip.folder(_path.default.parse(title).name);

      if (folder) {
        await addDocumentTreeToArchive(folder, doc.children);
      }
    }
  }
}
/**
 * Adds the content of a file in remote storage to the given zip file.
 *
 * @param zip JSZip object to add to
 * @param key path to file in S3 storage
 */


async function addImageToArchive(zip, key) {
  try {
    const img = await (0, _s.getFileByKey)(key); // @ts-expect-error Blob

    zip.file(key, img, {
      createFolders: true
    });
  } catch (err) {
    _Logger.default.error("Error loading image attachment from S3", err, {
      key
    });
  }
}
/**
 * Adds content to a zip file, if the given filename already exists in the zip
 * then it will automatically increment numbers at the end of the filename.
 *
 * @param zip JSZip object to add to
 * @param key filename with extension
 * @param content the content to add
 * @param options options for added content
 * @returns The new title
 */


function safeAddFileToArchive(zip, key, content, options) {
  // @ts-expect-error root exists
  const root = zip.root; // Filenames in the directory already

  const keysInDirectory = Object.keys(zip.files).filter(k => k.includes(root)).filter(k => !k.endsWith("/")).map(k => _path.default.basename(k).replace(/\s\((\d+)\)\./, ".")); // The number of duplicate filenames

  const existingKeysCount = keysInDirectory.filter(t => t === key).length;

  const filename = _path.default.parse(key).name;

  const extension = _path.default.extname(key); // Construct the new de-duplicated filename (if any)


  const safeKey = existingKeysCount > 0 ? `${filename} (${existingKeysCount})${extension}` : key;
  zip.file(safeKey, content, options);
  return safeKey;
}
/**
 * Write a zip file to a temporary disk location
 *
 * @param zip JSZip object
 * @returns pathname of the temporary file where the zip was written to disk
 */


async function archiveToPath(zip) {
  return new Promise((resolve, reject) => {
    _tmp.default.file({
      prefix: "export-",
      postfix: ".zip"
    }, (err, path) => {
      if (err) {
        return reject(err);
      }

      zip.generateNodeStream({
        type: "nodebuffer",
        streamFiles: true
      }).pipe(_fs.default.createWriteStream(path)).on("finish", () => resolve(path)).on("error", reject);
    });
  });
}

async function archiveCollections(collections) {
  const zip = new _jszip.default();

  for (const collection of collections) {
    if (collection.documentStructure) {
      const folder = zip.folder((0, _fs2.serializeFilename)(collection.name));

      if (folder) {
        await addDocumentTreeToArchive(folder, collection.documentStructure);
      }
    }
  }

  return archiveToPath(zip);
}

/**
 * Converts the flat structure returned by JSZIP into a nested file structure
 * for easier processing.
 *
 * @param paths An array of paths to files in the zip
 * @returns
 */
function zipAsFileTree(zip) {
  const paths = Object.keys(zip.files).map(filePath => `/${filePath}`);
  const tree = [];
  paths.forEach(function (filePath) {
    if (filePath.startsWith("/__MACOSX")) {
      return;
    }

    const pathParts = filePath.split("/"); // Remove first blank element from the parts array.

    pathParts.shift();
    let currentLevel = tree; // initialize currentLevel to root

    pathParts.forEach(function (name) {
      // check to see if the path already exists.
      const existingPath = (0, _lodash.find)(currentLevel, {
        name
      });

      if (existingPath) {
        // The path to this item was already in the tree, so don't add again.
        // Set the current level to this path's children
        currentLevel = existingPath.children;
      } else if (name.endsWith(".DS_Store") || !name) {
        return;
      } else {
        const newPart = {
          name,
          path: filePath.replace(/^\//, ""),
          title: (0, _fs2.deserializeFilename)(_path.default.parse(_path.default.basename(name)).name),
          children: []
        };
        currentLevel.push(newPart);
        currentLevel = newPart.children;
      }
    });
  });
  return tree;
}