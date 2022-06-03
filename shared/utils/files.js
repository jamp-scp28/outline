"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.supportedImageMimeTypes = exports.bytesToHumanReadable = void 0;

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.match.js");

require("core-js/modules/es.string.repeat.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.number.constructor.js");

/**
 * Converts bytes to human readable string for display
 *
 * @param bytes filesize in bytes
 * @returns Human readable filesize as a string
 */
var bytesToHumanReadable = function bytesToHumanReadable(bytes) {
  var out = ("0".repeat(bytes.toString().length * 2 % 3) + bytes).match(/.{3}/g);

  if (!out || bytes < 1000) {
    return bytes + " Bytes";
  }

  var f = out[1].substring(0, 2);
  return "".concat(Number(out[0])).concat(f === "00" ? "" : ".".concat(f), " ").concat("  kMGTPEZY"[out.length], "B");
};
/**
 * An array of image mimetypes commonly supported by modern browsers
 */


exports.bytesToHumanReadable = bytesToHumanReadable;
var supportedImageMimeTypes = ["image/jpg", "image/jpeg", "image/pjpeg", "image/png", "image/apng", "image/avif", "image/gif", "image/webp", "image/svg", "image/svg+xml", "image/bmp", "image/tiff"];
exports.supportedImageMimeTypes = supportedImageMimeTypes;