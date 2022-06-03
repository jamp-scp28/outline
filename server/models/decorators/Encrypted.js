"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Encrypted;
exports.getEncryptedColumn = getEncryptedColumn;
exports.setEncryptedColumn = setEncryptedColumn;

var _vaults = _interopRequireDefault(require("./../../database/vaults"));

var _Logger = _interopRequireDefault(require("./../../logging/Logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const key = "sequelize:vault";
/**
 * A decorator that stores the encrypted vault for a particular database column
 * so that it can be used by getters and setters. Must be accompanied by a
 * @Column(DataType.BLOB) annotation.
 */

function Encrypted(target, propertyKey) {
  Reflect.defineMetadata(key, (0, _vaults.default)().vault(propertyKey), target, propertyKey);
}
/**
 * Get the value of an encrypted column given the target and the property key.
 */


function getEncryptedColumn(target, propertyKey) {
  try {
    return Reflect.getMetadata(key, target, propertyKey).get.call(target);
  } catch (err) {
    if (err.message.includes("bad decrypt")) {
      _Logger.default.error(`Failed to decrypt database column (${propertyKey}). The SECRET_KEY environment variable may have changed since installation.`, err);

      process.exit(1);
    }

    throw err;
  }
}
/**
 * Set the value of an encrypted column given the target and the property key.
 */


function setEncryptedColumn(target, propertyKey, value) {
  Reflect.getMetadata(key, target, propertyKey).set.call(target, value);
}