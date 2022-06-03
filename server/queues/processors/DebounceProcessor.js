"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Document = _interopRequireDefault(require("./../../models/Document"));

var _ = require("..");

var _BaseProcessor = _interopRequireDefault(require("./BaseProcessor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class DebounceProcessor extends _BaseProcessor.default {
  async perform(event) {
    switch (event.name) {
      case "documents.update":
        {
          _.globalEventQueue.add({ ...event,
            name: "documents.update.delayed"
          }, {
            delay: 5 * 60 * 1000
          });

          break;
        }

      case "documents.update.delayed":
        {
          const document = await _Document.default.findByPk(event.documentId, {
            attributes: ["updatedAt"]
          }); // If the document has been deleted then prevent further processing

          if (!document) {
            return;
          } // If the document has been updated since we initially queued the delayed
          // event then abort, there must be another updated event in the queue –
          // this functions as a simple distributed debounce.


          if (document.updatedAt > new Date(event.createdAt)) {
            return;
          }

          _.globalEventQueue.add({ ...event,
            name: "documents.update.debounced"
          });

          break;
        }

      default:
    }
  }

}

exports.default = DebounceProcessor;

_defineProperty(DebounceProcessor, "applicableEvents", ["documents.update", "documents.update.delayed"]);