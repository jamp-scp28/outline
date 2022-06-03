"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sequelize = void 0;

var _sequelizeTypescript = require("sequelize-typescript");

var _env = _interopRequireDefault(require("./../env"));

var _Logger = _interopRequireDefault(require("../logging/Logger"));

var models = _interopRequireWildcard(require("../models"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isProduction = _env.default.ENVIRONMENT === "production";
const isSSLDisabled = _env.default.PGSSLMODE === "disable";
const poolMax = _env.default.DATABASE_CONNECTION_POOL_MAX ?? 5;
const poolMin = _env.default.DATABASE_CONNECTION_POOL_MIN ?? 0;
const sequelize = new _sequelizeTypescript.Sequelize(_env.default.DATABASE_URL ?? _env.default.DATABASE_CONNECTION_POOL_URL ?? "", {
  logging: msg => _Logger.default.debug("database", msg),
  typeValidation: true,
  dialectOptions: {
    ssl: isProduction && !isSSLDisabled ? {
      // Ref.: https://github.com/brianc/node-postgres/issues/2009
      rejectUnauthorized: false
    } : false
  },
  models: Object.values(models),
  pool: {
    max: poolMax,
    min: poolMin,
    acquire: 30000,
    idle: 10000
  }
});
exports.sequelize = sequelize;