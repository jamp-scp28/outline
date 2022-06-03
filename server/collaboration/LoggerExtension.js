"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Logger = _interopRequireDefault(require("./../logging/Logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class LoggerExtension {
  async onLoadDocument(data) {
    var _data$context$user;

    _Logger.default.info("hocuspocus", `Loaded document "${data.documentName}"`, {
      userId: (_data$context$user = data.context.user) === null || _data$context$user === void 0 ? void 0 : _data$context$user.id
    });
  }

  async onConnect(data) {
    _Logger.default.info("hocuspocus", `New connection to "${data.documentName}"`);
  }

  async onDisconnect(data) {
    var _data$context$user2;

    _Logger.default.info("hocuspocus", `Closed connection to "${data.documentName}"`, {
      userId: (_data$context$user2 = data.context.user) === null || _data$context$user2 === void 0 ? void 0 : _data$context$user2.id
    });
  }

}

exports.default = LoggerExtension;