"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cannot = exports.can = exports.authorize = exports.abilities = void 0;
exports.serialize = serialize;

var _cancan = require("./cancan");

require("./apiKey");

require("./attachment");

require("./authenticationProvider");

require("./collection");

require("./document");

require("./integration");

require("./notificationSetting");

require("./pins");

require("./searchQuery");

require("./share");

require("./star");

require("./user");

require("./team");

require("./group");

// this should not be needed but is a workaround for this TypeScript issue:
// https://github.com/microsoft/TypeScript/issues/36931
const authorize = _cancan._authorize;
exports.authorize = authorize;
const can = _cancan._can;
exports.can = can;
const cannot = _cancan._cannot;
exports.cannot = cannot;
const abilities = _cancan._abilities;
/*
 * Given a user and a model – output an object which describes the actions the
 * user may take against the model. This serialized policy is used for testing
 * and sent in API responses to allow clients to adjust which UI is displayed.
 */

exports.abilities = abilities;

function serialize(model, target) {
  const output = {};
  abilities.forEach(ability => {
    if (model instanceof ability.model && target instanceof ability.target) {
      let response = true;

      try {
        response = can(model, ability.action, target);
      } catch (err) {
        response = false;
      }

      output[ability.action] = response;
    }
  });
  return output;
}