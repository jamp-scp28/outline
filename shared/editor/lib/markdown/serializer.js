"use strict";

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.from.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkdownSerializerState = exports.MarkdownSerializer = void 0;

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.array.index-of.js");

require("core-js/modules/es.string.match.js");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// https://raw.githubusercontent.com/ProseMirror/prosemirror-markdown/master/src/to_markdown.js
// forked for table support
// ::- A specification for serializing a ProseMirror document as
// Markdown/CommonMark text.
var MarkdownSerializer = /*#__PURE__*/function () {
  // :: (Object<(state: MarkdownSerializerState, node: Node, parent: Node, index: number)>, Object)
  // Construct a serializer with the given configuration. The `nodes`
  // object should map node names in a given schema to function that
  // take a serializer state and such a node, and serialize the node.
  //
  // The `marks` object should hold objects with `open` and `close`
  // properties, which hold the strings that should appear before and
  // after a piece of text marked that way, either directly or as a
  // function that takes a serializer state and a mark, and returns a
  // string. `open` and `close` can also be functions, which will be
  // called as
  //
  //     (state: MarkdownSerializerState, mark: Mark,
  //      parent: Fragment, index: number) → string
  //
  // Where `parent` and `index` allow you to inspect the mark's
  // context to see which nodes it applies to.
  //
  // Mark information objects can also have a `mixable` property
  // which, when `true`, indicates that the order in which the mark's
  // opening and closing syntax appears relative to other mixable
  // marks can be varied. (For example, you can say `**a *b***` and
  // `*a **b***`, but not `` `a *b*` ``.)
  //
  // To disable character escaping in a mark, you can give it an
  // `escape` property of `false`. Such a mark has to have the highest
  // precedence (must always be the innermost mark).
  //
  // The `expelEnclosingWhitespace` mark property causes the
  // serializer to move enclosing whitespace from inside the marks to
  // outside the marks. This is necessary for emphasis marks as
  // CommonMark does not permit enclosing whitespace inside emphasis
  // marks, see: http://spec.commonmark.org/0.26/#example-330
  function MarkdownSerializer(nodes, marks) {
    _classCallCheck(this, MarkdownSerializer);

    // :: Object<(MarkdownSerializerState, Node)> The node serializer
    // functions for this serializer.
    this.nodes = nodes; // :: Object The mark serializer info.

    this.marks = marks;
  } // :: (Node, ?Object) → string
  // Serialize the content of the given node to
  // [CommonMark](http://commonmark.org/).


  _createClass(MarkdownSerializer, [{
    key: "serialize",
    value: function serialize(content, options) {
      var state = new MarkdownSerializerState(this.nodes, this.marks, options);
      state.renderContent(content);
      return state.out;
    }
  }]);

  return MarkdownSerializer;
}(); // ::- This is an object used to track state and expose
// methods related to markdown serialization. Instances are passed to
// node and mark serialization methods (see `toMarkdown`).


exports.MarkdownSerializer = MarkdownSerializer;

