"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getArg = getArg;

/**
 * Get the value of a command line argument
 *
 * @param {string} name The name of the argument
 * @param {string} shortName The optioanl short name
 *
 * @returns {string} The value of the argument.
 */
function getArg(name, shortName) {
  return process.argv.slice(2).filter(arg => arg.startsWith(`--${name}=`) || shortName && arg.startsWith(`-${shortName}=`)).map(arg => arg.split("=")[1]).join(",");
}