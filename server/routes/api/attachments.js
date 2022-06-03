"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _uuid = require("uuid");

var _files = require("./../../../shared/utils/files");

var _errors = require("./../../errors");

var _authentication = _interopRequireDefault(require("./../../middlewares/authentication"));

var _models = require("./../../models");

var _policies = require("./../../policies");

var _s = require("./../../utils/s3");

var _validation = require("./../../validation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _koaRouter.default();
const AWS_S3_ACL = process.env.AWS_S3_ACL || "private";
router.post("attachments.create", (0, _authentication.default)(), async ctx => {
  const {
    name,
    documentId,
    contentType = "application/octet-stream",
    size
  } = ctx.body;
  (0, _validation.assertPresent)(name, "name is required");
  (0, _validation.assertPresent)(size, "size is required");
  const {
    user
  } = ctx.state;
  (0, _policies.authorize)(user, "createAttachment", user.team);

  if (process.env.AWS_S3_UPLOAD_MAX_SIZE && size > process.env.AWS_S3_UPLOAD_MAX_SIZE) {
    throw (0, _errors.ValidationError)(`Sorry, this file is too large – the maximum size is ${(0, _files.bytesToHumanReadable)(parseInt(process.env.AWS_S3_UPLOAD_MAX_SIZE, 10))}`);
  }

  const s3Key = (0, _uuid.v4)();
  const acl = ctx.body.public === undefined ? AWS_S3_ACL : ctx.body.public ? "public-read" : "private";
  const bucket = acl === "public-read" ? "public" : "uploads";
  const key = `${bucket}/${user.id}/${s3Key}/${name}`;
  const presignedPost = await (0, _s.getPresignedPost)(key, acl, contentType);
  const endpoint = (0, _s.publicS3Endpoint)();
  const url = `${endpoint}/${key}`;

  if (documentId) {
    const document = await _models.Document.findByPk(documentId, {
      userId: user.id
    });
    (0, _policies.authorize)(user, "update", document);
  }

  const attachment = await _models.Attachment.create({
    key,
    acl,
    size,
    url,
    contentType,
    documentId,
    teamId: user.teamId,
    userId: user.id
  });
  await _models.Event.create({
    name: "attachments.create",
    data: {
      name
    },
    teamId: user.teamId,
    userId: user.id,
    ip: ctx.request.ip
  });
  ctx.body = {
    data: {
      maxUploadSize: process.env.AWS_S3_UPLOAD_MAX_SIZE,
      uploadUrl: endpoint,
      form: {
        "Cache-Control": "max-age=31557600",
        "Content-Type": contentType,
        ...presignedPost.fields
      },
      attachment: {
        documentId,
        contentType,
        name,
        id: attachment.id,
        url: attachment.redirectUrl,
        size
      }
    }
  };
});
router.post("attachments.delete", (0, _authentication.default)(), async ctx => {
  const {
    id
  } = ctx.body;
  (0, _validation.assertPresent)(id, "id is required");
  const {
    user
  } = ctx.state;
  const attachment = await _models.Attachment.findByPk(id);

  if (!attachment) {
    throw (0, _errors.NotFoundError)();
  }

  if (attachment.documentId) {
    const document = await _models.Document.findByPk(attachment.documentId, {
      userId: user.id
    });
    (0, _policies.authorize)(user, "update", document);
  }

  (0, _policies.authorize)(user, "delete", attachment);
  await attachment.destroy();
  await _models.Event.create({
    name: "attachments.delete",
    teamId: user.teamId,
    userId: user.id,
    ip: ctx.request.ip
  });
  ctx.body = {
    success: true
  };
});
router.post("attachments.redirect", (0, _authentication.default)(), async ctx => {
  const {
    id
  } = ctx.body;
  (0, _validation.assertPresent)(id, "id is required");
  const {
    user
  } = ctx.state;
  const attachment = await _models.Attachment.findByPk(id);

  if (!attachment) {
    throw (0, _errors.NotFoundError)();
  }

  if (attachment.isPrivate) {
    if (attachment.teamId !== user.teamId) {
      throw (0, _errors.AuthorizationError)();
    }

    const accessUrl = await (0, _s.getSignedUrl)(attachment.key);
    ctx.redirect(accessUrl);
  } else {
    ctx.redirect(attachment.canonicalUrl);
  }
});
var _default = router;
exports.default = _default;