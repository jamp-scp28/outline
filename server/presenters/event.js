"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = present;

var _user = _interopRequireDefault(require("./user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function present(event, isAdmin = false) {
  const data = {
    id: event.id,
    name: event.name,
    modelId: event.modelId,
    actorId: event.actorId,
    actorIpAddress: event.ip || undefined,
    collectionId: event.collectionId,
    documentId: event.documentId,
    createdAt: event.createdAt,
    data: event.data,
    actor: (0, _user.default)(event.actor)
  };

  if (!isAdmin) {
    delete data.actorIpAddress;
  }

  return data;
}