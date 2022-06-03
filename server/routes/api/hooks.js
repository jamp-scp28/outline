"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _invariant = _interopRequireDefault(require("invariant"));

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _lodash = require("lodash");

var _env = _interopRequireDefault(require("./../../env"));

var _errors = require("./../../errors");

var _Logger = _interopRequireDefault(require("./../../logging/Logger"));

var _models = require("./../../models");

var _presenters = require("./../../presenters");

var Slack = _interopRequireWildcard(require("./../../utils/slack"));

var _validation = require("./../../validation");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _koaRouter.default(); // triggered by a user posting a getoutline.com link in Slack

router.post("hooks.unfurl", async ctx => {
  const {
    challenge,
    token,
    event
  } = ctx.body;

  if (challenge) {
    return ctx.body = ctx.body.challenge;
  }

  if (token !== _env.default.SLACK_VERIFICATION_TOKEN) {
    throw (0, _errors.AuthenticationError)("Invalid token");
  }

  const user = await _models.User.findOne({
    include: [{
      where: {
        providerId: event.user
      },
      model: _models.UserAuthentication,
      as: "authentications",
      required: true
    }]
  });

  if (!user) {
    return;
  }

  const auth = await _models.IntegrationAuthentication.findOne({
    where: {
      service: "slack",
      teamId: user.teamId
    }
  });

  if (!auth) {
    return;
  } // get content for unfurled links


  const unfurls = {};

  for (const link of event.links) {
    const id = link.url.slice(link.url.lastIndexOf("/") + 1);
    const doc = await _models.Document.findByPk(id);

    if (!doc || doc.teamId !== user.teamId) {
      continue;
    }

    unfurls[link.url] = {
      title: doc.title,
      text: doc.getSummary(),
      color: doc.collection.color
    };
  }

  await Slack.post("chat.unfurl", {
    token: auth.token,
    channel: event.channel,
    ts: event.message_ts,
    unfurls
  });
}); // triggered by interactions with actions, dialogs, message buttons in Slack

router.post("hooks.interactive", async ctx => {
  const {
    payload
  } = ctx.body;
  (0, _validation.assertPresent)(payload, "payload is required");
  const data = JSON.parse(payload);
  const {
    callback_id,
    token
  } = data;
  (0, _validation.assertPresent)(token, "token is required");
  (0, _validation.assertPresent)(callback_id, "callback_id is required");

  if (token !== _env.default.SLACK_VERIFICATION_TOKEN) {
    throw (0, _errors.AuthenticationError)("Invalid verification token");
  } // we find the document based on the users teamId to ensure access


  const document = await _models.Document.scope("withCollection").findByPk(data.callback_id);

  if (!document) {
    throw (0, _errors.InvalidRequestError)("Invalid callback_id");
  }

  const team = await _models.Team.findByPk(document.teamId);
  (0, _invariant.default)(team, "team not found"); // respond with a public message that will be posted in the original channel

  ctx.body = {
    response_type: "in_channel",
    replace_original: false,
    attachments: [(0, _presenters.presentSlackAttachment)(document, document.collection, team, document.getSummary())]
  };
}); // triggered by the /outline command in Slack

router.post("hooks.slack", async ctx => {
  const {
    token,
    team_id,
    user_id,
    text = ""
  } = ctx.body;
  (0, _validation.assertPresent)(token, "token is required");
  (0, _validation.assertPresent)(team_id, "team_id is required");
  (0, _validation.assertPresent)(user_id, "user_id is required");

  if (token !== _env.default.SLACK_VERIFICATION_TOKEN) {
    throw (0, _errors.AuthenticationError)("Invalid verification token");
  } // Handle "help" command or no input


  if (text.trim() === "help" || !text.trim()) {
    ctx.body = {
      response_type: "ephemeral",
      text: "How to use /outline",
      attachments: [{
        text: "To search your knowledge base use `/outline keyword`. \nYou’ve already learned how to get help with `/outline help`."
      }]
    };
    return;
  }

  let user, team; // attempt to find the corresponding team for this request based on the team_id

  team = await _models.Team.findOne({
    include: [{
      where: {
        name: "slack",
        providerId: team_id,
        enabled: true
      },
      as: "authenticationProviders",
      model: _models.AuthenticationProvider,
      required: true
    }]
  });

  if (team) {
    const authentication = await _models.UserAuthentication.findOne({
      where: {
        providerId: user_id
      },
      include: [{
        where: {
          teamId: team.id
        },
        model: _models.User,
        as: "user",
        required: true
      }]
    });

    if (authentication) {
      user = authentication.user;
    }
  } else {
    // If we couldn't find a team it's still possible that the request is from
    // a team that authenticated with a different service, but connected Slack
    // via integration
    const integration = await _models.Integration.findOne({
      where: {
        settings: {
          serviceTeamId: team_id
        }
      },
      include: [{
        model: _models.Team,
        as: "team"
      }]
    });

    if (integration) {
      team = integration.team;
    }
  } // This should be super rare, how does someone end up being able to make a valid
  // request from Slack that connects to no teams in Outline.


  if (!team) {
    ctx.body = {
      response_type: "ephemeral",
      text: "Sorry, we couldn’t find an integration for your team. Head to your Outline settings to set one up."
    };
    return;
  } // Try to find the user by matching the email address if it is confirmed on
  // Slack's side. It's always trusted on our side as it is only updatable
  // through the authentication provider.


  if (!user) {
    const auth = await _models.IntegrationAuthentication.findOne({
      where: {
        service: "slack",
        teamId: team.id
      }
    });

    if (auth) {
      try {
        const response = await Slack.request("users.info", {
          token: auth.token,
          user: user_id
        });

        if (response.user.is_email_confirmed && response.user.profile.email) {
          user = await _models.User.findOne({
            where: {
              email: response.user.profile.email,
              teamId: team.id
            }
          });
        }
      } catch (err) {
        // Old connections do not have the correct permissions to access user info
        // so errors here are expected.
        _Logger.default.info("utils", "Failed requesting users.info from Slack, the Slack integration should be reconnected.", {
          teamId: auth.teamId
        });
      }
    }
  }

  const options = {
    limit: 5
  }; // If we were able to map the request to a user then we can use their permissions
  // to load more documents based on the collections they have access to. Otherwise
  // just a generic search against team-visible documents is allowed.

  const {
    results,
    totalCount
  } = user ? await _models.Document.searchForUser(user, text, options) : await _models.Document.searchForTeam(team, text, options);

  _models.SearchQuery.create({
    userId: user ? user.id : null,
    teamId: team.id,
    source: "slack",
    query: text,
    results: totalCount
  });

  const haventSignedIn = `(It looks like you haven’t signed in to Outline yet, so results may be limited)`; // Map search results to the format expected by the Slack API

  if (results.length) {
    const attachments = [];

    for (const result of results) {
      const queryIsInTitle = !!result.document.title.toLowerCase().match((0, _lodash.escapeRegExp)(text.toLowerCase()));
      attachments.push((0, _presenters.presentSlackAttachment)(result.document, result.document.collection, team, queryIsInTitle ? undefined : result.context, _env.default.SLACK_MESSAGE_ACTIONS ? [{
        name: "post",
        text: "Post to Channel",
        type: "button",
        value: result.document.id
      }] : undefined));
    }

    ctx.body = {
      text: user ? `This is what we found for "${text}"…` : `This is what we found for "${text}" ${haventSignedIn}…`,
      attachments
    };
  } else {
    ctx.body = {
      text: user ? `No results for "${text}"` : `No results for "${text}" ${haventSignedIn}`
    };
  }
});
var _default = router;
exports.default = _default;