"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assertValueInArray = exports.assertUuid = exports.assertSort = exports.assertPresent = exports.assertPositiveInteger = exports.assertNotEmpty = exports.assertIndexCharacters = exports.assertIn = exports.assertHexColor = exports.assertEmail = exports.assertArray = void 0;

var _lodash = require("lodash");

var _validator = _interopRequireDefault(require("validator"));

var _color = require("../shared/utils/color");

var _indexCharacters = require("../shared/utils/indexCharacters");

var _errors = require("./errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const assertPresent = (value, message) => {
  if (value === undefined || value === null || value === "") {
    throw (0, _errors.ParamRequiredError)(message);
  }
};

exports.assertPresent = assertPresent;

const assertArray = (value, message) => {
  if (!(0, _lodash.isArrayLike)(value)) {
    throw (0, _errors.ValidationError)(message);
  }
};

exports.assertArray = assertArray;

const assertIn = (value, options, message) => {
  if (!options.includes(value)) {
    throw (0, _errors.ValidationError)(message);
  }
};

exports.assertIn = assertIn;

const assertSort = (value, model, message = "Invalid sort parameter") => {
  if (!Object.keys(model.rawAttributes).includes(value)) {
    throw (0, _errors.ValidationError)(message);
  }
};

exports.assertSort = assertSort;

const assertNotEmpty = (value, message) => {
  assertPresent(value, message);

  if (typeof value === "string" && value.trim() === "") {
    throw (0, _errors.ValidationError)(message);
  }
};

exports.assertNotEmpty = assertNotEmpty;

const assertEmail = (value = "", message) => {
  if (!_validator.default.isEmail(value)) {
    throw (0, _errors.ValidationError)(message);
  }
};

exports.assertEmail = assertEmail;

const assertUuid = (value, message) => {
  if (typeof value !== "string") {
    throw (0, _errors.ValidationError)(message);
  }

  if (!_validator.default.isUUID(value)) {
    throw (0, _errors.ValidationError)(message);
  }
};

exports.assertUuid = assertUuid;

const assertPositiveInteger = (value, message) => {
  if (!_validator.default.isInt(String(value), {
    min: 0
  })) {
    throw (0, _errors.ValidationError)(message);
  }
};

exports.assertPositiveInteger = assertPositiveInteger;

const assertHexColor = (value, message) => {
  if (!(0, _color.validateColorHex)(value)) {
    throw (0, _errors.ValidationError)(message);
  }
};

exports.assertHexColor = assertHexColor;

const assertValueInArray = (value, values, message) => {
  if (!values.includes(value)) {
    throw (0, _errors.ValidationError)(message);
  }
};

exports.assertValueInArray = assertValueInArray;

const assertIndexCharacters = (value, message = "index must be between x20 to x7E ASCII") => {
  if (!(0, _indexCharacters.validateIndexCharacters)(value)) {
    throw (0, _errors.ValidationError)(message);
  }
};

exports.assertIndexCharacters = assertIndexCharacters;