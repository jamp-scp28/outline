"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dateFns = require("date-fns");

var _sequelize = require("sequelize");

var _sequelize2 = require("./../../database/sequelize");

var _InviteReminderEmail = _interopRequireDefault(require("./../../emails/templates/InviteReminderEmail"));

var _models = require("./../../models");

var _User = require("./../../models/User");

var _BaseTask = _interopRequireWildcard(require("./BaseTask"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class InviteReminderTask extends _BaseTask.default {
  async perform() {
    const users = await _models.User.scope("invited").findAll({
      attributes: ["id"],
      where: {
        createdAt: {
          [_sequelize.Op.lt]: (0, _dateFns.subDays)(new Date(), 2),
          [_sequelize.Op.gt]: (0, _dateFns.subDays)(new Date(), 3)
        }
      }
    });
    const userIds = users.map(user => user.id);

    for (const userId of userIds) {
      await _sequelize2.sequelize.transaction(async transaction => {
        const user = await _models.User.scope("withTeam").findByPk(userId, {
          lock: {
            level: transaction.LOCK.UPDATE,
            of: _models.User
          },
          transaction
        });
        const invitedBy = user !== null && user !== void 0 && user.invitedById ? await _models.User.findByPk(user === null || user === void 0 ? void 0 : user.invitedById, {
          transaction
        }) : undefined;

        if (user && invitedBy && user.getFlag(_User.UserFlag.InviteReminderSent) === 0) {
          await _InviteReminderEmail.default.schedule({
            to: user.email,
            name: user.name,
            actorName: invitedBy.name,
            actorEmail: invitedBy.email,
            teamName: user.team.name,
            teamUrl: user.team.url
          });
          user.incrementFlag(_User.UserFlag.InviteReminderSent);
          await user.save({
            transaction
          });
        }
      });
    }
  }

  get options() {
    return {
      attempts: 1,
      priority: _BaseTask.TaskPriority.Background
    };
  }

}

exports.default = InviteReminderTask;