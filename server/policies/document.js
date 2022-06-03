"use strict";

var _invariant = _interopRequireDefault(require("invariant"));

var _models = require("./../models");

var _cancan = require("./cancan");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _cancan.allow)(_models.User, "createDocument", _models.Team, (user, team) => {
  if (!team || user.isViewer || user.teamId !== team.id) {
    return false;
  }

  return true;
});
(0, _cancan.allow)(_models.User, ["read", "download"], _models.Document, (user, document) => {
  if (!document) {
    return false;
  } // existence of collection option is not required here to account for share tokens


  if (document.collection && (0, _cancan._cannot)(user, "read", document.collection)) {
    return false;
  }

  return user.teamId === document.teamId;
});
(0, _cancan.allow)(_models.User, "star", _models.Document, (user, document) => {
  if (!document) {
    return false;
  }

  if (document.archivedAt) {
    return false;
  }

  if (document.deletedAt) {
    return false;
  }

  if (document.template) {
    return false;
  }

  (0, _invariant.default)(document.collection, "collection is missing, did you forget to include in the query scope?");

  if ((0, _cancan._cannot)(user, "read", document.collection)) {
    return false;
  }

  return user.teamId === document.teamId;
});
(0, _cancan.allow)(_models.User, "unstar", _models.Document, (user, document) => {
  if (!document) {
    return false;
  }

  if (document.template) {
    return false;
  }

  (0, _invariant.default)(document.collection, "collection is missing, did you forget to include in the query scope?");

  if ((0, _cancan._cannot)(user, "read", document.collection)) {
    return false;
  }

  return user.teamId === document.teamId;
});
(0, _cancan.allow)(_models.User, "share", _models.Document, (user, document) => {
  if (!document) {
    return false;
  }

  if (document.archivedAt) {
    return false;
  }

  if (document.deletedAt) {
    return false;
  }

  (0, _invariant.default)(document.collection, "collection is missing, did you forget to include in the query scope?");

  if ((0, _cancan._cannot)(user, "share", document.collection)) {
    return false;
  }

  return user.teamId === document.teamId;
});
(0, _cancan.allow)(_models.User, "update", _models.Document, (user, document) => {
  if (!document) {
    return false;
  }

  if (document.archivedAt) {
    return false;
  }

  if (document.deletedAt) {
    return false;
  }

  if ((0, _cancan._cannot)(user, "update", document.collection)) {
    return false;
  }

  return user.teamId === document.teamId;
});
(0, _cancan.allow)(_models.User, "createChildDocument", _models.Document, (user, document) => {
  if (!document) {
    return false;
  }

  if (document.archivedAt) {
    return false;
  }

  if (document.deletedAt) {
    return false;
  }

  if (document.template) {
    return false;
  }

  if (!document.publishedAt) {
    return false;
  }

  (0, _invariant.default)(document.collection, "collection is missing, did you forget to include in the query scope?");

  if ((0, _cancan._cannot)(user, "update", document.collection)) {
    return false;
  }

  return user.teamId === document.teamId;
});
(0, _cancan.allow)(_models.User, "move", _models.Document, (user, document) => {
  if (!document) {
    return false;
  }

  if (document.archivedAt) {
    return false;
  }

  if (document.deletedAt) {
    return false;
  }

  if (!document.publishedAt) {
    return false;
  }

  (0, _invariant.default)(document.collection, "collection is missing, did you forget to include in the query scope?");

  if ((0, _cancan._cannot)(user, "update", document.collection)) {
    return false;
  }

  return user.teamId === document.teamId;
});
(0, _cancan.allow)(_models.User, ["pin", "unpin"], _models.Document, (user, document) => {
  if (!document) {
    return false;
  }

  if (document.archivedAt) {
    return false;
  }

  if (document.deletedAt) {
    return false;
  }

  if (document.template) {
    return false;
  }

  if (!document.publishedAt) {
    return false;
  }

  (0, _invariant.default)(document.collection, "collection is missing, did you forget to include in the query scope?");

  if ((0, _cancan._cannot)(user, "update", document.collection)) {
    return false;
  }

  return user.teamId === document.teamId;
});
(0, _cancan.allow)(_models.User, ["pinToHome"], _models.Document, (user, document) => {
  if (!document) {
    return false;
  }

  if (document.archivedAt) {
    return false;
  }

  if (document.deletedAt) {
    return false;
  }

  if (document.template) {
    return false;
  }

  if (!document.publishedAt) {
    return false;
  }

  return user.teamId === document.teamId && user.isAdmin;
});
(0, _cancan.allow)(_models.User, "delete", _models.Document, (user, document) => {
  if (!document) {
    return false;
  }

  if (document.deletedAt) {
    return false;
  }

  if (user.isViewer) {
    return false;
  } // allow deleting document without a collection


  if (document.collection && (0, _cancan._cannot)(user, "update", document.collection)) {
    return false;
  } // unpublished drafts can always be deleted


  if (!document.deletedAt && !document.publishedAt && user.teamId === document.teamId) {
    return true;
  }

  return user.teamId === document.teamId;
});
(0, _cancan.allow)(_models.User, "permanentDelete", _models.Document, (user, document) => {
  if (!document) {
    return false;
  }

  if (!document.deletedAt) {
    return false;
  }

  if (user.isViewer) {
    return false;
  } // allow deleting document without a collection


  if (document.collection && (0, _cancan._cannot)(user, "update", document.collection)) {
    return false;
  }

  return user.teamId === document.teamId;
});
(0, _cancan.allow)(_models.User, "restore", _models.Document, (user, document) => {
  if (!document) {
    return false;
  }

  if (!document.deletedAt) {
    return false;
  }

  if (user.isViewer) {
    return false;
  }

  if (document.collection && (0, _cancan._cannot)(user, "update", document.collection)) {
    return false;
  }

  return user.teamId === document.teamId;
});
(0, _cancan.allow)(_models.User, "archive", _models.Document, (user, document) => {
  if (!document) {
    return false;
  }

  if (!document.publishedAt) {
    return false;
  }

  if (document.archivedAt) {
    return false;
  }

  if (document.deletedAt) {
    return false;
  }

  (0, _invariant.default)(document.collection, "collection is missing, did you forget to include in the query scope?");

  if ((0, _cancan._cannot)(user, "update", document.collection)) {
    return false;
  }

  return user.teamId === document.teamId;
});
(0, _cancan.allow)(_models.User, "unarchive", _models.Document, (user, document) => {
  if (!document) {
    return false;
  }

  (0, _invariant.default)(document.collection, "collection is missing, did you forget to include in the query scope?");

  if ((0, _cancan._cannot)(user, "update", document.collection)) {
    return false;
  }

  if (!document.archivedAt) {
    return false;
  }

  if (document.deletedAt) {
    return false;
  }

  return user.teamId === document.teamId;
});
(0, _cancan.allow)(_models.Document, "restore", _models.Revision, (document, revision) => document.id === (revision === null || revision === void 0 ? void 0 : revision.documentId));
(0, _cancan.allow)(_models.User, "unpublish", _models.Document, (user, document) => {
  if (!document) {
    return false;
  }

  (0, _invariant.default)(document.collection, "collection is missing, did you forget to include in the query scope?");

  if (!document.publishedAt || !!document.deletedAt || !!document.archivedAt) {
    return false;
  }

  if ((0, _cancan._cannot)(user, "update", document.collection)) {
    return false;
  }

  return user.teamId === document.teamId;
});