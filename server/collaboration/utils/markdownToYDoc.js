"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = markdownToYDoc;

var _yProsemirror = require("@getoutline/y-prosemirror");

var _prosemirrorModel = require("prosemirror-model");

var _embeds = _interopRequireDefault(require("./../../../shared/editor/embeds"));

var _editor = require("./../../editor");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function markdownToYDoc(markdown, fieldName = "default") {
  let node = _editor.parser.parse(markdown); // in the editor embeds were created at runtime by converting links
  // into embeds where they match. Because we're converting to a CRDT structure
  // on the server we need to mimic this behavior.


  function urlsToEmbeds(node) {
    if (node.type.name === "paragraph") {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'content' does not exist on type 'Fragmen... Remove this comment to see the full error message
      for (const textNode of node.content.content) {
        for (const embed of _embeds.default) {
          if (textNode.text && embed.matcher(textNode.text)) {
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'ProsemirrorNode<Schema<never, never>> | null... Remove this comment to see the full error message
            return _editor.schema.nodes.embed.createAndFill({
              href: textNode.text
            });
          }
        }
      }
    }

    if (node.content) {
      const contentAsArray = // @ts-expect-error ts-migrate(2339) FIXME: Property 'content' does not exist on type 'Fragmen... Remove this comment to see the full error message
      node.content instanceof _prosemirrorModel.Fragment ? node.content.content : node.content;
      node.content = _prosemirrorModel.Fragment.fromArray(contentAsArray.map(urlsToEmbeds));
    }

    return node;
  }

  node = urlsToEmbeds(node);
  return (0, _yProsemirror.prosemirrorToYDoc)(node, fieldName);
}