"use strict";

var _randomstring = _interopRequireDefault(require("randomstring"));

var _ApiKey = _interopRequireDefault(require("./../models/ApiKey"));

var _factories = require("./../test/factories");

var _support = require("./../test/support");

var _authentication = _interopRequireDefault(require("./authentication"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

beforeEach(() => (0, _support.flushdb)());
describe("Authentication middleware", () => {
  describe("with JWT", () => {
    it("should authenticate with correct token", async () => {
      const state = {};
      const user = await (0, _factories.buildUser)();
      const authMiddleware = (0, _authentication.default)();
      await authMiddleware({
        // @ts-expect-error ts-migrate(2740) FIXME: Type '{ get: Mock<string, []>; }' is missing the f... Remove this comment to see the full error message
        request: {
          get: jest.fn(() => `Bearer ${user.getJwtToken()}`)
        },
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{}' is not assignable to type 'DefaultState ... Remove this comment to see the full error message
        state,
        cache: {}
      }, jest.fn()); // @ts-expect-error ts-migrate(2339) FIXME: Property 'user' does not exist on type '{}'.

      expect(state.user.id).toEqual(user.id);
    });
    it("should return error with invalid token", async () => {
      const state = {};
      const user = await (0, _factories.buildUser)();
      const authMiddleware = (0, _authentication.default)();

      try {
        await authMiddleware({
          // @ts-expect-error ts-migrate(2740) FIXME: Type '{ get: Mock<string, []>; }' is missing the f... Remove this comment to see the full error message
          request: {
            get: jest.fn(() => `Bearer ${user.getJwtToken()}error`)
          },
          // @ts-expect-error ts-migrate(2322) FIXME: Type '{}' is not assignable to type 'DefaultState ... Remove this comment to see the full error message
          state,
          cache: {}
        }, jest.fn());
      } catch (e) {
        expect(e.message).toBe("Invalid token");
      }
    });
  });
  describe("with API key", () => {
    it("should authenticate user with valid API key", async () => {
      const state = {};
      const user = await (0, _factories.buildUser)();
      const authMiddleware = (0, _authentication.default)();
      const key = await _ApiKey.default.create({
        userId: user.id
      });
      await authMiddleware({
        // @ts-expect-error ts-migrate(2740) FIXME: Type '{ get: Mock<string, []>; }' is missing the f... Remove this comment to see the full error message
        request: {
          get: jest.fn(() => `Bearer ${key.secret}`)
        },
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{}' is not assignable to type 'DefaultState ... Remove this comment to see the full error message
        state,
        cache: {}
      }, jest.fn()); // @ts-expect-error ts-migrate(2339) FIXME: Property 'user' does not exist on type '{}'.

      expect(state.user.id).toEqual(user.id);
    });
    it("should return error with invalid API key", async () => {
      const state = {};
      const authMiddleware = (0, _authentication.default)();

      try {
        await authMiddleware({
          // @ts-expect-error ts-migrate(2740) FIXME: Type '{ get: Mock<string, []>; }' is missing the f... Remove this comment to see the full error message
          request: {
            get: jest.fn(() => `Bearer ${_randomstring.default.generate(38)}`)
          },
          // @ts-expect-error ts-migrate(2322) FIXME: Type '{}' is not assignable to type 'DefaultState ... Remove this comment to see the full error message
          state,
          cache: {}
        }, jest.fn());
      } catch (e) {
        expect(e.message).toBe("Invalid API key");
      }
    });
  });
  it("should return error message if no auth token is available", async () => {
    const state = {};
    const authMiddleware = (0, _authentication.default)();

    try {
      await authMiddleware({
        // @ts-expect-error ts-migrate(2740) FIXME: Type '{ get: Mock<string, []>; }' is missing the f... Remove this comment to see the full error message
        request: {
          get: jest.fn(() => "error")
        },
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{}' is not assignable to type 'DefaultState ... Remove this comment to see the full error message
        state,
        cache: {}
      }, jest.fn());
    } catch (e) {
      expect(e.message).toBe('Bad Authorization header format. Format is "Authorization: Bearer <token>"');
    }
  });
  it("should allow passing auth token as a GET param", async () => {
    const state = {};
    const user = await (0, _factories.buildUser)();
    const authMiddleware = (0, _authentication.default)();
    await authMiddleware({
      request: {
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'Mock<null, []>' is not assignable to type '(... Remove this comment to see the full error message
        get: jest.fn(() => null),
        query: {
          token: user.getJwtToken()
        }
      },
      body: {},
      // @ts-expect-error ts-migrate(2322) FIXME: Type '{}' is not assignable to type 'DefaultState ... Remove this comment to see the full error message
      state,
      cache: {}
    }, jest.fn()); // @ts-expect-error ts-migrate(2339) FIXME: Property 'user' does not exist on type '{}'.

    expect(state.user.id).toEqual(user.id);
  });
  it("should allow passing auth token in body params", async () => {
    const state = {};
    const user = await (0, _factories.buildUser)();
    const authMiddleware = (0, _authentication.default)();
    await authMiddleware({
      request: {
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'Mock<null, []>' is not assignable to type '(... Remove this comment to see the full error message
        get: jest.fn(() => null)
      },
      body: {
        token: user.getJwtToken()
      },
      // @ts-expect-error ts-migrate(2322) FIXME: Type '{}' is not assignable to type 'DefaultState ... Remove this comment to see the full error message
      state,
      cache: {}
    }, jest.fn()); // @ts-expect-error ts-migrate(2339) FIXME: Property 'user' does not exist on type '{}'.

    expect(state.user.id).toEqual(user.id);
  });
  it("should return an error for suspended users", async () => {
    const state = {};
    const admin = await (0, _factories.buildUser)();
    const user = await (0, _factories.buildUser)({
      suspendedAt: new Date(),
      suspendedById: admin.id
    });
    const authMiddleware = (0, _authentication.default)();
    let error;

    try {
      await authMiddleware({
        // @ts-expect-error ts-migrate(2740) FIXME: Type '{ get: Mock<string, []>; }' is missing the f... Remove this comment to see the full error message
        request: {
          get: jest.fn(() => `Bearer ${user.getJwtToken()}`)
        },
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{}' is not assignable to type 'DefaultState ... Remove this comment to see the full error message
        state,
        cache: {}
      }, jest.fn());
    } catch (err) {
      error = err;
    }

    expect(error.message).toEqual("Your access has been suspended by the team admin");
    expect(error.errorData.adminEmail).toEqual(admin.email);
  });
  it("should return an error for deleted team", async () => {
    const state = {};
    const team = await (0, _factories.buildTeam)();
    const user = await (0, _factories.buildUser)({
      teamId: team.id
    });
    await team.destroy();
    const authMiddleware = (0, _authentication.default)();
    let error;

    try {
      await authMiddleware({
        // @ts-expect-error ts-migrate(2740) FIXME: Type '{ get: Mock<string, []>; }' is missing the f... Remove this comment to see the full error message
        request: {
          get: jest.fn(() => `Bearer ${user.getJwtToken()}`)
        },
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{}' is not assignable to type 'DefaultState ... Remove this comment to see the full error message
        state,
        cache: {}
      }, jest.fn());
    } catch (err) {
      error = err;
    }

    expect(error.message).toEqual("Invalid token");
  });
});