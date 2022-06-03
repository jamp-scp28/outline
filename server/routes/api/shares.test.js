"use strict";

var _fetchTestServer = _interopRequireDefault(require("fetch-test-server"));

var _models = require("./../../models");

var _web = _interopRequireDefault(require("./../../services/web"));

var _factories = require("./../../test/factories");

var _support = require("./../../test/support");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _web.default)();
const server = new _fetchTestServer.default(app.callback());
beforeEach(() => (0, _support.flushdb)());
afterAll(() => server.close());
describe("#shares.list", () => {
  it("should only return shares created by user", async () => {
    const {
      user,
      admin,
      document
    } = await (0, _support.seed)();
    await (0, _factories.buildShare)({
      documentId: document.id,
      teamId: user.teamId,
      userId: admin.id
    });
    const share = await (0, _factories.buildShare)({
      documentId: document.id,
      teamId: user.teamId,
      userId: user.id
    });
    const res = await server.post("/api/shares.list", {
      body: {
        token: user.getJwtToken()
      }
    });
    const body = await res.json();
    expect(res.status).toEqual(200);
    expect(body.data.length).toEqual(1);
    expect(body.data[0].id).toEqual(share.id);
    expect(body.data[0].documentTitle).toBe(document.title);
  });
  it("should not return revoked shares", async () => {
    const {
      user,
      document
    } = await (0, _support.seed)();
    const share = await (0, _factories.buildShare)({
      documentId: document.id,
      teamId: user.teamId,
      userId: user.id
    });
    await share.revoke(user.id);
    const res = await server.post("/api/shares.list", {
      body: {
        token: user.getJwtToken()
      }
    });
    const body = await res.json();
    expect(res.status).toEqual(200);
    expect(body.data.length).toEqual(0);
  });
  it("should not return unpublished shares", async () => {
    const {
      user,
      document
    } = await (0, _support.seed)();
    await (0, _factories.buildShare)({
      published: false,
      documentId: document.id,
      teamId: user.teamId,
      userId: user.id
    });
    const res = await server.post("/api/shares.list", {
      body: {
        token: user.getJwtToken()
      }
    });
    const body = await res.json();
    expect(res.status).toEqual(200);
    expect(body.data.length).toEqual(0);
  });
  it("should not return shares to deleted documents", async () => {
    const {
      user,
      document
    } = await (0, _support.seed)();
    await (0, _factories.buildShare)({
      documentId: document.id,
      teamId: user.teamId,
      userId: user.id
    });
    await document.delete(user.id);
    const res = await server.post("/api/shares.list", {
      body: {
        token: user.getJwtToken()
      }
    });
    const body = await res.json();
    expect(res.status).toEqual(200);
    expect(body.data.length).toEqual(0);
  });
  it("admins should return shares created by all users", async () => {
    const {
      user,
      admin,
      document
    } = await (0, _support.seed)();
    const share = await (0, _factories.buildShare)({
      documentId: document.id,
      teamId: admin.teamId,
      userId: user.id
    });
    const res = await server.post("/api/shares.list", {
      body: {
        token: admin.getJwtToken()
      }
    });
    const body = await res.json();
    expect(res.status).toEqual(200);
    expect(body.data.length).toEqual(1);
    expect(body.data[0].id).toEqual(share.id);
    expect(body.data[0].documentTitle).toBe(document.title);
  });
  it("admins should not return shares in collection not a member of", async () => {
    const {
      admin,
      document,
      collection
    } = await (0, _support.seed)();
    await (0, _factories.buildShare)({
      documentId: document.id,
      teamId: admin.teamId,
      userId: admin.id
    });
    collection.permission = null;
    await collection.save();
    const res = await server.post("/api/shares.list", {
      body: {
        token: admin.getJwtToken()
      }
    });
    const body = await res.json();
    expect(res.status).toEqual(200);
    expect(body.data.length).toEqual(0);
  });
  it("should require authentication", async () => {
    const res = await server.post("/api/shares.list");
    const body = await res.json();
    expect(res.status).toEqual(401);
    expect(body).toMatchSnapshot();
  });
});
describe("#shares.create", () => {
  it("should allow creating a share record for document", async () => {
    const {
      user,
      document
    } = await (0, _support.seed)();
    const res = await server.post("/api/shares.create", {
      body: {
        token: user.getJwtToken(),
        documentId: document.id
      }
    });
    const body = await res.json();
    expect(res.status).toEqual(200);
    expect(body.data.published).toBe(false);
    expect(body.data.documentTitle).toBe(document.title);
  });
  it("should allow creating a share record with read-only permissions but no publishing", async () => {
    const {
      user,
      document,
      collection
    } = await (0, _support.seed)();
    collection.permission = null;
    await collection.save();
    await _models.CollectionUser.create({
      createdById: user.id,
      collectionId: collection.id,
      userId: user.id,
      permission: "read"
    });
    const res = await server.post("/api/shares.create", {
      body: {
        token: user.getJwtToken(),
        documentId: document.id
      }
    });
    const body = await res.json();
    expect(res.status).toEqual(200);
    const response = await server.post("/api/shares.update", {
      body: {
        token: user.getJwtToken(),
        id: body.data.id,
        published: true
      }
    });
    expect(response.status).toEqual(403);
  });
  it("should allow creating a share record if link previously revoked", async () => {
    const {
      user,
      document
    } = await (0, _support.seed)();
    const share = await (0, _factories.buildShare)({
      documentId: document.id,
      teamId: user.teamId,
      userId: user.id
    });
    await share.revoke(user.id);
    const res = await server.post("/api/shares.create", {
      body: {
        token: user.getJwtToken(),
        documentId: document.id
      }
    });
    const body = await res.json();
    expect(res.status).toEqual(200);
    expect(body.data.id).not.toEqual(share.id);
    expect(body.data.documentTitle).toBe(document.title);
  });
  it("should return existing share link for document and user", async () => {
    const {
      user,
      document
    } = await (0, _support.seed)();
    const share = await (0, _factories.buildShare)({
      documentId: document.id,
      teamId: user.teamId,
      userId: user.id
    });
    const res = await server.post("/api/shares.create", {
      body: {
        token: user.getJwtToken(),
        documentId: document.id
      }
    });
    const body = await res.json();
    expect(res.status).toEqual(200);
    expect(body.data.id).toBe(share.id);
  });
  it("should allow creating a share record if team sharing disabled but not publishing", async () => {
    const {
      user,
      document,
      team
    } = await (0, _support.seed)();
    await team.update({
      sharing: false
    });
    const res = await server.post("/api/shares.create", {
      body: {
        token: user.getJwtToken(),
        documentId: document.id
      }
    });
    const body = await res.json();
    expect(res.status).toEqual(200);
    const response = await server.post("/api/shares.update", {
      body: {
        token: user.getJwtToken(),
        id: body.data.id,
        published: true
      }
    });
    expect(response.status).toEqual(403);
  });
  it("should allow creating a share record if collection sharing disabled but not publishing", async () => {
    const {
      user,
      collection,
      document
    } = await (0, _support.seed)();
    await collection.update({
      sharing: false
    });
    const res = await server.post("/api/shares.create", {
      body: {
        token: user.getJwtToken(),
        documentId: document.id
      }
    });
    const body = await res.json();
    expect(res.status).toEqual(200);
    const response = await server.post("/api/shares.update", {
      body: {
        token: user.getJwtToken(),
        id: body.data.id,
        published: true
      }
    });
    expect(response.status).toEqual(403);
  });
  it("should require authentication", async () => {
    const {
      document
    } = await (0, _support.seed)();
    const res = await server.post("/api/shares.create", {
      body: {
        documentId: document.id
      }
    });
    const body = await res.json();
    expect(res.status).toEqual(401);
    expect(body).toMatchSnapshot();
  });
  it("should require authorization", async () => {
    const {
      document
    } = await (0, _support.seed)();
    const user = await (0, _factories.buildUser)();
    const res = await server.post("/api/shares.create", {
      body: {
        token: user.getJwtToken(),
        documentId: document.id
      }
    });
    expect(res.status).toEqual(403);
  });
});
describe("#shares.info", () => {
  it("should allow reading share by id", async () => {
    const {
      user,
      document
    } = await (0, _support.seed)();
    const share = await (0, _factories.buildShare)({
      documentId: document.id,
      teamId: user.teamId,
      userId: user.id
    });
    const res = await server.post("/api/shares.info", {
      body: {
        token: user.getJwtToken(),
        id: share.id
      }
    });
    const body = await res.json();
    expect(res.status).toEqual(200);
    expect(body.data.id).toBe(share.id);
    expect(body.data.createdBy.id).toBe(user.id);
  });
  it("should allow reading share created by deleted user", async () => {
    const {
      user,
      document
    } = await (0, _support.seed)();
    const author = await (0, _factories.buildUser)({
      teamId: user.teamId
    });
    const share = await (0, _factories.buildShare)({
      documentId: document.id,
      teamId: author.teamId,
      userId: author.id
    });
    await author.destroy();
    const res = await server.post("/api/shares.info", {
      body: {
        token: user.getJwtToken(),
        id: share.id
      }
    });
    const body = await res.json();
    expect(res.status).toEqual(200);
    expect(body.data.id).toBe(share.id);
    expect(body.data.createdBy.id).toBe(author.id);
  });
  it("should allow reading share by documentId", async () => {
    const {
      user,
      document
    } = await (0, _support.seed)();
    const share = await (0, _factories.buildShare)({
      documentId: document.id,
      teamId: user.teamId,
      userId: user.id
    });
    const res = await server.post("/api/shares.info", {
      body: {
        token: user.getJwtToken(),
        documentId: document.id
      }
    });
    const body = await res.json();
    expect(res.status).toEqual(200);
    expect(body.data.id).toBe(share.id);
    expect(body.data.published).toBe(true);
  });
  it("should find share created by another user", async () => {
    const {
      admin,
      document
    } = await (0, _support.seed)();
    const user = await (0, _factories.buildUser)({
      teamId: admin.teamId
    });
    const share = await (0, _factories.buildShare)({
      documentId: document.id,
      teamId: admin.teamId,
      userId: admin.id
    });
    const res = await server.post("/api/shares.info", {
      body: {
        token: user.getJwtToken(),
        documentId: document.id
      }
    });
    const body = await res.json();
    expect(res.status).toEqual(200);
    expect(body.data.id).toBe(share.id);
    expect(body.data.published).toBe(true);
  });
  it("should not find revoked share", async () => {
    const {
      user,
      document
    } = await (0, _support.seed)();
    const share = await (0, _factories.buildShare)({
      documentId: document.id,
      teamId: user.teamId,
      userId: user.id
    });
    await share.revoke(user.id);
    const res = await server.post("/api/shares.info", {
      body: {
        token: user.getJwtToken(),
        documentId: document.id
      }
    });
    expect(res.status).toEqual(204);
  });
  it("should not find share for deleted document", async () => {
    const {
      user,
      document
    } = await (0, _support.seed)();
    await (0, _factories.buildShare)({
      documentId: document.id,
      teamId: user.teamId,
      userId: user.id
    });
    await document.delete(user.id);
    const res = await server.post("/api/shares.info", {
      body: {
        token: user.getJwtToken(),
        documentId: document.id
      }
    });
    expect(res.status).toEqual(204);
  });
  describe("apiVersion=2", () => {
    it("should allow reading share by documentId", async () => {
      const {
        user,
        document
      } = await (0, _support.seed)();
      const share = await (0, _factories.buildShare)({
        documentId: document.id,
        teamId: user.teamId,
        userId: user.id
      });
      const res = await server.post("/api/shares.info", {
        body: {
          token: user.getJwtToken(),
          documentId: document.id,
          apiVersion: 2
        }
      });
      const body = await res.json();
      expect(res.status).toEqual(200);
      expect(body.data.shares.length).toBe(1);
      expect(body.data.shares[0].id).toBe(share.id);
      expect(body.data.shares[0].published).toBe(true);
    });
    it("should return share for parent document with includeChildDocuments=true", async () => {
      const {
        user,
        document,
        collection
      } = await (0, _support.seed)();
      const childDocument = await (0, _factories.buildDocument)({
        teamId: document.teamId,
        parentDocumentId: document.id,
        collectionId: collection.id
      });
      const share = await (0, _factories.buildShare)({
        documentId: document.id,
        teamId: document.teamId,
        userId: user.id,
        includeChildDocuments: true
      });
      await collection.addDocumentToStructure(childDocument, 0);
      const res = await server.post("/api/shares.info", {
        body: {
          token: user.getJwtToken(),
          documentId: childDocument.id,
          apiVersion: 2
        }
      });
      const body = await res.json();
      expect(res.status).toEqual(200);
      expect(body.data.shares.length).toBe(1);
      expect(body.data.shares[0].id).toBe(share.id);
      expect(body.data.shares[0].documentId).toBe(document.id);
      expect(body.data.shares[0].published).toBe(true);
      expect(body.data.shares[0].includeChildDocuments).toBe(true);
      expect(body.policies.length).toBe(1);
      expect(body.policies[0].abilities.update).toBe(true);
    });
    it("should not return share for parent document with includeChildDocuments=false", async () => {
      const {
        user,
        document,
        collection
      } = await (0, _support.seed)();
      const childDocument = await (0, _factories.buildDocument)({
        teamId: document.teamId,
        parentDocumentId: document.id,
        collectionId: collection.id
      });
      await (0, _factories.buildShare)({
        documentId: document.id,
        teamId: document.teamId,
        userId: user.id,
        includeChildDocuments: false
      });
      await collection.addDocumentToStructure(childDocument, 0);
      const res = await server.post("/api/shares.info", {
        body: {
          token: user.getJwtToken(),
          documentId: childDocument.id,
          apiVersion: 2
        }
      });
      expect(res.status).toEqual(204);
    });
    it("should return shares for parent document and current document", async () => {
      const {
        user,
        document,
        collection
      } = await (0, _support.seed)();
      const childDocument = await (0, _factories.buildDocument)({
        teamId: document.teamId,
        parentDocumentId: document.id,
        collectionId: collection.id
      });
      const share = await (0, _factories.buildShare)({
        documentId: childDocument.id,
        teamId: user.teamId,
        userId: user.id,
        includeChildDocuments: false
      });
      const share2 = await (0, _factories.buildShare)({
        documentId: document.id,
        teamId: document.teamId,
        userId: user.id,
        includeChildDocuments: true
      });
      await collection.addDocumentToStructure(childDocument, 0);
      const res = await server.post("/api/shares.info", {
        body: {
          token: user.getJwtToken(),
          documentId: childDocument.id,
          apiVersion: 2
        }
      });
      const body = await res.json();
      expect(res.status).toEqual(200);
      expect(body.data.shares.length).toBe(2);
      expect(body.data.shares[0].id).toBe(share.id);
      expect(body.data.shares[0].includeChildDocuments).toBe(false);
      expect(body.data.shares[0].documentId).toBe(childDocument.id);
      expect(body.data.shares[0].published).toBe(true);
      expect(body.data.shares[1].id).toBe(share2.id);
      expect(body.data.shares[1].documentId).toBe(document.id);
      expect(body.data.shares[1].published).toBe(true);
      expect(body.data.shares[1].includeChildDocuments).toBe(true);
    });
  });
  it("should require authentication", async () => {
    const {
      user,
      document
    } = await (0, _support.seed)();
    const share = await (0, _factories.buildShare)({
      documentId: document.id,
      teamId: user.teamId,
      userId: user.id
    });
    const res = await server.post("/api/shares.info", {
      body: {
        id: share.id
      }
    });
    const body = await res.json();
    expect(res.status).toEqual(401);
    expect(body).toMatchSnapshot();
  });
  it("should require authorization", async () => {
    const {
      admin,
      document
    } = await (0, _support.seed)();
    const user = await (0, _factories.buildUser)();
    const share = await (0, _factories.buildShare)({
      documentId: document.id,
      teamId: admin.teamId,
      userId: admin.id
    });
    const res = await server.post("/api/shares.info", {
      body: {
        token: user.getJwtToken(),
        id: share.id
      }
    });
    expect(res.status).toEqual(403);
  });
});
describe("#shares.update", () => {
  it("should allow user to update a share", async () => {
    const {
      user,
      document
    } = await (0, _support.seed)();
    const share = await (0, _factories.buildShare)({
      documentId: document.id,
      teamId: user.teamId
    });
    const res = await server.post("/api/shares.update", {
      body: {
        token: user.getJwtToken(),
        id: share.id,
        published: true
      }
    });
    const body = await res.json();
    expect(res.status).toEqual(200);
    expect(body.data.id).toBe(share.id);
    expect(body.data.published).toBe(true);
  });
  it("should allow author to update a share", async () => {
    const {
      user,
      document
    } = await (0, _support.seed)();
    const share = await (0, _factories.buildShare)({
      documentId: document.id,
      teamId: user.teamId,
      userId: user.id
    });
    const res = await server.post("/api/shares.update", {
      body: {
        token: user.getJwtToken(),
        id: share.id,
        published: true
      }
    });
    const body = await res.json();
    expect(res.status).toEqual(200);
    expect(body.data.id).toBe(share.id);
    expect(body.data.published).toBe(true);
  });
  it("should allow admin to update a share", async () => {
    const {
      user,
      admin,
      document
    } = await (0, _support.seed)();
    const share = await (0, _factories.buildShare)({
      documentId: document.id,
      teamId: user.teamId,
      userId: user.id
    });
    const res = await server.post("/api/shares.update", {
      body: {
        token: admin.getJwtToken(),
        id: share.id,
        published: true
      }
    });
    const body = await res.json();
    expect(res.status).toEqual(200);
    expect(body.data.id).toBe(share.id);
    expect(body.data.published).toBe(true);
  });
  it("should require authentication", async () => {
    const {
      user,
      document
    } = await (0, _support.seed)();
    const share = await (0, _factories.buildShare)({
      documentId: document.id,
      teamId: user.teamId,
      userId: user.id
    });
    const res = await server.post("/api/shares.update", {
      body: {
        id: share.id,
        published: true
      }
    });
    const body = await res.json();
    expect(res.status).toEqual(401);
    expect(body).toMatchSnapshot();
  });
  it("should require authorization", async () => {
    const {
      admin,
      document
    } = await (0, _support.seed)();
    const user = await (0, _factories.buildUser)();
    const share = await (0, _factories.buildShare)({
      documentId: document.id,
      teamId: admin.teamId,
      userId: admin.id
    });
    const res = await server.post("/api/shares.update", {
      body: {
        token: user.getJwtToken(),
        id: share.id,
        published: true
      }
    });
    expect(res.status).toEqual(403);
  });
});
describe("#shares.revoke", () => {
  it("should allow author to revoke a share", async () => {
    const {
      user,
      document
    } = await (0, _support.seed)();
    const share = await (0, _factories.buildShare)({
      documentId: document.id,
      teamId: user.teamId,
      userId: user.id
    });
    const res = await server.post("/api/shares.revoke", {
      body: {
        token: user.getJwtToken(),
        id: share.id
      }
    });
    expect(res.status).toEqual(200);
  });
  it("should 404 if shares document is deleted", async () => {
    const {
      user,
      document
    } = await (0, _support.seed)();
    const share = await (0, _factories.buildShare)({
      documentId: document.id,
      teamId: user.teamId,
      userId: user.id
    });
    await document.delete(user.id);
    const res = await server.post("/api/shares.revoke", {
      body: {
        token: user.getJwtToken(),
        id: share.id
      }
    });
    expect(res.status).toEqual(404);
  });
  it("should allow admin to revoke a share", async () => {
    const {
      user,
      admin,
      document
    } = await (0, _support.seed)();
    const share = await (0, _factories.buildShare)({
      documentId: document.id,
      teamId: user.teamId,
      userId: user.id
    });
    const res = await server.post("/api/shares.revoke", {
      body: {
        token: admin.getJwtToken(),
        id: share.id
      }
    });
    expect(res.status).toEqual(200);
  });
  it("should require authentication", async () => {
    const {
      user,
      document
    } = await (0, _support.seed)();
    const share = await (0, _factories.buildShare)({
      documentId: document.id,
      teamId: user.teamId,
      userId: user.id
    });
    const res = await server.post("/api/shares.revoke", {
      body: {
        id: share.id
      }
    });
    const body = await res.json();
    expect(res.status).toEqual(401);
    expect(body).toMatchSnapshot();
  });
  it("should require authorization", async () => {
    const {
      admin,
      document
    } = await (0, _support.seed)();
    const user = await (0, _factories.buildUser)();
    const share = await (0, _factories.buildShare)({
      documentId: document.id,
      teamId: admin.teamId,
      userId: admin.id
    });
    const res = await server.post("/api/shares.revoke", {
      body: {
        token: user.getJwtToken(),
        id: share.id
      }
    });
    expect(res.status).toEqual(403);
  });
});