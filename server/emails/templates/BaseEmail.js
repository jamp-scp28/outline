"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mailer = _interopRequireDefault(require("./../mailer"));

var _metrics = _interopRequireDefault(require("./../../logging/metrics"));

var _queues = require("./../../queues");

var _BaseTask = require("./../../queues/tasks/BaseTask");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BaseEmail {
  /**
   * Schedule this email type to be sent asyncronously by a worker.
   *
   * @param props Properties to be used in the email template
   * @returns A promise that resolves once the email is placed on the task queue
   */
  static schedule(props) {
    const templateName = this.name;

    _metrics.default.increment("email.scheduled", {
      templateName
    }); // Ideally we'd use EmailTask.schedule here but importing creates a circular
    // dependency so we're pushing onto the task queue in the expected format


    return _queues.taskQueue.add({
      name: "EmailTask",
      props: {
        templateName,
        props
      }
    }, {
      priority: _BaseTask.TaskPriority.Normal,
      attempts: 5,
      backoff: {
        type: "exponential",
        delay: 60 * 1000
      }
    });
  }

  constructor(props) {
    this.props = props;
  }
  /**
   * Send this email now.
   *
   * @returns A promise that resolves once the email has been successfully sent.
   */


  async send() {
    const bsResponse = this.beforeSend ? await this.beforeSend(this.props) : {};
    const data = { ...this.props,
      ...bsResponse
    };
    const templateName = this.constructor.name;

    try {
      await _mailer.default.sendMail({
        to: this.props.to,
        subject: this.subject(data),
        previewText: this.preview(data),
        component: this.render(data),
        text: this.renderAsText(data)
      });

      _metrics.default.increment("email.sent", {
        templateName
      });
    } catch (err) {
      _metrics.default.increment("email.sending_failed", {
        templateName
      });

      throw err;
    }
  }
  /**
   * Returns the subject of the email.
   *
   * @param props Props in email constructor
   * @returns The email subject as a string
   */


}

exports.default = BaseEmail;