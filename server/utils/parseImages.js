"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseImages;

var _editor = require("./../editor");

function parseImages(text) {
  const value = _editor.parser.parse(text);

  const images = [];

  function findImages(node) {
    if (node.type.name === "image") {
      if (!images.includes(node.attrs.src)) {
        images.push(node.attrs.src);
      }

      return;
    }

    if (!node.content.size) {
      return;
    }

    node.content.descendants(findImages);
  }

  findImages(value);
  return images;
}