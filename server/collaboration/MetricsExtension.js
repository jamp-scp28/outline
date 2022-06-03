"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _metrics = _interopRequireDefault(require("./../logging/metrics"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MetricsExtension {
  async onLoadDocument({
    documentName,
    instance
  }) {
    _metrics.default.increment("collaboration.load_document", {
      documentName
    });

    _metrics.default.gaugePerInstance("collaboration.documents_count", instance.getDocumentsCount());
  }

  onAuthenticationFailed({
    documentName
  }) {
    _metrics.default.increment("collaboration.authentication_failed", {
      documentName
    });
  }

  async onConnect({
    documentName,
    instance
  }) {
    _metrics.default.increment("collaboration.connect", {
      documentName
    });

    _metrics.default.gaugePerInstance("collaboration.connections_count", instance.getConnectionsCount());
  }

  async onDisconnect({
    documentName,
    instance
  }) {
    _metrics.default.increment("collaboration.disconnect", {
      documentName
    });

    _metrics.default.gaugePerInstance("collaboration.connections_count", instance.getConnectionsCount());

    _metrics.default.gaugePerInstance("collaboration.documents_count", // -1 adjustment because hook is called before document is removed
    instance.getDocumentsCount() - 1);
  }

  async onStoreDocument({
    documentName
  }) {
    _metrics.default.increment("collaboration.change", {
      documentName
    });
  }

  async onDestroy() {
    _metrics.default.gaugePerInstance("collaboration.connections_count", 0);

    _metrics.default.gaugePerInstance("collaboration.documents_count", 0);
  }

}

exports.default = MetricsExtension;