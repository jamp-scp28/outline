"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCurrentDateAsString = getCurrentDateAsString;
exports.getCurrentDateTimeAsString = getCurrentDateTimeAsString;
exports.getCurrentTimeAsString = getCurrentTimeAsString;
exports.subtractDate = subtractDate;

var _dateFns = require("date-fns");

function subtractDate(date, period) {
  switch (period) {
    case "day":
      return (0, _dateFns.subDays)(date, 1);

    case "week":
      return (0, _dateFns.subWeeks)(date, 1);

    case "month":
      return (0, _dateFns.subMonths)(date, 1);

    case "year":
      return (0, _dateFns.subYears)(date, 1);

    default:
      return date;
  }
}
/**
 * Returns the current date as a string formatted depending on current locale.
 *
 * @returns The current date
 */


function getCurrentDateAsString() {
  return new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
/**
 * Returns the current time as a string formatted depending on current locale.
 *
 * @returns The current time
 */


function getCurrentTimeAsString() {
  return new Date().toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "numeric"
  });
}
/**
 * Returns the current date and time as a string formatted depending on current
 * locale.
 *
 * @returns The current date and time
 */


function getCurrentDateTimeAsString() {
  return new Date().toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  });
}