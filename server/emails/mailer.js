"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Mailer = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _oyVey = _interopRequireDefault(require("oy-vey"));

var _env = _interopRequireDefault(require("./../env"));

var _Logger = _interopRequireDefault(require("./../logging/Logger"));

var _tracing = require("./../logging/tracing");

var _EmailLayout = require("./templates/components/EmailLayout");

var _dec, _dec2, _dec3, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const useTestEmailService = _env.default.ENVIRONMENT === "development" && !_env.default.SMTP_USERNAME;

/**
 * Mailer class to send emails.
 */
let Mailer = (_dec = _tracing.APM.trace({
  spanName: "mailer"
}), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = class Mailer {
  constructor() {
    _defineProperty(this, "sendMail", async data => {
      const {
        transporter
      } = this;

      if (!transporter) {
        _Logger.default.info("email", `Attempted to send email "${data.subject}" to ${data.to} but no transport configured.`);

        return;
      }

      const html = _oyVey.default.renderTemplate(data.component, {
        title: data.subject,
        headCSS: [_EmailLayout.baseStyles, data.headCSS].join(" "),
        previewText: data.previewText
      });

      try {
        _Logger.default.info("email", `Sending email "${data.subject}" to ${data.to}`);

        const info = await transporter.sendMail({
          from: _env.default.SMTP_FROM_EMAIL,
          replyTo: data.replyTo ?? _env.default.SMTP_REPLY_EMAIL ?? _env.default.SMTP_FROM_EMAIL,
          to: data.to,
          subject: data.subject,
          html,
          text: data.text
        });

        if (useTestEmailService) {
          _Logger.default.info("email", `Preview Url: ${_nodemailer.default.getTestMessageUrl(info)}`);
        }
      } catch (err) {
        _Logger.default.error(`Error sending email to ${data.to}`, err);

        throw err; // Re-throw for queue to re-try
      }
    });

    if (_env.default.SMTP_HOST) {
      this.transporter = _nodemailer.default.createTransport(this.getOptions());
    }

    if (useTestEmailService) {
      _Logger.default.info("email", "SMTP_USERNAME not provided, generating test account…");

      this.getTestTransportOptions().then(options => {
        if (!options) {
          _Logger.default.info("email", "Couldn't generate a test account with ethereal.email at this time – emails will not be sent.");
        }

        this.transporter = _nodemailer.default.createTransport(options);
      });
    }
  }

  getOptions() {
    return {
      host: _env.default.SMTP_HOST,
      port: _env.default.SMTP_PORT,
      secure: _env.default.SMTP_SECURE ?? _env.default.ENVIRONMENT === "production",
      auth: _env.default.SMTP_USERNAME ? {
        user: _env.default.SMTP_USERNAME,
        pass: _env.default.SMTP_PASSWORD
      } : undefined,
      tls: _env.default.SMTP_TLS_CIPHERS ? {
        ciphers: _env.default.SMTP_TLS_CIPHERS
      } : undefined
    };
  }

  async getTestTransportOptions() {
    try {
      const testAccount = await _nodemailer.default.createTestAccount();
      return {
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      };
    } catch (err) {
      return undefined;
    }
  }

}) || _class) || _class) || _class);
exports.Mailer = Mailer;
const mailer = new Mailer();
var _default = mailer;
exports.default = _default;