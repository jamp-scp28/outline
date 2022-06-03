"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserForEmailSigninToken = getUserForEmailSigninToken;
exports.getUserForJWT = getUserForJWT;

var _dateFns = require("date-fns");

var _invariant = _interopRequireDefault(require("invariant"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _models = require("./../models");

var _errors = require("../errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getJWTPayload(token) {
  let payload;

  try {
    payload = _jsonwebtoken.default.decode(token);

    if (!payload) {
      throw (0, _errors.AuthenticationError)("Invalid token");
    }

    return payload;
  } catch (err) {
    throw (0, _errors.AuthenticationError)("Unable to decode JWT token");
  }
}

async function getUserForJWT(token) {
  const payload = getJWTPayload(token);

  if (payload.type === "email-signin") {
    throw (0, _errors.AuthenticationError)("Invalid token");
  } // check the token is within it's expiration time


  if (payload.expiresAt) {
    if (new Date(payload.expiresAt) < new Date()) {
      throw (0, _errors.AuthenticationError)("Expired token");
    }
  }

  const user = await _models.User.findByPk(payload.id, {
    include: [{
      model: _models.Team,
      as: "team",
      required: true
    }]
  });

  if (!user) {
    throw (0, _errors.AuthenticationError)("Invalid token");
  }

  if (payload.type === "transfer") {
    // If the user has made a single API request since the transfer token was
    // created then it's no longer valid, they'll need to sign in again.
    if (user.lastActiveAt && payload.createdAt && user.lastActiveAt > new Date(payload.createdAt)) {
      throw (0, _errors.AuthenticationError)("Token has already been used");
    }
  }

  try {
    _jsonwebtoken.default.verify(token, user.jwtSecret);
  } catch (err) {
    throw (0, _errors.AuthenticationError)("Invalid token");
  }

  return user;
}

async function getUserForEmailSigninToken(token) {
  const payload = getJWTPayload(token);

  if (payload.type !== "email-signin") {
    throw (0, _errors.AuthenticationError)("Invalid token");
  } // check the token is within it's expiration time


  if (payload.createdAt) {
    if (new Date(payload.createdAt) < (0, _dateFns.subMinutes)(new Date(), 10)) {
      throw (0, _errors.AuthenticationError)("Expired token");
    }
  }

  const user = await _models.User.findByPk(payload.id, {
    include: [{
      model: _models.Team,
      required: true
    }]
  });
  (0, _invariant.default)(user, "User not found");

  try {
    _jsonwebtoken.default.verify(token, user.jwtSecret);
  } catch (err) {
    throw (0, _errors.AuthenticationError)("Invalid token");
  }

  return user;
}