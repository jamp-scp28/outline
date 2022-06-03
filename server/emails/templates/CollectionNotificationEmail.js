"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _invariant = _interopRequireDefault(require("invariant"));

var React = _interopRequireWildcard(require("react"));

var _env = _interopRequireDefault(require("./../../env"));

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
 * Email sent to a user when they have enabled notifications of new collection
 * creation.
 */
class CollectionNotificationEmail extends _BaseEmail.default {
  async beforeSend({
    collectionId
  }) {
    const collection = await _models.Collection.scope("withUser").findByPk(collectionId);
    (0, _invariant.default)(collection, "Collection not found");
    return {
      collection
    };
  }

  subject({
    collection,
    eventName
  }) {
    return `“${collection.name}” ${eventName}`;
  }

  preview({
    collection,
    eventName
  }) {
    return `${collection.user.name} ${eventName} a collection`;
  }

  renderAsText({
    collection,
    eventName = "created"
  }) {
    return `
${collection.name}

${collection.user.name} ${eventName} the collection "${collection.name}"

Open Collection: ${_env.default.URL}${collection.url}
`;
  }

  render({
    collection,
    eventName = "created",
    unsubscribeUrl
  }) {
    return /*#__PURE__*/React.createElement(_EmailLayout.default, null, /*#__PURE__*/React.createElement(_Header.default, null), /*#__PURE__*/React.createElement(_Body.default, null, /*#__PURE__*/React.createElement(_Heading.default, null, collection.name), /*#__PURE__*/React.createElement("p", null, collection.user.name, " ", eventName, " the collection \"", collection.name, "\"."), /*#__PURE__*/React.createElement(_EmptySpace.default, {
      height: 10
    }), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement(_Button.default, {
      href: `${_env.default.URL}${collection.url}`
    }, "Open Collection"))), /*#__PURE__*/React.createElement(_Footer.default, {
      unsubscribeUrl: unsubscribeUrl
    }));
  }

}

exports.default = CollectionNotificationEmail;