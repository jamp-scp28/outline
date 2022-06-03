"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = documentUpdater;

var _models = require("./../models");

/**
 * This command updates document properties. To update collaborative text state
 * use documentCollaborativeUpdater.
 *
 * @param Props The properties of the document to update
 * @returns Document The updated document
 */
async function documentUpdater({
  user,
  document,
  title,
  text,
  editorVersion,
  templateId,
  fullWidth,
  append,
  publish,
  transaction,
  ip
}) {
  var _user$team;

  const previousTitle = document.title;

  if (title !== undefined) {
    document.title = title;
  }

  if (editorVersion) {
    document.editorVersion = editorVersion;
  }

  if (templateId) {
    document.templateId = templateId;
  }

  if (fullWidth !== undefined) {
    document.fullWidth = fullWidth;
  }

  if (!((_user$team = user.team) !== null && _user$team !== void 0 && _user$team.collaborativeEditing)) {
    if (append) {
      document.text += text;
    } else if (text !== undefined) {
      document.text = text;
    }
  }

  const changed = document.changed();

  if (publish) {
    document.lastModifiedById = user.id;
    await document.publish(user.id, {
      transaction
    });
    await _models.Event.create({
      name: "documents.publish",
      documentId: document.id,
      collectionId: document.collectionId,
      teamId: document.teamId,
      actorId: user.id,
      data: {
        title: document.title
      },
      ip
    }, {
      transaction
    });
  } else if (changed) {
    document.lastModifiedById = user.id;
    await document.save({
      transaction
    });
    await _models.Event.create({
      name: "documents.update",
      documentId: document.id,
      collectionId: document.collectionId,
      teamId: document.teamId,
      actorId: user.id,
      data: {
        title: document.title
      },
      ip
    }, {
      transaction
    });
  }

  if (document.title !== previousTitle) {
    _models.Event.schedule({
      name: "documents.title_change",
      documentId: document.id,
      collectionId: document.collectionId,
      teamId: document.teamId,
      actorId: user.id,
      data: {
        previousTitle,
        title: document.title
      },
      ip
    });
  }

  return document;
}