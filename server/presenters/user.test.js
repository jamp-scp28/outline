"use strict";

var _models = require("./../models");

var _user = _interopRequireDefault(require("./user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("presents a user", async () => {
  const user = (0, _user.default)(_models.User.build({
    id: "123",
    name: "Test User",
    username: "testuser"
  }));
  expect(user).toMatchSnapshot();
});
it("presents a user without slack data", async () => {
  const user = (0, _user.default)(_models.User.build({
    id: "123",
    name: "Test User",
    username: "testuser"
  }));
  expect(user).toMatchSnapshot();
});