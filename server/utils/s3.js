"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadToS3FromUrl = exports.uploadToS3FromBuffer = exports.publicS3Endpoint = exports.makePolicy = exports.makeCredential = exports.getSignedUrl = exports.getSignature = exports.getPresignedPost = exports.getFileByKey = exports.getAWSKeyForFileOp = exports.deleteFromS3 = void 0;

var _crypto = _interopRequireDefault(require("crypto"));

var _util = _interopRequireDefault(require("util"));

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _dateFns = require("date-fns");

var _fetchWithProxy = _interopRequireDefault(require("fetch-with-proxy"));

var _uuid = require("uuid");

var _Logger = _interopRequireDefault(require("./../logging/Logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const AWS_S3_ACCELERATE_URL = process.env.AWS_S3_ACCELERATE_URL;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const AWS_S3_UPLOAD_BUCKET_URL = process.env.AWS_S3_UPLOAD_BUCKET_URL || "";
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_REGION = process.env.AWS_REGION || "";
const AWS_S3_UPLOAD_BUCKET_NAME = process.env.AWS_S3_UPLOAD_BUCKET_NAME || "";
const AWS_S3_FORCE_PATH_STYLE = process.env.AWS_S3_FORCE_PATH_STYLE !== "false";
const s3 = new _awsSdk.default.S3({
  s3BucketEndpoint: AWS_S3_ACCELERATE_URL ? true : undefined,
  s3ForcePathStyle: AWS_S3_FORCE_PATH_STYLE,
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION,
  endpoint: AWS_S3_ACCELERATE_URL ? AWS_S3_ACCELERATE_URL : AWS_S3_UPLOAD_BUCKET_URL.includes(AWS_S3_UPLOAD_BUCKET_NAME) ? undefined : new _awsSdk.default.Endpoint(AWS_S3_UPLOAD_BUCKET_URL),
  signatureVersion: "v4"
});

const createPresignedPost = _util.default.promisify(s3.createPresignedPost).bind(s3);

const hmac = (key, message, encoding) => {
  const o = _crypto.default.createHmac("sha256", key).update(message, "utf8");

  return encoding ? o.digest(encoding) : o.digest();
};

const makeCredential = () => {
  const credential = AWS_ACCESS_KEY_ID + "/" + (0, _dateFns.format)(new Date(), "yyyyMMdd") + "/" + AWS_REGION + "/s3/aws4_request";
  return credential;
};

exports.makeCredential = makeCredential;

const makePolicy = (credential, longDate, acl, contentType = "image") => {
  const tomorrow = (0, _dateFns.addHours)(new Date(), 24);
  const policy = {
    conditions: [{
      bucket: process.env.AWS_S3_UPLOAD_BUCKET_NAME
    }, ["starts-with", "$key", ""], {
      acl
    }, // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    ["content-length-range", 0, +process.env.AWS_S3_UPLOAD_MAX_SIZE], ["starts-with", "$Content-Type", contentType], ["starts-with", "$Cache-Control", ""], {
      "x-amz-algorithm": "AWS4-HMAC-SHA256"
    }, {
      "x-amz-credential": credential
    }, {
      "x-amz-date": longDate
    }],
    expiration: (0, _dateFns.format)(tomorrow, "yyyy-MM-dd'T'HH:mm:ss'Z'")
  };
  return Buffer.from(JSON.stringify(policy)).toString("base64");
};

exports.makePolicy = makePolicy;

const getSignature = policy => {
  const kDate = hmac("AWS4" + AWS_SECRET_ACCESS_KEY, (0, _dateFns.format)(new Date(), "yyyyMMdd"));
  const kRegion = hmac(kDate, AWS_REGION);
  const kService = hmac(kRegion, "s3");
  const kCredentials = hmac(kService, "aws4_request");
  const signature = hmac(kCredentials, policy, "hex");
  return signature;
};

exports.getSignature = getSignature;

const getPresignedPost = (key, acl, contentType = "image") => {
  const params = {
    Bucket: process.env.AWS_S3_UPLOAD_BUCKET_NAME,
    Conditions: [process.env.AWS_S3_UPLOAD_MAX_SIZE ? ["content-length-range", 0, +process.env.AWS_S3_UPLOAD_MAX_SIZE] : undefined, ["starts-with", "$Content-Type", contentType], ["starts-with", "$Cache-Control", ""]].filter(Boolean),
    Fields: {
      key,
      acl
    },
    Expires: 3600
  };
  return createPresignedPost(params);
};

exports.getPresignedPost = getPresignedPost;

const publicS3Endpoint = isServerUpload => {
  if (AWS_S3_ACCELERATE_URL) {
    return AWS_S3_ACCELERATE_URL;
  } // lose trailing slash if there is one and convert fake-s3 url to localhost
  // for access outside of docker containers in local development


  const isDocker = AWS_S3_UPLOAD_BUCKET_URL.match(/http:\/\/s3:/);
  const host = AWS_S3_UPLOAD_BUCKET_URL.replace("s3:", "localhost:").replace(/\/$/, ""); // support old path-style S3 uploads and new virtual host uploads by checking
  // for the bucket name in the endpoint url before appending.

  const isVirtualHost = host.includes(AWS_S3_UPLOAD_BUCKET_NAME);

  if (isVirtualHost) {
    return host;
  }

  return `${host}/${isServerUpload && isDocker ? "s3/" : ""}${AWS_S3_UPLOAD_BUCKET_NAME}`;
};

exports.publicS3Endpoint = publicS3Endpoint;

const uploadToS3FromBuffer = async (buffer, contentType, key, acl) => {
  await s3.putObject({
    ACL: acl,
    Bucket: AWS_S3_UPLOAD_BUCKET_NAME,
    Key: key,
    ContentType: contentType,
    ContentLength: buffer.length,
    Body: buffer
  }).promise();
  const endpoint = publicS3Endpoint(true);
  return `${endpoint}/${key}`;
}; // @ts-expect-error ts-migrate(7030) FIXME: Not all code paths return a value.


exports.uploadToS3FromBuffer = uploadToS3FromBuffer;

const uploadToS3FromUrl = async (url, key, acl) => {
  try {
    const res = await (0, _fetchWithProxy.default)(url); // @ts-expect-error ts-migrate(2339) FIXME: Property 'buffer' does not exist on type 'Response... Remove this comment to see the full error message

    const buffer = await res.buffer();
    await s3.putObject({
      ACL: acl,
      Bucket: AWS_S3_UPLOAD_BUCKET_NAME,
      Key: key,
      ContentType: res.headers["content-type"],
      ContentLength: res.headers["content-length"],
      Body: buffer
    }).promise();
    const endpoint = publicS3Endpoint(true);
    return `${endpoint}/${key}`;
  } catch (err) {
    _Logger.default.error("Error uploading to S3 from URL", err, {
      url,
      key,
      acl
    });
  }
};

exports.uploadToS3FromUrl = uploadToS3FromUrl;

const deleteFromS3 = key => {
  return s3.deleteObject({
    Bucket: AWS_S3_UPLOAD_BUCKET_NAME,
    Key: key
  }).promise();
};

exports.deleteFromS3 = deleteFromS3;

const getSignedUrl = async (key, expiresInMs = 60) => {
  const isDocker = AWS_S3_UPLOAD_BUCKET_URL.match(/http:\/\/s3:/);
  const params = {
    Bucket: AWS_S3_UPLOAD_BUCKET_NAME,
    Key: key,
    Expires: expiresInMs
  };
  const url = isDocker ? `${publicS3Endpoint()}/${key}` : await s3.getSignedUrlPromise("getObject", params);

  if (AWS_S3_ACCELERATE_URL) {
    return url.replace(AWS_S3_UPLOAD_BUCKET_URL, AWS_S3_ACCELERATE_URL);
  }

  return url;
}; // function assumes that acl is private


exports.getSignedUrl = getSignedUrl;

const getAWSKeyForFileOp = (teamId, name) => {
  const bucket = "uploads";
  return `${bucket}/${teamId}/${(0, _uuid.v4)()}/${name}-export.zip`;
};

exports.getAWSKeyForFileOp = getAWSKeyForFileOp;

const getFileByKey = async key => {
  const params = {
    Bucket: AWS_S3_UPLOAD_BUCKET_NAME,
    Key: key
  };

  try {
    const data = await s3.getObject(params).promise();
    return data.Body || null;
  } catch (err) {
    _Logger.default.error("Error getting file from S3 by key", err, {
      key
    });
  }

  return null;
};

exports.getFileByKey = getFileByKey;