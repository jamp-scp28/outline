"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tracing = require("./../logging/tracing");

function present(user, objects) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const {
    serialize
  } = require("../policies");

  return objects.map(object => ({
    id: object.id,
    abilities: serialize(user, object)
  }));
}

var _default = _tracing.APM.traceFunction({
  serviceName: "presenter",
  spanName: "policy"
})(present);

exports.default = _default;