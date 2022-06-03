"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getDataTransferFiles;

require("core-js/modules/es.array.slice.js");

function getDataTransferFiles(event) {
  var dataTransferItemsList;

  if ("dataTransfer" in event) {
    var dt = event.dataTransfer;

    if (dt.files && dt.files.length) {
      dataTransferItemsList = dt.files;
    } else if (dt.items && dt.items.length) {
      // During the drag even the dataTransfer.files is null
      // but Chrome implements some drag store, which is accesible via dataTransfer.items
      dataTransferItemsList = dt.items;
    }
  } else if (event.target && "files" in event.target) {
    // @ts-expect-error fallback
    dataTransferItemsList = event.target.files;
  } // Convert from DataTransferItemsList to the native Array


  return dataTransferItemsList ? Array.prototype.slice.call(dataTransferItemsList) : [];
}