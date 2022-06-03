"use strict";

var _invariant = _interopRequireDefault(require("invariant"));

var _lodash = require("lodash");

var _models = require("./../models");

var _errors = require("../errors");

var _cancan = require("./cancan");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _cancan.allow)(_models.User, "createCollection", _models.Team, (user, team) => {
  if (!team || user.isViewer || user.teamId !== team.id) {
    return false;
  }

  if (user.isAdmin || team.memberCollectionCreate) {
    return true;
  }

  return false;
});
(0, _cancan.allow)(_models.User, "importCollection", _models.Team, (actor, team) => {
  if (!team || actor.teamId !== team.id) {
    return false;
  }

  if (actor.isAdmin) {
    return true;
  }

  throw (0, _errors.AdminRequiredError)();
});
(0, _cancan.allow)(_models.User, "move", _models.Collection, (user, collection) => {
  if (!collection || user.teamId !== collection.teamId) {
    return false;
  }

  if (collection.deletedAt) {
    return false;
  }

  if (user.isAdmin) {
    return true;
  }

  throw (0, _errors.AdminRequiredError)();
});
(0, _cancan.allow)(_models.User, ["read", "star", "unstar"], _models.Collection, (user, collection) => {
  if (!collection || user.teamId !== collection.teamId) {
    return false;
  }

  if (user.isAdmin) {
    return true;
  }

  if (!collection.permission) {
    (0, _invariant.default)(collection.memberships, "membership should be preloaded, did you forget withMembership scope?");
    const allMemberships = [...collection.memberships, ...collection.collectionGroupMemberships];
    return (0, _lodash.some)(allMemberships, m => ["read", "read_write", "maintainer"].includes(m.permission));
  }

  return true;
});
(0, _cancan.allow)(_models.User, "share", _models.Collection, (user, collection) => {
  if (user.isViewer) {
    return false;
  }

  if (!collection || user.teamId !== collection.teamId) {
    return false;
  }

  if (!collection.sharing) {
    return false;
  }

  if (user.isAdmin) {
    return true;
  }

  if (collection.permission !== "read_write") {
    (0, _invariant.default)(collection.memberships, "membership should be preloaded, did you forget withMembership scope?");
    const allMemberships = [...collection.memberships, ...collection.collectionGroupMemberships];
    return (0, _lodash.some)(allMemberships, m => ["read_write", "maintainer"].includes(m.permission));
  }

  return true;
});
(0, _cancan.allow)(_models.User, ["publish", "update"], _models.Collection, (user, collection) => {
  if (user.isViewer) {
    return false;
  }

  if (!collection || user.teamId !== collection.teamId) {
    return false;
  }

  if (user.isAdmin) {
    return true;
  }

  if (collection.permission !== "read_write") {
    (0, _invariant.default)(collection.memberships, "membership should be preloaded, did you forget withMembership scope?");
    const allMemberships = [...collection.memberships, ...collection.collectionGroupMemberships];
    return (0, _lodash.some)(allMemberships, m => ["read_write", "maintainer"].includes(m.permission));
  }

  return true;
});
(0, _cancan.allow)(_models.User, "delete", _models.Collection, (user, collection) => {
  if (user.isViewer) {
    return false;
  }

  if (!collection || user.teamId !== collection.teamId) {
    return false;
  }

  if (user.isAdmin) {
    return true;
  }

  if (collection.permission !== "read_write") {
    (0, _invariant.default)(collection.memberships, "membership should be preloaded, did you forget withMembership scope?");
    const allMemberships = [...collection.memberships, ...collection.collectionGroupMemberships];
    return (0, _lodash.some)(allMemberships, m => ["read_write", "maintainer"].includes(m.permission));
  }

  if (user.id === collection.createdById) {
    return true;
  }

  throw (0, _errors.AdminRequiredError)();
});