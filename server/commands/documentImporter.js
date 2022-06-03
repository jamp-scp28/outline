"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _emojiRegex = _interopRequireDefault(require("emoji-regex"));

var _joplinTurndownPluginGfm = require("joplin-turndown-plugin-gfm");

var _lodash = require("lodash");

var _mammoth = _interopRequireDefault(require("mammoth"));

var _quotedPrintable = _interopRequireDefault(require("quoted-printable"));

var _turndown = _interopRequireDefault(require("turndown"));

var _utf = _interopRequireDefault(require("utf8"));

var _constants = require("./../../shared/constants");

var _parseTitle = _interopRequireDefault(require("./../../shared/utils/parseTitle"));

var _tracing = require("./../logging/tracing");

var _dataURItoBuffer = _interopRequireDefault(require("./../utils/dataURItoBuffer"));

var _parseImages = _interopRequireDefault(require("./../utils/parseImages"));

var _errors = require("../errors");

var _attachmentCreator = _interopRequireDefault(require("./attachmentCreator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://github.com/domchristie/turndown#options
const turndownService = new _turndown.default({
  hr: "---",
  bulletListMarker: "-",
  headingStyle: "atx"
}).remove(["script", "style", "title", "head"]); // Use the GitHub-flavored markdown plugin to parse
// strikethoughs and tables

turndownService.use(_joplinTurndownPluginGfm.strikethrough).use(_joplinTurndownPluginGfm.tables).addRule("breaks", {
  filter: ["br"],
  replacement: function () {
    return "\n";
  }
});
const importMapping = [{
  type: "application/msword",
  getMarkdown: confluenceToMarkdown
}, {
  type: "application/octet-stream",
  getMarkdown: docxToMarkdown
}, {
  type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  getMarkdown: docxToMarkdown
}, {
  type: "text/html",
  getMarkdown: htmlToMarkdown
}, {
  type: "text/plain",
  getMarkdown: fileToMarkdown
}, {
  type: "text/markdown",
  getMarkdown: fileToMarkdown
}];

async function fileToMarkdown(content) {
  if (content instanceof Buffer) {
    content = content.toString("utf8");
  }

  return content;
}

async function docxToMarkdown(content) {
  if (content instanceof Buffer) {
    const {
      value: html
    } = await _mammoth.default.convertToHtml({
      buffer: content
    });
    return turndownService.turndown(html);
  }

  throw new Error("docxToMarkdown: content must be a Buffer");
}

async function htmlToMarkdown(content) {
  if (content instanceof Buffer) {
    content = content.toString("utf8");
  }

  return turndownService.turndown(content);
}

async function confluenceToMarkdown(value) {
  if (value instanceof Buffer) {
    value = value.toString("utf8");
  } // We're only supporting the ridiculous output from Confluence here, regular
  // Word documents should call into the docxToMarkdown importer.
  // See: https://jira.atlassian.com/browse/CONFSERVER-38237


  if (!value.includes("Content-Type: multipart/related")) {
    throw (0, _errors.FileImportError)("Unsupported Word file");
  } // get boundary marker


  const boundaryMarker = value.match(/boundary="(.+)"/);

  if (!boundaryMarker) {
    throw (0, _errors.FileImportError)("Unsupported Word file (No boundary marker)");
  } // get content between multipart boundaries


  let boundaryReached = 0;
  const lines = value.split("\n").filter(line => {
    if (line.includes(boundaryMarker[1])) {
      boundaryReached++;
      return false;
    }

    if (line.startsWith("Content-")) {
      return false;
    } // 1 == definition
    // 2 == content
    // 3 == ending


    if (boundaryReached === 2) {
      return true;
    }

    return false;
  });

  if (!lines.length) {
    throw (0, _errors.FileImportError)("Unsupported Word file (No content found)");
  } // Mime attachment is "quoted printable" encoded, must be decoded first
  // https://en.wikipedia.org/wiki/Quoted-printable


  value = _utf.default.decode(_quotedPrintable.default.decode(lines.join("\n"))); // If we don't remove the title here it becomes printed in the document
  // body by turndown

  turndownService.remove(["style", "title"]); // Now we should have something that looks like HTML

  const html = turndownService.turndown(value);
  return html.replace(/<br>/g, " \\n ");
}

async function documentImporter({
  mimeType,
  fileName,
  content,
  user,
  ip,
  transaction
}) {
  const fileInfo = importMapping.filter(item => {
    if (item.type === mimeType) {
      if (mimeType === "application/octet-stream" && _path.default.extname(fileName) !== ".docx") {
        return false;
      }

      return true;
    }

    if (item.type === "text/markdown" && _path.default.extname(fileName) === ".md") {
      return true;
    }

    return false;
  })[0];

  if (!fileInfo) {
    throw (0, _errors.InvalidRequestError)(`File type ${mimeType} not supported`);
  }

  let title = fileName.replace(/\.[^/.]+$/, "");
  let text = await fileInfo.getMarkdown(content);
  text = text.trim(); // find and extract first emoji, in the case of some imports it can be outside
  // of the title, at the top of the document.

  const regex = (0, _emojiRegex.default)();
  const matches = regex.exec(text);
  const firstEmoji = matches ? matches[0] : undefined;

  if (firstEmoji && text.startsWith(firstEmoji)) {
    text = text.replace(firstEmoji, "").trim();
  } // If the first line of the imported text looks like a markdown heading
  // then we can use this as the document title


  if (text.startsWith("# ")) {
    const result = (0, _parseTitle.default)(text);
    title = result.title;
    text = text.replace(`# ${title}\n`, "");
  } // If we parsed an emoji from _above_ the title then add it back at prefixing


  if (firstEmoji) {
    title = `${firstEmoji} ${title}`;
  } // find data urls, convert to blobs, upload and write attachments


  const images = (0, _parseImages.default)(text);
  const dataURIs = images.filter(href => href.startsWith("data:"));

  for (const uri of dataURIs) {
    const name = "imported";
    const {
      buffer,
      type
    } = (0, _dataURItoBuffer.default)(uri);
    const attachment = await (0, _attachmentCreator.default)({
      name,
      type,
      buffer,
      user,
      ip,
      transaction
    });
    text = text.replace(uri, attachment.redirectUrl);
  } // It's better to truncate particularly long titles than fail the import


  title = (0, _lodash.truncate)(title, {
    length: _constants.MAX_TITLE_LENGTH
  });
  return {
    text,
    title
  };
}

var _default = _tracing.APM.traceFunction({
  serviceName: "command",
  spanName: "documentImporter"
})(documentImporter);

exports.default = _default;