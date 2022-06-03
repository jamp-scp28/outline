"use strict";

var _models = require("./../models");

var _factories = require("./../test/factories");

var _support = require("./../test/support");

var _userCreator = _interopRequireDefault(require("./userCreator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

beforeEach(() => (0, _support.flushdb)());
describe("userCreator", () => {
  const ip = "127.0.0.1";
  it("should update exising user and authentication", async () => {
    const existing = await (0, _factories.buildUser)();
    const authentications = await existing.$get("authentications");
    const existingAuth = authentications[0];
    const newEmail = "test@example.com";
    const newUsername = "tname";
    const result = await (0, _userCreator.default)({
      name: existing.name,
      email: newEmail,
      username: newUsername,
      avatarUrl: existing.avatarUrl,
      teamId: existing.teamId,
      ip,
      authentication: {
        authenticationProviderId: existingAuth.authenticationProviderId,
        providerId: existingAuth.providerId,
        accessToken: "123",
        scopes: ["read"]
      }
    });
    const {
      user,
      authentication,
      isNewUser
    } = result;
    expect(authentication.accessToken).toEqual("123");
    expect(authentication.scopes.length).toEqual(1);
    expect(authentication.scopes[0]).toEqual("read");
    expect(user.email).toEqual(newEmail);
    expect(user.username).toEqual(newUsername);
    expect(isNewUser).toEqual(false);
  });
  it("should create user with deleted user matching providerId", async () => {
    const existing = await (0, _factories.buildUser)();
    const authentications = await existing.$get("authentications");
    const existingAuth = authentications[0];
    const newEmail = "test@example.com";
    await existing.destroy();
    const result = await (0, _userCreator.default)({
      name: "Test Name",
      email: "test@example.com",
      teamId: existing.teamId,
      ip,
      authentication: {
        authenticationProviderId: existingAuth.authenticationProviderId,
        providerId: existingAuth.providerId,
        accessToken: "123",
        scopes: ["read"]
      }
    });
    const {
      user,
      authentication,
      isNewUser
    } = result;
    expect(authentication.accessToken).toEqual("123");
    expect(authentication.scopes.length).toEqual(1);
    expect(authentication.scopes[0]).toEqual("read");
    expect(user.email).toEqual(newEmail);
    expect(isNewUser).toEqual(true);
  });
  it("should handle duplicate providerId for different iDP", async () => {
    const existing = await (0, _factories.buildUser)();
    const authentications = await existing.$get("authentications");
    const existingAuth = authentications[0];
    let error;

    try {
      await (0, _userCreator.default)({
        name: "Test Name",
        email: "test@example.com",
        teamId: existing.teamId,
        ip,
        authentication: {
          authenticationProviderId: "example.org",
          providerId: existingAuth.providerId,
          accessToken: "123",
          scopes: ["read"]
        }
      });
    } catch (err) {
      error = err;
    }

    expect(error && error.toString()).toContain("already exists for");
  });
  it("should create a new user", async () => {
    const team = await (0, _factories.buildTeam)();
    const authenticationProviders = await team.$get("authenticationProviders");
    const authenticationProvider = authenticationProviders[0];
    const result = await (0, _userCreator.default)({
      name: "Test Name",
      email: "test@example.com",
      username: "tname",
      teamId: team.id,
      ip,
      authentication: {
        authenticationProviderId: authenticationProvider.id,
        providerId: "fake-service-id",
        accessToken: "123",
        scopes: ["read"]
      }
    });
    const {
      user,
      authentication,
      isNewUser
    } = result;
    expect(authentication.accessToken).toEqual("123");
    expect(authentication.scopes.length).toEqual(1);
    expect(authentication.scopes[0]).toEqual("read");
    expect(user.email).toEqual("test@example.com");
    expect(user.username).toEqual("tname");
    expect(user.isAdmin).toEqual(false);
    expect(user.isViewer).toEqual(false);
    expect(isNewUser).toEqual(true);
  });
  it("should prefer isAdmin argument over defaultUserRole", async () => {
    const team = await (0, _factories.buildTeam)({
      defaultUserRole: "viewer"
    });
    const authenticationProviders = await team.$get("authenticationProviders");
    const authenticationProvider = authenticationProviders[0];
    const result = await (0, _userCreator.default)({
      name: "Test Name",
      email: "test@example.com",
      username: "tname",
      teamId: team.id,
      isAdmin: true,
      ip,
      authentication: {
        authenticationProviderId: authenticationProvider.id,
        providerId: "fake-service-id",
        accessToken: "123",
        scopes: ["read"]
      }
    });
    const {
      user
    } = result;
    expect(user.isAdmin).toEqual(true);
  });
  it("should prefer defaultUserRole when isAdmin is undefined or false", async () => {
    const team = await (0, _factories.buildTeam)({
      defaultUserRole: "viewer"
    });
    const authenticationProviders = await team.$get("authenticationProviders");
    const authenticationProvider = authenticationProviders[0];
    const result = await (0, _userCreator.default)({
      name: "Test Name",
      email: "test@example.com",
      username: "tname",
      teamId: team.id,
      ip,
      authentication: {
        authenticationProviderId: authenticationProvider.id,
        providerId: "fake-service-id",
        accessToken: "123",
        scopes: ["read"]
      }
    });
    const {
      user: tname
    } = result;
    expect(tname.username).toEqual("tname");
    expect(tname.isAdmin).toEqual(false);
    expect(tname.isViewer).toEqual(true);
    const tname2Result = await (0, _userCreator.default)({
      name: "Test2 Name",
      email: "tes2@example.com",
      username: "tname2",
      teamId: team.id,
      isAdmin: false,
      ip,
      authentication: {
        authenticationProviderId: authenticationProvider.id,
        providerId: "fake-service-id",
        accessToken: "123",
        scopes: ["read"]
      }
    });
    const {
      user: tname2
    } = tname2Result;
    expect(tname2.username).toEqual("tname2");
    expect(tname2.isAdmin).toEqual(false);
    expect(tname2.isViewer).toEqual(true);
  });
  it("should create a user from an invited user", async () => {
    const team = await (0, _factories.buildTeam)({
      inviteRequired: true
    });
    const invite = await (0, _factories.buildInvite)({
      teamId: team.id,
      email: "invite@example.com"
    });
    const authenticationProviders = await team.$get("authenticationProviders");
    const authenticationProvider = authenticationProviders[0];
    const result = await (0, _userCreator.default)({
      name: invite.name,
      email: "invite@ExamPle.com",
      teamId: invite.teamId,
      ip,
      authentication: {
        authenticationProviderId: authenticationProvider.id,
        providerId: "fake-service-id",
        accessToken: "123",
        scopes: ["read"]
      }
    });
    const {
      user,
      authentication,
      isNewUser
    } = result;
    expect(authentication.accessToken).toEqual("123");
    expect(authentication.scopes.length).toEqual(1);
    expect(authentication.scopes[0]).toEqual("read");
    expect(user.email).toEqual(invite.email);
    expect(isNewUser).toEqual(true);
  });
  it("should reject an uninvited user when invites are required", async () => {
    const team = await (0, _factories.buildTeam)({
      inviteRequired: true
    });
    const authenticationProviders = await team.$get("authenticationProviders");
    const authenticationProvider = authenticationProviders[0];
    let error;

    try {
      await (0, _userCreator.default)({
        name: "Uninvited User",
        email: "invite@ExamPle.com",
        teamId: team.id,
        ip,
        authentication: {
          authenticationProviderId: authenticationProvider.id,
          providerId: "fake-service-id",
          accessToken: "123",
          scopes: ["read"]
        }
      });
    } catch (err) {
      error = err;
    }

    expect(error && error.toString()).toContain("You need an invite to join this team");
  });
  it("should create a user from allowed Domain", async () => {
    const {
      admin,
      team
    } = await (0, _support.seed)();
    await _models.TeamDomain.create({
      teamId: team.id,
      name: "example.com",
      createdById: admin.id
    });
    const authenticationProviders = await team.$get("authenticationProviders");
    const authenticationProvider = authenticationProviders[0];
    const result = await (0, _userCreator.default)({
      name: "Test Name",
      email: "user@example.com",
      teamId: team.id,
      ip,
      authentication: {
        authenticationProviderId: authenticationProvider.id,
        providerId: "fake-service-id",
        accessToken: "123",
        scopes: ["read"]
      }
    });
    const {
      user,
      authentication,
      isNewUser
    } = result;
    expect(authentication.accessToken).toEqual("123");
    expect(authentication.scopes.length).toEqual(1);
    expect(authentication.scopes[0]).toEqual("read");
    expect(user.email).toEqual("user@example.com");
    expect(isNewUser).toEqual(true);
  });
  it("should reject an user when the domain is not allowed", async () => {
    const {
      admin,
      team
    } = await (0, _support.seed)();
    await _models.TeamDomain.create({
      teamId: team.id,
      name: "other.com",
      createdById: admin.id
    });
    const authenticationProviders = await team.$get("authenticationProviders");
    const authenticationProvider = authenticationProviders[0];
    let error;

    try {
      await (0, _userCreator.default)({
        name: "Bad Domain User",
        email: "user@example.com",
        teamId: team.id,
        ip,
        authentication: {
          authenticationProviderId: authenticationProvider.id,
          providerId: "fake-service-id",
          accessToken: "123",
          scopes: ["read"]
        }
      });
    } catch (err) {
      error = err;
    }

    expect(error && error.toString()).toContain("The domain is not allowed for this team");
  });
});