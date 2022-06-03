"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildAdmin = buildAdmin;
exports.buildAttachment = buildAttachment;
exports.buildCollection = buildCollection;
exports.buildDocument = buildDocument;
exports.buildEvent = buildEvent;
exports.buildFileOperation = buildFileOperation;
exports.buildGroup = buildGroup;
exports.buildGroupUser = buildGroupUser;
exports.buildGuestUser = buildGuestUser;
exports.buildIntegration = buildIntegration;
exports.buildInvite = buildInvite;
exports.buildShare = buildShare;
exports.buildStar = buildStar;
exports.buildTeam = buildTeam;
exports.buildUser = buildUser;

var _uuid = require("uuid");

var _models = require("./../models");

var _FileOperation = require("./../models/FileOperation");

let count = 1;

async function buildShare(overrides = {}) {
  if (!overrides.teamId) {
    const team = await buildTeam();
    overrides.teamId = team.id;
  }

  if (!overrides.userId) {
    const user = await buildUser({
      teamId: overrides.teamId
    });
    overrides.userId = user.id;
  }

  if (!overrides.documentId) {
    const document = await buildDocument({
      createdById: overrides.userId,
      teamId: overrides.teamId
    });
    overrides.documentId = document.id;
  }

  return _models.Share.create({
    published: true,
    ...overrides
  });
}

async function buildStar(overrides = {}) {
  let user;

  if (overrides.userId) {
    user = await _models.User.findByPk(overrides.userId);
  } else {
    user = await buildUser();
    overrides.userId = user.id;
  }

  if (!overrides.documentId) {
    var _user;

    const document = await buildDocument({
      createdById: overrides.userId,
      teamId: (_user = user) === null || _user === void 0 ? void 0 : _user.teamId
    });
    overrides.documentId = document.id;
  }

  return _models.Star.create({
    index: "h",
    ...overrides
  });
}

function buildTeam(overrides = {}) {
  count++;
  return _models.Team.create({
    name: `Team ${count}`,
    collaborativeEditing: false,
    authenticationProviders: [{
      name: "slack",
      providerId: (0, _uuid.v4)()
    }],
    ...overrides
  }, {
    include: "authenticationProviders"
  });
}

function buildEvent(overrides = {}) {
  return _models.Event.create({
    name: "documents.publish",
    ip: "127.0.0.1",
    ...overrides
  });
}

async function buildGuestUser(overrides = {}) {
  if (!overrides.teamId) {
    const team = await buildTeam();
    overrides.teamId = team.id;
  }

  count++;
  return _models.User.create({
    email: `user${count}@example.com`,
    name: `User ${count}`,
    createdAt: new Date("2018-01-01T00:00:00.000Z"),
    lastActiveAt: new Date("2018-01-01T00:00:00.000Z"),
    ...overrides
  });
}

async function buildUser(overrides = {}) {
  let team;

  if (!overrides.teamId) {
    team = await buildTeam();
    overrides.teamId = team.id;
  } else {
    team = await _models.Team.findByPk(overrides.teamId);
  }

  const authenticationProvider = await _models.AuthenticationProvider.findOne({
    where: {
      teamId: overrides.teamId
    }
  });
  count++;
  return _models.User.create({
    email: `user${count}@example.com`,
    name: `User ${count}`,
    username: `user${count}`,
    createdAt: new Date("2018-01-01T00:00:00.000Z"),
    updatedAt: new Date("2018-01-02T00:00:00.000Z"),
    lastActiveAt: new Date("2018-01-03T00:00:00.000Z"),
    authentications: [{
      authenticationProviderId: authenticationProvider.id,
      providerId: (0, _uuid.v4)()
    }],
    ...overrides
  }, {
    include: "authentications"
  });
}

async function buildAdmin(overrides = {}) {
  return buildUser({ ...overrides,
    isAdmin: true
  });
}

async function buildInvite(overrides = {}) {
  if (!overrides.teamId) {
    const team = await buildTeam();
    overrides.teamId = team.id;
  }

  const actor = await buildUser({
    teamId: overrides.teamId
  });
  count++;
  return _models.User.create({
    email: `user${count}@example.com`,
    name: `User ${count}`,
    createdAt: new Date("2018-01-01T00:00:00.000Z"),
    invitedById: actor.id,
    ...overrides,
    lastActiveAt: null
  });
}

