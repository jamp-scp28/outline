"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _BaseEmail = _interopRequireDefault(require("./BaseEmail"));

var _Body = _interopRequireDefault(require("./components/Body"));

var _Button = _interopRequireDefault(require("./components/Button"));

var _EmailLayout = _interopRequireDefault(require("./components/EmailLayout"));

var _EmptySpace = _interopRequireDefault(require("./components/EmptySpace"));

var _Footer = _interopRequireDefault(require("./components/Footer"));

var _Header = _interopRequireDefault(require("./components/Header"));

var _Heading = _interopRequireDefault(require("./components/Heading"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Email sent to an external user when an admin sends them an invite and they
 * haven't signed in after a few days.
 */
class InviteReminderEmail extends _BaseEmail.default {
  subject({
    actorName,
    teamName
  }) {
    return `Reminder: ${actorName} invited you to join ${teamName}’s knowledge base`;
  }

  preview() {
    return "Outline is a place for your team to build and share knowledge.";
  }

  renderAsText({
    teamName,
    actorName,
    actorEmail,
    teamUrl
  }) {
    return `
This is just a quick reminder that ${actorName} (${actorEmail}) invited you to join them in the ${teamName} team on Outline, a place for your team to build and share knowledge.
We only send a reminder once.

If you haven't signed up yet, you can do so here: ${teamUrl}
`;
  }

  render({
    teamName,
    actorName,
    actorEmail,
    teamUrl
  }) {
    return /*#__PURE__*/React.createElement(_EmailLayout.default, null, /*#__PURE__*/React.createElement(_Header.default, null), /*#__PURE__*/React.createElement(_Body.default, null, /*#__PURE__*/React.createElement(_Heading.default, null, "Join ", teamName, " on Outline"), /*#__PURE__*/React.createElement("p", null, "This is just a quick reminder that ", actorName, " (", actorEmail, ") invited you to join them in the ", teamName, " team on Outline, a place for your team to build and share knowledge."), /*#__PURE__*/React.createElement("p", null, "If you haven't signed up yet, you can do so here:"), /*#__PURE__*/React.createElement(_EmptySpace.default, {
      height: 10
    }), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement(_Button.default, {
      href: teamUrl
    }, "Join now"))), /*#__PURE__*/React.createElement(_Footer.default, null));
  }

}

exports.default = InviteReminderEmail;