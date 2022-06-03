"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = init;

var _invariant = _interopRequireDefault(require("invariant"));

var _socket = _interopRequireDefault(require("socket.io"));

var _socket2 = _interopRequireDefault(require("socket.io-redis"));

var _socketioAuth = _interopRequireDefault(require("socketio-auth"));

var _Logger = _interopRequireDefault(require("./../logging/Logger"));

var _metrics = _interopRequireDefault(require("./../logging/metrics"));

var _models = require("./../models");

var _policies = require("./../policies");

var _jwt = require("./../utils/jwt");

var _queues = require("../queues");

var _WebsocketsProcessor = _interopRequireDefault(require("../queues/processors/WebsocketsProcessor"));

var _redis = _interopRequireDefault(require("../redis"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function init(app, server) {
  const path = "/realtime"; // Websockets for events and non-collaborative documents

  const io = (0, _socket.default)(server, {
    path,
    serveClient: false,
    cookie: false
  }); // Remove the upgrade handler that we just added when registering the IO engine
  // And re-add it with a check to only handle the realtime path, this allows
  // collaboration websockets to exist in the same process as engine.io.

  const listeners = server.listeners("upgrade");
  const ioHandleUpgrade = listeners.pop();

  if (ioHandleUpgrade) {
    server.removeListener("upgrade", ioHandleUpgrade);
  }

  server.on("upgrade", function (req, socket, head) {
    if (req.url && req.url.indexOf(path) > -1) {
      (0, _invariant.default)(ioHandleUpgrade, "Existing upgrade handler must exist");
      ioHandleUpgrade(req, socket, head);
    }
  });
  server.on("shutdown", () => {
    _metrics.default.gaugePerInstance("websockets.count", 0);
  });
  io.adapter((0, _socket2.default)({
    pubClient: _redis.default.defaultClient,
    subClient: _redis.default.defaultSubscriber
  }));
  io.origins((_req, callback) => {
    callback(null, true);
  });
  io.of("/").adapter.on("error", err => {
    if (err.name === "MaxRetriesPerRequestError") {
      _Logger.default.error("Redis maximum retries exceeded in socketio adapter", err);

      throw err;
    } else {
      _Logger.default.error("Redis error in socketio adapter", err);
    }
  });
  io.on("connection", socket => {
    _metrics.default.increment("websockets.connected");

    _metrics.default.gaugePerInstance("websockets.count", socket.client.conn.server.clientsCount);

    socket.on("disconnect", () => {
      _metrics.default.increment("websockets.disconnected");

      _metrics.default.gaugePerInstance("websockets.count", socket.client.conn.server.clientsCount);
    });
  });
  (0, _socketioAuth.default)(io, {
    authenticate: async (socket, data, callback) => {
      const {
        token
      } = data;

      try {
        const user = await (0, _jwt.getUserForJWT)(token);
        socket.client.user = user; // store the mapping between socket id and user id in redis
        // so that it is accessible across multiple server nodes

        await _redis.default.defaultClient.hset(socket.id, "userId", user.id);
        return callback(null, true);
      } catch (err) {
        return callback(err, false);
      }
    },
    postAuthenticate: async socket => {
      const {
        user
      } = socket.client; // the rooms associated with the current team
      // and user so we can send authenticated events

      const rooms = [`team-${user.teamId}`, `user-${user.id}`]; // the rooms associated with collections this user
      // has access to on connection. New collection subscriptions
      // are managed from the client as needed through the 'join' event

      const collectionIds = await user.collectionIds();
      collectionIds.forEach(collectionId => rooms.push(`collection-${collectionId}`)); // join all of the rooms at once

      socket.join(rooms); // allow the client to request to join rooms

      socket.on("join", async event => {
        // user is joining a collection channel, because their permissions have
        // changed, granting them access.
        if (event.collectionId) {
          const collection = await _models.Collection.scope({
            method: ["withMembership", user.id]
          }).findByPk(event.collectionId);

          if ((0, _policies.can)(user, "read", collection)) {
            socket.join(`collection-${event.collectionId}`, () => {
              _metrics.default.increment("websockets.collections.join");
            });
          }
        } // user is joining a document channel, because they have navigated to
        // view a document.


        if (event.documentId) {
          const document = await _models.Document.findByPk(event.documentId, {
            userId: user.id
          });

          if ((0, _policies.can)(user, "read", document)) {
            const room = `document-${event.documentId}`;
            await _models.View.touch(event.documentId, user.id, event.isEditing);
            const editing = await _models.View.findRecentlyEditingByDocument(event.documentId);
            socket.join(room, () => {
              _metrics.default.increment("websockets.documents.join"); // let everyone else in the room know that a new user joined


              io.to(room).emit("user.join", {
                userId: user.id,
                documentId: event.documentId,
                isEditing: event.isEditing
              }); // let this user know who else is already present in the room

              io.in(room).clients(async (err, sockets) => {
                if (err) {
                  _Logger.default.error("Error getting clients for room", err, {
                    sockets
                  });

                  return;
                } // because a single user can have multiple socket connections we
                // need to make sure that only unique userIds are returned. A Map
                // makes this easy.


                const userIds = new Map();

                for (const socketId of sockets) {
                  const userId = await _redis.default.defaultClient.hget(socketId, "userId");
                  userIds.set(userId, userId);
                }

                socket.emit("document.presence", {
                  documentId: event.documentId,
                  userIds: Array.from(userIds.keys()),
                  editingIds: editing.map(view => view.userId)
                });
              });
            });
          }
        }
      }); // allow the client to request to leave rooms

      socket.on("leave", event => {
        if (event.collectionId) {
          socket.leave(`collection-${event.collectionId}`, () => {
            _metrics.default.increment("websockets.collections.leave");
          });
        }

        if (event.documentId) {
          const room = `document-${event.documentId}`;
          socket.leave(room, () => {
            _metrics.default.increment("websockets.documents.leave");

            io.to(room).emit("user.leave", {
              userId: user.id,
              documentId: event.documentId
            });
          });
        }
      });
      socket.on("disconnecting", () => {
        const rooms = Object.keys(socket.rooms);
        rooms.forEach(room => {
          if (room.startsWith("document-")) {
            const documentId = room.replace("document-", "");
            io.to(room).emit("user.leave", {
              userId: user.id,
              documentId
            });
          }
        });
      });
      socket.on("presence", async event => {
        _metrics.default.increment("websockets.presence");

        const room = `document-${event.documentId}`;

        if (event.documentId && socket.rooms[room]) {
          const view = await _models.View.touch(event.documentId, user.id, event.isEditing);
          view.user = user;
          io.to(room).emit("user.presence", {
            userId: user.id,
            documentId: event.documentId,
            isEditing: event.isEditing
          });
        }
      });
    }
  }); // Handle events from event queue that should be sent to the clients down ws

  const websockets = new _WebsocketsProcessor.default();

  _queues.websocketQueue.process(async function websocketEventsProcessor(job) {
    const event = job.data;
    websockets.perform(event, io).catch(error => {
      _Logger.default.error("Error processing websocket event", error, {
        event
      });
    });
  });
}