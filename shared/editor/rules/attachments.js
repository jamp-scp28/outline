"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = linksToAttachments;

require("core-js/modules/es.string.starts-with.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.array.join.js");

require("core-js/modules/es.array.splice.js");

var _token = _interopRequireDefault(require("markdown-it/lib/token"));

var _env = _interopRequireDefault(require("../../env"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isParagraph(token) {
  return token.type === "paragraph_open";
}

function isInline(token) {
  return token.type === "inline";
}

function isLinkOpen(token) {
  return token.type === "link_open";
}

function isLinkClose(token) {
  return token.type === "link_close";
}

function isAttachment(token) {
  var href = token.attrGet("href");
  return (// internal
    (href === null || href === void 0 ? void 0 : href.startsWith("/api/attachments.redirect")) || // external (public share are pre-signed and this is a reasonable way of detecting them)
    ((href === null || href === void 0 ? void 0 : href.startsWith(_env.default.AWS_S3_UPLOAD_BUCKET_URL)) || (href === null || href === void 0 ? void 0 : href.startsWith(_env.default.AWS_S3_ACCELERATE_URL))) && (href === null || href === void 0 ? void 0 : href.includes("X-Amz-Signature"))
  );
}

function linksToAttachments(md) {
  md.core.ruler.after("breaks", "attachments", function (state) {
    var tokens = state.tokens;
    var insideLink;

    for (var i = 0; i < tokens.length - 1; i++) {
      // once we find an inline token look through it's children for links
      if (isInline(tokens[i]) && isParagraph(tokens[i - 1])) {
        var tokenChildren = tokens[i].children || [];

        for (var j = 0; j < tokenChildren.length - 1; j++) {
          var current = tokenChildren[j];

          if (!current) {
            continue;
          }

          if (isLinkOpen(current)) {
            insideLink = current;
            continue;
          }

          if (isLinkClose(current)) {
            insideLink = null;
            continue;
          } // of hey, we found a link – lets check to see if it should be
          // converted to a file attachment


          if (insideLink && isAttachment(insideLink)) {
            var content = current.content; // convert to attachment token

            var token = new _token.default("attachment", "a", 0);
            token.attrSet("href", insideLink.attrGet("href") || "");
            var parts = content.split(" ");
            var size = parts.pop();
            var title = parts.join(" ");
            token.attrSet("size", size || "0");
            token.attrSet("title", title); // delete the inline link – this makes the assumption that the
            // attachment is the only thing in the para.

            tokens.splice(i - 1, 3, token);
            insideLink = null;
            break;
          }
        }
      }
    }

    return false;
  });
}