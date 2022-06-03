"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tracing = require("./../logging/tracing");

var _models = require("./../models");

var _FileOperation = require("./../models/FileOperation");

var _s = require("./../utils/s3");

async function collectionExporter({
  collection,
  team,
  user,
  ip,
  transaction
}) {
  const collectionId = collection === null || collection === void 0 ? void 0 : collection.id;
  const key = (0, _s.getAWSKeyForFileOp)(user.teamId, (collection === null || collection === void 0 ? void 0 : collection.name) || team.name);
  const fileOperation = await _models.FileOperation.create({
    type: _FileOperation.FileOperationType.Export,
    state: _FileOperation.FileOperationState.Creating,
    format: _FileOperation.FileOperationFormat.MarkdownZip,
    key,
    url: null,
    size: 0,
    collectionId,
    userId: user.id,
    teamId: user.teamId
  }, {
    transaction
  });
  await _models.Event.create({
    name: "fileOperations.create",
    teamId: user.teamId,
    actorId: user.id,
    modelId: fileOperation.id,
    collectionId,
    ip,
    data: {
      type: _FileOperation.FileOperationType.Import
    }
  }, {
    transaction
  });
  fileOperation.user = user;

  if (collection) {
    fileOperation.collection = collection;
  }

  return fileOperation;
}

var _default = _tracing.APM.traceFunction({
  serviceName: "command",
  spanName: "collectionExporter"
})(collectionExporter);

exports.default = _default;