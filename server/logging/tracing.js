"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.APM = void 0;
exports.setError = setError;
exports.setResource = setResource;

var _APM = _interopRequireWildcard(require("@theo.gravity/datadog-apm"));

exports.APM = _APM;

var _env = _interopRequireDefault(require("./../env"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// If the DataDog agent is installed and the DD_API_KEY environment variable is
// in the environment then we can safely attempt to start the DD tracer
if (_env.default.DD_API_KEY) {
  (0, _APM.init)({
    // SOURCE_COMMIT is used by Docker Hub
    // SOURCE_VERSION is used by Heroku
    version: undefined || undefined,
    service: process.env.DD_SERVICE || "outline"
  }, {
    useMock: _env.default.ENVIRONMENT === "test"
  });
}
/**
 * Change the resource of the active APM span. This method wraps addTags to allow
 * safe use in environments where APM is disabled.
 *
 * @param name The name of the resource
 */


function setResource(name) {
  if (_APM.tracer) {
    (0, _APM.addTags)({
      "resource.name": `${name}`
    });
  }
}
/**
 * Mark the current active span as an error. This method wraps addTags to allow
 * safe use in environments where APM is disabled.
 *
 * @param error The error to add
 */


function setError(error) {
  if (_APM.tracer) {
    (0, _APM.markAsError)(error);
  }
}

var _default = _APM.tracer;
exports.default = _default;