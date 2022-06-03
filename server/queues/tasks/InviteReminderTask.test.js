"use strict";

var _dateFns = require("date-fns");

var _InviteReminderEmail = _interopRequireDefault(require("./../../emails/templates/InviteReminderEmail"));

var _factories = require("./../../test/factories");

var _support = require("./../../test/support");

var _InviteReminderTask = _interopRequireDefault(require("./InviteReminderTask"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

beforeEach(() => (0, _support.flushdb)());
describe("InviteReminderTask", () => {
  it("should not destroy documents not deleted", async () => {
    const spy = jest.spyOn(_InviteReminderEmail.default, "schedule"); // too old

    await (0, _factories.buildInvite)({
      createdAt: (0, _dateFns.subDays)(new Date(), 3.5)
    }); // too new

    await (0, _factories.buildInvite)({
      createdAt: new Date()
    }); // should send reminder

    await (0, _factories.buildInvite)({
      createdAt: (0, _dateFns.subDays)(new Date(), 2.5)
    });
    const task = new _InviteReminderTask.default();
    await task.perform(); // running twice to make sure the email is only sent once

    await task.perform();
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });
});