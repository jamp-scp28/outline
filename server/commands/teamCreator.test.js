"use strict";

var _env = _interopRequireDefault(require("./../env"));

var _TeamDomain = _interopRequireDefault(require("./../models/TeamDomain"));

var _factories = require("./../test/factories");

var _support = require("./../test/support");

var _teamCreator = _interopRequireDefault(require("./teamCreator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

beforeEach(() => (0, _support.flushdb)());
describe("teamCreator", () => {
  it("should create team and authentication provider", async () => {
    const result = await (0, _teamCreator.default)({
      name: "Test team",
      subdomain: "example",
      avatarUrl: "http://example.com/logo.png",
      authenticationProvider: {
        name: "google",
        providerId: "example.com"
      }
    });
    const {
      team,
      authenticationProvider,
      isNewTeam
    } = result;
    expect(authenticationProvider.name).toEqual("google");
    expect(authenticationProvider.providerId).toEqual("example.com");
    expect(team.name).toEqual("Test team");
    expect(team.subdomain).toEqual("example");
    expect(isNewTeam).toEqual(true);
  });
  it("should not allow creating multiple teams in installation", async () => {
    _env.default.DEPLOYMENT = undefined;
    await (0, _factories.buildTeam)();
    let error;

    try {
      await (0, _teamCreator.default)({
        name: "Test team",
        subdomain: "example",
        avatarUrl: "http://example.com/logo.png",
        authenticationProvider: {
          name: "google",
          providerId: "example.com"
        }
      });
    } catch (err) {
      error = err;
    }

    expect(error).toBeTruthy();
  });
  it("should return existing team when within allowed domains", async () => {
    _env.default.DEPLOYMENT = undefined;
    const existing = await (0, _factories.buildTeam)();
    const user = await (0, _factories.buildUser)({
      teamId: existing.id
    });
    await _TeamDomain.default.create({
      teamId: existing.id,
      name: "allowed-domain.com",
      createdById: user.id
    });
    const result = await (0, _teamCreator.default)({
      name: "Updated name",
      subdomain: "example",
      domain: "allowed-domain.com",
      authenticationProvider: {
        name: "google",
        providerId: "allowed-domain.com"
      }
    });
    const {
      team,
      authenticationProvider,
      isNewTeam
    } = result;
    expect(team.id).toEqual(existing.id);
    expect(team.name).toEqual(existing.name);
    expect(authenticationProvider.name).toEqual("google");
    expect(authenticationProvider.providerId).toEqual("allowed-domain.com");
    expect(isNewTeam).toEqual(false);
    const providers = await team.$get("authenticationProviders");
    expect(providers.length).toEqual(2);
  });
  it("should error when NOT within allowed domains", async () => {
    const user = await (0, _factories.buildUser)();
    delete process.env.DEPLOYMENT;
    const existing = await (0, _factories.buildTeam)();
    await _TeamDomain.default.create({
      teamId: existing.id,
      name: "other-domain.com",
      createdById: user.id
    });
    let error;

    try {
      await (0, _teamCreator.default)({
        name: "Updated name",
        subdomain: "example",
        domain: "allowed-domain.com",
        authenticationProvider: {
          name: "google",
          providerId: "allowed-domain.com"
        }
      });
    } catch (err) {
      error = err;
    }

    expect(error).toBeTruthy();
  });
  it("should return exising team", async () => {
    _env.default.DEPLOYMENT = undefined;
    const authenticationProvider = {
      name: "google",
      providerId: "example.com"
    };
    const existing = await (0, _factories.buildTeam)({
      subdomain: "example",
      authenticationProviders: [authenticationProvider]
    });
    const result = await (0, _teamCreator.default)({
      name: "Updated name",
      subdomain: "example",
      authenticationProvider
    });
    const {
      team,
      isNewTeam
    } = result;
    expect(team.id).toEqual(existing.id);
    expect(team.name).toEqual(existing.name);
    expect(team.subdomain).toEqual("example");
    expect(isNewTeam).toEqual(false);
  });
});