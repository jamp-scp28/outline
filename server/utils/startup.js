"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkEnv = checkEnv;
exports.checkMigrations = checkMigrations;

var _chalk = _interopRequireDefault(require("chalk"));

var _env = _interopRequireDefault(require("./../env"));

var _Logger = _interopRequireDefault(require("./../logging/Logger"));

var _AuthenticationProvider = _interopRequireDefault(require("./../models/AuthenticationProvider"));

var _Team = _interopRequireDefault(require("./../models/Team"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function checkMigrations() {
  if (_env.default.DEPLOYMENT === "hosted") {
    return;
  }

  const teams = await _Team.default.count();
  const providers = await _AuthenticationProvider.default.count();

  if (teams && !providers) {
    _Logger.default.warn(`
This version of Outline cannot start until a data migration is complete.
Backup your database, run the database migrations and the following script:

$ node ./build/server/scripts/20210226232041-migrate-authentication.js
`);

    process.exit(1);
  }
}

async function checkEnv() {
  await _env.default.validate().then(errors => {
    if (errors.length > 0) {
      _Logger.default.warn("Environment configuration is invalid, please check the following:\n\n");

      for (const error of errors) {
        _Logger.default.warn("- " + Object.values(error.constraints ?? {}).join(", "));
      }

      process.exit(1);
    }
  });

  if (_env.default.ENVIRONMENT === "production") {
    _Logger.default.info("lifecycle", _chalk.default.green(`
Is your team enjoying Outline? Consider supporting future development by sponsoring the project:\n\nhttps://github.com/sponsors/outline
`));
  } else if (_env.default.ENVIRONMENT === "development") {
    _Logger.default.warn(`Running Outline in ${_chalk.default.bold("development mode")}. To run Outline in production mode set the ${_chalk.default.bold("NODE_ENV")} env variable to "production"`);
  }
}