async function buildIntegration(overrides = {}) {
  if (!overrides.teamId) {
    const team = await buildTeam();
    overrides.teamId = team.id;
  }

  const user = await buildUser({
    teamId: overrides.teamId
  });
  const authentication = await _models.IntegrationAuthentication.create({
    service: "slack",
    userId: user.id,
    teamId: user.teamId,
    token: "fake-access-token",
    scopes: ["example", "scopes", "here"]
  });
  return _models.Integration.create({
    type: "post",
    service: "slack",
    settings: {
      serviceTeamId: "slack_team_id"
    },
    authenticationId: authentication.id,
    ...overrides
  });
}

async function buildCollection(overrides = {}) {
  if (!overrides.teamId) {
    const team = await buildTeam();
    overrides.teamId = team.id;
  }

  if (!overrides.userId) {
    const user = await buildUser({
      teamId: overrides.teamId
    });
    overrides.userId = user.id;
  }

  count++;
  return _models.Collection.create({
    name: `Test Collection ${count}`,
    description: "Test collection description",
    createdById: overrides.userId,
    permission: "read_write",
    ...overrides
  });
}

async function buildGroup(overrides = {}) {
  if (!overrides.teamId) {
    const team = await buildTeam();
    overrides.teamId = team.id;
  }

  if (!overrides.userId) {
    const user = await buildUser({
      teamId: overrides.teamId
    });
    overrides.userId = user.id;
  }

  count++;
  return _models.Group.create({
    name: `Test Group ${count}`,
    createdById: overrides.userId,
    ...overrides
  });
}

async function buildGroupUser(overrides = {}) {
  if (!overrides.teamId) {
    const team = await buildTeam();
    overrides.teamId = team.id;
  }

  if (!overrides.userId) {
    const user = await buildUser({
      teamId: overrides.teamId
    });
    overrides.userId = user.id;
  }

  count++;
  return _models.GroupUser.create({
    createdById: overrides.userId,
    ...overrides
  });
}

async function buildDocument(overrides = {}) {
  if (!overrides.teamId) {
    const team = await buildTeam();
    overrides.teamId = team.id;
  }

  if (!overrides.userId) {
    const user = await buildUser();
    overrides.userId = user.id;
  }

  if (!overrides.collectionId) {
    const collection = await buildCollection({
      teamId: overrides.teamId,
      userId: overrides.userId
    });
    overrides.collectionId = collection.id;
  }

  count++;
  return _models.Document.create({
    title: `Document ${count}`,
    text: "This is the text in an example document",
    publishedAt: new Date(),
    lastModifiedById: overrides.userId,
    createdById: overrides.userId,
    ...overrides
  });
}

async function buildFileOperation(overrides = {}) {
  if (!overrides.teamId) {
    const team = await buildTeam();
    overrides.teamId = team.id;
  }

  if (!overrides.userId) {
    const user = await buildAdmin({
      teamId: overrides.teamId
    });
    overrides.userId = user.id;
  }

  return _models.FileOperation.create({
    state: _FileOperation.FileOperationState.Creating,
    type: _FileOperation.FileOperationType.Export,
    size: 0,
    key: "uploads/key/to/file.zip",
    collectionId: null,
    url: "https://www.urltos3file.com/file.zip",
    ...overrides
  });
}

async function buildAttachment(overrides = {}) {
  if (!overrides.teamId) {
    const team = await buildTeam();
    overrides.teamId = team.id;
  }

  if (!overrides.userId) {
    const user = await buildUser({
      teamId: overrides.teamId
    });
    overrides.userId = user.id;
  }

  if (!overrides.documentId) {
    const document = await buildDocument({
      teamId: overrides.teamId,
      userId: overrides.userId
    });
    overrides.documentId = document.id;
  }

  count++;
  return _models.Attachment.create({
    key: `uploads/key/to/file ${count}.png`,
    url: `https://redirect.url.com/uploads/key/to/file ${count}.png`,
    contentType: "image/png",
    size: 100,
    acl: "public-read",
    createdAt: new Date("2018-01-02T00:00:00.000Z"),
    updatedAt: new Date("2018-01-02T00:00:00.000Z"),
    ...overrides
  });
}