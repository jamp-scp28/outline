"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _invariant = _interopRequireDefault(require("invariant"));

var _revisionCreator = _interopRequireDefault(require("./../../commands/revisionCreator"));

var _models = require("./../../models");

var _BaseProcessor = _interopRequireDefault(require("./BaseProcessor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class RevisionsProcessor extends _BaseProcessor.default {
  async perform(event) {
    switch (event.name) {
      case "documents.publish":
      case "documents.update.debounced":
        {
          const document = await _models.Document.findByPk(event.documentId);
          (0, _invariant.default)(document, "Document should exist");
          const previous = await _models.Revision.findLatest(document.id); // we don't create revisions if identical to previous revision, this can
          // happen if a manual revision was created from another service or user.

          if (previous && document.text === previous.text && document.title === previous.title) {
            return;
          }

          const user = await _models.User.findByPk(event.actorId);
          (0, _invariant.default)(user, "User should exist");
          await (0, _revisionCreator.default)({
            user,
            document
          });
          break;
        }

      default:
    }
  }

}

exports.default = RevisionsProcessor;

_defineProperty(RevisionsProcessor, "applicableEvents", ["documents.publish", "documents.update.debounced"]);