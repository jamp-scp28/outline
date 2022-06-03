"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _invariant = _interopRequireDefault(require("invariant"));

var React = _interopRequireWildcard(require("react"));

var _models = require("./../../models");

var _BaseEmail = _interopRequireDefault(require("./BaseEmail"));

var _Body = _interopRequireDefault(require("./components/Body"));

var _Button = _interopRequireDefault(require("./components/Button"));

var _EmailLayout = _interopRequireDefault(require("./components/EmailLayout"));

var _EmptySpace = _interopRequireDefault(require("./components/EmptySpace"));

var _Footer = _interopRequireDefault(require("./components/Footer"));

var _Header = _interopRequireDefault(require("./components/Header"));

var _Heading = _interopRequireDefault(require("./components/Heading"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Email sent to a user when they have enabled document notifications, the event
 * may be published or updated.
 */
class DocumentNotificationEmail extends _BaseEmail.default {
  async beforeSend({
    documentId
  }) {
    const document = await _models.Document.unscoped().findByPk(documentId);
    (0, _invariant.default)(document, "Document not found");
    return {
      document
    };
  }

  subject({
    document,
    eventName
  }) {
    return `“${document.title}” ${eventName}`;
  }

  preview({
    actorName,
    eventName
  }) {
    return `${actorName} ${eventName} a new document`;
  }

  renderAsText({
    actorName,
    teamUrl,
    document,
    collectionName,
    eventName = "published"
  }) {
    return `
"${document.title}" ${eventName}

${actorName} ${eventName} the document "${document.title}", in the ${collectionName} collection.

Open Document: ${teamUrl}${document.url}
`;
  }

  render({
    document,
    actorName,
    collectionName,
    eventName = "published",
    teamUrl,
    unsubscribeUrl
  }) {
    return /*#__PURE__*/React.createElement(_EmailLayout.default, null, /*#__PURE__*/React.createElement(_Header.default, null), /*#__PURE__*/React.createElement(_Body.default, null, /*#__PURE__*/React.createElement(_Heading.default, null, "\"", document.title, "\" ", eventName), /*#__PURE__*/React.createElement("p", null, actorName, " ", eventName, " the document \"", document.title, "\", in the", " ", collectionName, " collection."), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(_EmptySpace.default, {
      height: 10
    }), /*#__PURE__*/React.createElement("p", null, document.getSummary()), /*#__PURE__*/React.createElement(_EmptySpace.default, {
      height: 10
    }), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement(_Button.default, {
      href: `${teamUrl}${document.url}`
    }, "Open Document"))), /*#__PURE__*/React.createElement(_Footer.default, {
      unsubscribeUrl: unsubscribeUrl
    }));
  }

}

exports.default = DocumentNotificationEmail;