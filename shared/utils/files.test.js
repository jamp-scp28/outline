"use strict";

var _files = require("./files");

describe("bytesToHumanReadable", function () {
  test("Outputs readable string", function () {
    expect((0, _files.bytesToHumanReadable)(0)).toBe("0 Bytes");
    expect((0, _files.bytesToHumanReadable)(500)).toBe("500 Bytes");
    expect((0, _files.bytesToHumanReadable)(1000)).toBe("1 kB");
    expect((0, _files.bytesToHumanReadable)(15000)).toBe("15 kB");
    expect((0, _files.bytesToHumanReadable)(12345)).toBe("12.34 kB");
    expect((0, _files.bytesToHumanReadable)(123456)).toBe("123.45 kB");
    expect((0, _files.bytesToHumanReadable)(1234567)).toBe("1.23 MB");
  });
});