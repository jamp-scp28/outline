"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadToS3FromBuffer = exports.publicS3Endpoint = void 0;
const uploadToS3FromBuffer = jest.fn().mockReturnValue("/endpoint/key");
exports.uploadToS3FromBuffer = uploadToS3FromBuffer;
const publicS3Endpoint = jest.fn().mockReturnValue("http://mock");
exports.publicS3Endpoint = publicS3Endpoint;