var MarkdownSerializerState = /*#__PURE__*/function () {
  function MarkdownSerializerState(nodes, marks, options) {
    _classCallCheck(this, MarkdownSerializerState);

    this.inTable = false;
    this.inTightList = false;
    this.closed = false;
    this.delim = "";
    this.nodes = nodes;
    this.marks = marks;
    this.delim = this.out = "";
    this.closed = false;
    this.inTightList = false;
    this.inTable = false; // :: Object
    // The options passed to the serializer.
    //   tightLists:: ?bool
    //   Whether to render lists in a tight style. This can be overridden
    //   on a node level by specifying a tight attribute on the node.
    //   Defaults to false.

    this.options = options || {};

    if (typeof this.options.tightLists === "undefined") {
      this.options.tightLists = true;
    }
  }

  _createClass(MarkdownSerializerState, [{
    key: "flushClose",
    value: function flushClose(size) {
      if (this.closed) {
        if (!this.atBlank()) {
          this.out += "\n";
        }

        if (size === null || size === undefined) {
          size = 2;
        }

        if (size > 1) {
          var delimMin = this.delim;
          var trim = /\s+$/.exec(delimMin);

          if (trim) {
            delimMin = delimMin.slice(0, delimMin.length - trim[0].length);
          }

          for (var i = 1; i < size; i++) {
            this.out += delimMin + "\n";
          }
        }

        this.closed = false;
      }
    } // :: (string, ?string, Node, ())
    // Render a block, prefixing each line with `delim`, and the first
    // line in `firstDelim`. `node` should be the node that is closed at
    // the end of the block, and `f` is a function that renders the
    // content of the block.

  }, {
    key: "wrapBlock",
    value: function wrapBlock(delim, firstDelim, node, f) {
      var old = this.delim;
      this.write(firstDelim || delim);
      this.delim += delim;
      f();
      this.delim = old;
      this.closeBlock(node);
    }
  }, {
    key: "atBlank",
    value: function atBlank() {
      return /(^|\n)$/.test(this.out);
    } // :: ()
    // Ensure the current content ends with a newline.

  }, {
    key: "ensureNewLine",
    value: function ensureNewLine() {
      if (!this.atBlank()) {
        this.out += "\n";
      }
    } // :: (?string)
    // Prepare the state for writing output (closing closed paragraphs,
    // adding delimiters, and so on), and then optionally add content
    // (unescaped) to the output.

  }, {
    key: "write",
    value: function write(content) {
      this.flushClose();

      if (this.delim && this.atBlank()) {
        this.out += this.delim;
      }

      if (content) {
        this.out += content;
      }
    } // :: (Node)
    // Close the block for the given node.

  }, {
    key: "closeBlock",
    value: function closeBlock(node) {
      this.closed = node;
    } // :: (string, ?bool)
    // Add the given text to the document. When escape is not `false`,
    // it will be escaped.

  }, {
    key: "text",
    value: function text(_text, escape) {
      var lines = _text.split("\n");

      for (var i = 0; i < lines.length; i++) {
        var startOfLine = this.atBlank() || this.closed;
        this.write();
        this.out += escape !== false ? this.esc(lines[i], startOfLine) : lines[i];

        if (i !== lines.length - 1) {
          this.out += "\n";
        }
      }
    } // :: (Node)
    // Render the given node as a block.

  }, {
    key: "render",
    value: function render(node, parent, index) {
      if (typeof parent === "number") {
        throw new Error("!");
      }

      this.nodes[node.type.name](this, node, parent, index);
    } // :: (Node)
    // Render the contents of `parent` as block nodes.

  }, {
    key: "renderContent",
    value: function renderContent(parent) {
      var _this = this;

      parent.forEach(function (node, _, i) {
        return _this.render(node, parent, i);
      });
    } // :: (Node)
    // Render the contents of `parent` as inline content.

  }, {
    key: "renderInline",
    value: function renderInline(parent) {
      var _this2 = this;

      var active = [];
      var trailing = "";

      var progress = function progress(node, _, index) {
        var marks = node ? node.marks : []; // Remove marks from `hard_break` that are the last node inside
        // that mark to prevent parser edge cases with new lines just
        // before closing marks.
        // (FIXME it'd be nice if we had a schema-agnostic way to
        // identify nodes that serialize as hard breaks)

        if (node && node.type.name === "hard_break") {
          marks = marks.filter(function (m) {
            if (index + 1 === parent.childCount) {
              return false;
            }

            var next = parent.child(index + 1);
            return m.isInSet(next.marks) && (!next.isText || /\S/.test(next.text));
          });
        }

        var leading = trailing;
        trailing = ""; // If whitespace has to be expelled from the node, adjust
        // leading and trailing accordingly.

        if (node && node.isText && marks.some(function (mark) {
          var info = _this2.marks[mark.type.name]();

          return info && info.expelEnclosingWhitespace;
        })) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
          var _$exec = /^(\s*)(.*?)(\s*)$/m.exec(node.text),
              _$exec2 = _slicedToArray(_$exec, 4),
              _2 = _$exec2[0],
              lead = _$exec2[1],
              _inner = _$exec2[2],
              trail = _$exec2[3];

          leading += lead;
          trailing = trail;

          if (lead || trail) {
            node = _inner ? node.withText(_inner) : null;

            if (!node) {
              marks = active;
            }
          }
        }

        var inner = marks.length && marks[marks.length - 1],
            noEsc = inner && _this2.marks[inner.type.name]().escape === false;
        var len = marks.length - (noEsc ? 1 : 0); // Try to reorder 'mixable' marks, such as em and strong, which
        // in Markdown may be opened and closed in different order, so
        // that order of the marks for the token matches the order in
        // active.

        outer: for (var i = 0; i < len; i++) {
          var mark = marks[i];

          if (!_this2.marks[mark.type.name]().mixable) {
            break;
          }

          for (var j = 0; j < active.length; j++) {
            var other = active[j];

            if (!_this2.marks[other.type.name]().mixable) {
              break;
            }

            if (mark.eq(other)) {
              if (i > j) {
                marks = marks.slice(0, j).concat(mark).concat(marks.slice(j, i)).concat(marks.slice(i + 1, len));
              } else if (j > i) {
                marks = marks.slice(0, i).concat(marks.slice(i + 1, j)).concat(mark).concat(marks.slice(j, len));
              }

              continue outer;
            }
          }
        } // Find the prefix of the mark set that didn't change


        var keep = 0;

        while (keep < Math.min(active.length, len) && marks[keep].eq(active[keep])) {
          ++keep;
        } // Close the marks that need to be closed


        while (keep < active.length) {
          _this2.text(_this2.markString(active.pop(), false, parent, index), false);
        } // Output any previously expelled trailing whitespace outside the marks


        if (leading) {
          _this2.text(leading);
        } // Open the marks that need to be opened


        if (node) {
          while (active.length < len) {
            var add = marks[active.length];
            active.push(add);

            _this2.text(_this2.markString(add, true, parent, index), false);
          } // Render the node. Special case code marks, since their content
          // may not be escaped.


          if (noEsc && node.isText) {
            _this2.text(_this2.markString(inner, true, parent, index) + node.text + _this2.markString(inner, false, parent, index + 1), false);
          } else {
            _this2.render(node, parent, index);
          }
        }
      };

      parent.forEach(progress);
      progress(null, null, parent.childCount);
    } // :: (Node, string, (number) → string)
    // Render a node's content as a list. `delim` should be the extra
    // indentation added to all lines except the first in an item,
    // `firstDelim` is a function going from an item index to a
    // delimiter for the first line of the item.

  }, {
    key: "renderList",
    value: function renderList(node, delim, firstDelim) {
      var _this3 = this;

      if (this.closed && this.closed.type === node.type) {
        this.flushClose(3);
      } else if (this.inTightList) {
        this.flushClose(1);
      }

      var isTight = typeof node.attrs.tight !== "undefined" ? node.attrs.tight : this.options.tightLists;
      var prevTight = this.inTightList;
      var prevList = this.inList;
      this.inList = true;
      this.inTightList = isTight;
      node.forEach(function (child, _, i) {
        if (i && isTight) {
          _this3.flushClose(1);
        }

        _this3.wrapBlock(delim, firstDelim(i), node, function () {
          return _this3.render(child, node, i);
        });
      });
      this.inList = prevList;
      this.inTightList = prevTight;
    }
  }, {
    key: "renderTable",
    value: function renderTable(node) {
      var _this4 = this;

      this.flushClose(1);
      var headerBuffer = "";
      var prevTable = this.inTable;
      this.inTable = true; // ensure there is an empty newline above all tables

      this.out += "\n"; // rows

      node.forEach(function (row, _, i) {
        // cols
        row.forEach(function (cell, _, j) {
          _this4.out += j === 0 ? "| " : " | ";
          cell.forEach(function (para) {
            // just padding the output so that empty cells take up the same space
            // as headings.
            // TODO: Ideally we'd calc the longest cell length and use that
            // to pad all the others.
            if (para.textContent === "" && para.content.size === 0) {
              _this4.out += "  ";
            } else {
              _this4.closed = false;

              _this4.render(para, row, j);
            }
          });

          if (i === 0) {
            if (cell.attrs.alignment === "center") {
              headerBuffer += "|:---:";
            } else if (cell.attrs.alignment === "left") {
              headerBuffer += "|:---";
            } else if (cell.attrs.alignment === "right") {
              headerBuffer += "|---:";
            } else {
              headerBuffer += "|----";
            }
          }
        });
        _this4.out += " |\n";

        if (headerBuffer) {
          _this4.out += "".concat(headerBuffer, "|\n");
          headerBuffer = undefined;
        }
      });
      this.inTable = prevTable;
    } // :: (string, ?bool) → string
    // Escape the given string so that it can safely appear in Markdown
    // content. If `startOfLine` is true, also escape characters that
    // has special meaning only at the start of the line.

  }, {
    key: "esc",
    value: function esc() {
      var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      var startOfLine = arguments.length > 1 ? arguments[1] : undefined;
      str = str.replace(/[`*\\~[\]]/g, "\\$&");

      if (startOfLine) {
        str = str.replace(/^[:#\-*+]/, "\\$&").replace(/^(\d+)\./, "$1\\.");
      }

      if (this.inTable) {
        str = str.replace(/\|/gi, "\\$&");
      }

      return str;
    }
  }, {
    key: "quote",
    value: function quote(str) {
      var wrap = str.indexOf('"') === -1 ? '""' : str.indexOf("'") === -1 ? "''" : "()";
      return wrap[0] + str + wrap[1];
    } // :: (string, number) → string
    // Repeat the given string `n` times.

  }, {
    key: "repeat",
    value: function repeat(str, n) {
      var out = "";

      for (var i = 0; i < n; i++) {
        out += str;
      }

      return out;
    } // : (Mark, bool, string?) → string
    // Get the markdown string for a given opening or closing mark.

  }, {
    key: "markString",
    value: function markString(mark, open, parent, index) {
      var info = this.marks[mark.type.name]();
      var value = open ? info.open : info.close;
      return typeof value === "string" ? value : value(this, mark, parent, index);
    } // :: (string) → { leading: ?string, trailing: ?string }
    // Get leading and trailing whitespace from a string. Values of
    // leading or trailing property of the return object will be undefined
    // if there is no match.

  }, {
    key: "getEnclosingWhitespace",
    value: function getEnclosingWhitespace(text) {
      return {
        leading: (text.match(/^(\s+)/) || [])[0],
        trailing: (text.match(/(\s+)$/) || [])[0]
      };
    }
  }]);

  return MarkdownSerializerState;
}();

exports.MarkdownSerializerState = MarkdownSerializerState;