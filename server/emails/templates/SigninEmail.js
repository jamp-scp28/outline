"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _env = _interopRequireDefault(require("./../../env"));

var _Logger = _interopRequireDefault(require("./../../logging/Logger"));

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
 * Email sent to a user when they request a magic sign-in link.
 */
class SigninEmail extends _BaseEmail.default {
  subject() {
    return "Magic signin link";
  }

  preview() {
    return "Here’s your link to signin to Outline.";
  }

  renderAsText({
    token,
    teamUrl
  }) {
    return `
Use the link below to signin to Outline:

${this.signinLink(token)}

If your magic link expired you can request a new one from your team’s
signin page at: ${teamUrl}
`;
  }

  render({
    token,
    teamUrl
  }) {
    if (_env.default.ENVIRONMENT === "development") {
      _Logger.default.debug("email", `Sign-In link: ${this.signinLink(token)}`);
    }

    return /*#__PURE__*/React.createElement(_EmailLayout.default, null, /*#__PURE__*/React.createElement(_Header.default, null), /*#__PURE__*/React.createElement(_Body.default, null, /*#__PURE__*/React.createElement(_Heading.default, null, "Magic Sign-in Link"), /*#__PURE__*/React.createElement("p", null, "Click the button below to sign in to Outline."), /*#__PURE__*/React.createElement(_EmptySpace.default, {
      height: 10
    }), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement(_Button.default, {
      href: this.signinLink(token)
    }, "Sign In")), /*#__PURE__*/React.createElement(_EmptySpace.default, {
      height: 10
    }), /*#__PURE__*/React.createElement("p", null, "If your magic link expired you can request a new one from your team\u2019s sign-in page at: ", /*#__PURE__*/React.createElement("a", {
      href: teamUrl
    }, teamUrl))), /*#__PURE__*/React.createElement(_Footer.default, null));
  }

  signinLink(token) {
    return `${_env.default.URL}/auth/email.callback?token=${token}`;
  }

}

exports.default = SigninEmail;