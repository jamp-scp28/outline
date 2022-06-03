"use strict";

var _env = _interopRequireDefault(require("../env"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// test environment variables
_env.default.SMTP_HOST = "smtp.example.com";
_env.default.ENVIRONMENT = "test";
_env.default.GOOGLE_CLIENT_ID = "123";
_env.default.GOOGLE_CLIENT_SECRET = "123";
_env.default.SLACK_CLIENT_ID = "123";
_env.default.SLACK_CLIENT_SECRET = "123";
_env.default.DEPLOYMENT = undefined;

if (process.env.DATABASE_URL_TEST) {
  _env.default.DATABASE_URL = process.env.DATABASE_URL_TEST;
} // NOTE: this require must come after the ENV var override above
// so that sequelize uses the test config variables


require("./../database/sequelize"); // This is needed for the relative manual mock to be picked up


jest.mock("../queues"); // We never want to make real S3 requests in test environment

jest.mock("aws-sdk", () => {
  const mS3 = {
    createPresignedPost: jest.fn(),
    putObject: jest.fn().mockReturnThis(),
    deleteObject: jest.fn().mockReturnThis(),
    promise: jest.fn()
  };
  return {
    S3: jest.fn(() => mS3),
    Endpoint: jest.fn()
  };
});