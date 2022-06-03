"use strict";

var _WelcomeEmail = _interopRequireDefault(require("./../emails/templates/WelcomeEmail"));

var _models = require("./../models");

var _Collection = _interopRequireDefault(require("./../models/Collection"));

var _UserAuthentication = _interopRequireDefault(require("./../models/UserAuthentication"));

var _factories = require("./../test/factories");

var _support = require("./../test/support");

var _accountProvisioner = _interopRequireDefault(require("./accountProvisioner"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

beforeEach(() => {
  return (0, _support.flushdb)();
});
describe("accountProvisioner", () => {
  const ip = "127.0.0.1";
  it("should create a new user and team", async () => {
    const spy = jest.spyOn(_WelcomeEmail.default, "schedule");
    const {
      user,
      team,
      isNewTeam,
      isNewUser
    } = await (0, _accountProvisioner.default)({
      ip,
      user: {
        name: "Jenny Tester",
        email: "jenny@example.com",
        avatarUrl: "https://example.com/avatar.png",
        username: "jtester"
      },
      team: {
        name: "New team",
        avatarUrl: "https://example.com/avatar.png",
        subdomain: "example"
      },
      authenticationProvider: {
        name: "google",
        providerId: "example.com"
      },
      authentication: {
        providerId: "123456789",
        accessToken: "123",
        scopes: ["read"]
      }
    });
    const authentications = await user.$get("authentications");
    const auth = authentications[0];
    expect(auth.accessToken).toEqual("123");
    expect(auth.scopes.length).toEqual(1);
    expect(auth.scopes[0]).toEqual("read");
    expect(team.name).toEqual("New team");
    expect(user.email).toEqual("jenny@example.com");
    expect(user.username).toEqual("jtester");
    expect(isNewUser).toEqual(true);
    expect(isNewTeam).toEqual(true);
    expect(spy).toHaveBeenCalled();
    const collectionCount = await _Collection.default.count();
    expect(collectionCount).toEqual(1);
    spy.mockRestore();
  });
  it("should update exising user and authentication", async () => {
    const spy = jest.spyOn(_WelcomeEmail.default, "schedule");
    const existingTeam = await (0, _factories.buildTeam)();
    const providers = await existingTeam.$get("authenticationProviders");
    const authenticationProvider = providers[0];
    const existing = await (0, _factories.buildUser)({
      teamId: existingTeam.id
    });
    const authentications = await existing.$get("authentications");
    const authentication = authentications[0];
    const newEmail = "test@example.com";
    const newUsername = "tname";
    const {
      user,
      isNewUser,
      isNewTeam
    } = await (0, _accountProvisioner.default)({
      ip,
      user: {
        name: existing.name,
        email: newEmail,
        avatarUrl: existing.avatarUrl,
        username: newUsername
      },
      team: {
        name: existingTeam.name,
        avatarUrl: existingTeam.avatarUrl,
        subdomain: "example"
      },
      authenticationProvider: {
        name: authenticationProvider.name,
        providerId: authenticationProvider.providerId
      },
      authentication: {
        providerId: authentication.providerId,
        accessToken: "123",
        scopes: ["read"]
      }
    });
    const auth = await _UserAuthentication.default.findByPk(authentication.id);
    expect(auth === null || auth === void 0 ? void 0 : auth.accessToken).toEqual("123");
    expect(auth === null || auth === void 0 ? void 0 : auth.scopes.length).toEqual(1);
    expect(auth === null || auth === void 0 ? void 0 : auth.scopes[0]).toEqual("read");
    expect(user.email).toEqual(newEmail);
    expect(user.username).toEqual(newUsername);
    expect(isNewTeam).toEqual(false);
    expect(isNewUser).toEqual(false);
    expect(spy).not.toHaveBeenCalled();
    const collectionCount = await _Collection.default.count();
    expect(collectionCount).toEqual(0);
    spy.mockRestore();
  });
  it("should throw an error when authentication provider is disabled", async () => {
    const existingTeam = await (0, _factories.buildTeam)();
    const providers = await existingTeam.$get("authenticationProviders");
    const authenticationProvider = providers[0];
    await authenticationProvider.update({
      enabled: false
    });
    const existing = await (0, _factories.buildUser)({
      teamId: existingTeam.id
    });
    const authentications = await existing.$get("authentications");
    const authentication = authentications[0];
    let error;

    try {
      await (0, _accountProvisioner.default)({
        ip,
        user: {
          name: existing.name,
          email: existing.email,
          avatarUrl: existing.avatarUrl
        },
        team: {
          name: existingTeam.name,
          avatarUrl: existingTeam.avatarUrl,
          subdomain: "example"
        },
        authenticationProvider: {
          name: authenticationProvider.name,
          providerId: authenticationProvider.providerId
        },
        authentication: {
          providerId: authentication.providerId,
          accessToken: "123",
          scopes: ["read"]
        }
      });
    } catch (err) {
      error = err;
    }

    expect(error).toBeTruthy();
  });
  it("should throw an error when the domain is not allowed", async () => {
    const {
      admin,
      team: existingTeam
    } = await (0, _support.seed)();
    const providers = await existingTeam.$get("authenticationProviders");
    const authenticationProvider = providers[0];
    await _models.TeamDomain.create({
      teamId: existingTeam.id,
      name: "other.com",
      createdById: admin.id
    });
    let error;

    try {
      await (0, _accountProvisioner.default)({
        ip,
        user: {
          name: "Jenny Tester",
          email: "jenny@example.com",
          avatarUrl: "https://example.com/avatar.png",
          username: "jtester"
        },
        team: {
          name: existingTeam.name,
          avatarUrl: existingTeam.avatarUrl,
          subdomain: "example"
        },
        authenticationProvider: {
          name: authenticationProvider.name,
          providerId: authenticationProvider.providerId
        },
        authentication: {
          providerId: "123456789",
          accessToken: "123",
          scopes: ["read"]
        }
      });
    } catch (err) {
      error = err;
    }

    expect(error).toBeTruthy();
  });
  it("should create a new user in an existing team when the domain is allowed", async () => {
    const spy = jest.spyOn(_WelcomeEmail.default, "schedule");
    const {
      admin,
      team
    } = await (0, _support.seed)();
    const authenticationProviders = await team.$get("authenticationProviders");
    const authenticationProvider = authenticationProviders[0];
    await _models.TeamDomain.create({
      teamId: team.id,
      name: "example.com",
      createdById: admin.id
    });
    const {
      user,
      isNewUser
    } = await (0, _accountProvisioner.default)({
      ip,
      user: {
        name: "Jenny Tester",
        email: "jenny@example.com",
        avatarUrl: "https://example.com/avatar.png",
        username: "jtester"
      },
      team: {
        name: team.name,
        avatarUrl: team.avatarUrl,
        subdomain: "example"
      },
      authenticationProvider: {
        name: authenticationProvider.name,
        providerId: authenticationProvider.providerId
      },
      authentication: {
        providerId: "123456789",
        accessToken: "123",
        scopes: ["read"]
      }
    });
    const authentications = await user.$get("authentications");
    const auth = authentications[0];
    expect(auth.accessToken).toEqual("123");
    expect(auth.scopes.length).toEqual(1);
    expect(auth.scopes[0]).toEqual("read");
    expect(user.email).toEqual("jenny@example.com");
    expect(user.username).toEqual("jtester");
    expect(isNewUser).toEqual(true);
    expect(spy).toHaveBeenCalled(); // should provision welcome collection

    const collectionCount = await _Collection.default.count();
    expect(collectionCount).toEqual(1);
    spy.mockRestore();
  });
  it("should create a new user in an existing team", async () => {
    const spy = jest.spyOn(_WelcomeEmail.default, "schedule");
    const team = await (0, _factories.buildTeam)();
    const authenticationProviders = await team.$get("authenticationProviders");
    const authenticationProvider = authenticationProviders[0];
    const {
      user,
      isNewUser
    } = await (0, _accountProvisioner.default)({
      ip,
      user: {
        name: "Jenny Tester",
        email: "jenny@example.com",
        avatarUrl: "https://example.com/avatar.png",
        username: "jtester"
      },
      team: {
        name: team.name,
        avatarUrl: team.avatarUrl,
        subdomain: "example"
      },
      authenticationProvider: {
        name: authenticationProvider.name,
        providerId: authenticationProvider.providerId
      },
      authentication: {
        providerId: "123456789",
        accessToken: "123",
        scopes: ["read"]
      }
    });
    const authentications = await user.$get("authentications");
    const auth = authentications[0];
    expect(auth.accessToken).toEqual("123");
    expect(auth.scopes.length).toEqual(1);
    expect(auth.scopes[0]).toEqual("read");
    expect(user.email).toEqual("jenny@example.com");
    expect(user.username).toEqual("jtester");
    expect(isNewUser).toEqual(true);
    expect(spy).toHaveBeenCalled(); // should provision welcome collection

    const collectionCount = await _Collection.default.count();
    expect(collectionCount).toEqual(1);
    spy.mockRestore();
  });
});