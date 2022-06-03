"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = init;

var _url = _interopRequireDefault(require("url"));

var _server = require("@hocuspocus/server");

var _invariant = _interopRequireDefault(require("invariant"));

var _ws = _interopRequireDefault(require("ws"));

var _AuthenticationExtension = _interopRequireDefault(require("../collaboration/AuthenticationExtension"));

var _LoggerExtension = _interopRequireDefault(require("../collaboration/LoggerExtension"));

var _MetricsExtension = _interopRequireDefault(require("../collaboration/MetricsExtension"));

var _PersistenceExtension = _interopRequireDefault(require("../collaboration/PersistenceExtension"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function init(app, server) {
  const path = "/collaboration";
  const wss = new _ws.default.Server({
    noServer: true
  });

  const hocuspocus = _server.Server.configure({
    debounce: 3000,
    maxDebounce: 10000,
    extensions: [new _AuthenticationExtension.default(), new _PersistenceExtension.default(), new _LoggerExtension.default(), new _MetricsExtension.default()]
  });

  server.on("upgrade", function (req, socket, head) {
    if (req.url && req.url.indexOf(path) > -1) {
      var _url$parse$pathname;

      const documentName = (_url$parse$pathname = _url.default.parse(req.url).pathname) === null || _url$parse$pathname === void 0 ? void 0 : _url$parse$pathname.split("/").pop();
      (0, _invariant.default)(documentName, "Document name must be provided");
      wss.handleUpgrade(req, socket, head, client => {
        hocuspocus.handleConnection(client, req, documentName);
      });
    }
  });
  server.on("shutdown", () => {
    return hocuspocus.destroy();
  });
}