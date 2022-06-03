"use strict";

require("core-js/modules/es.promise.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("regenerator-runtime/runtime.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.string.link.js");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function findPlaceholderLink(doc, href) {
  var result;

  function findLinks(node) {
    var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    // get text nodes
    if (node.type.name === "text") {
      // get marks for text nodes
      node.marks.forEach(function (mark) {
        // any of the marks links?
        if (mark.type.name === "link") {
          // any of the links to other docs?
          if (mark.attrs.href === href) {
            result = {
              node: node,
              pos: pos
            };
          }
        }
      });
    }

    if (!node.content.size) {
      return;
    }

    node.descendants(findLinks);
  }

  findLinks(doc);
  return result;
}

var createAndInsertLink = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(view, title, href, options) {
    var dispatch, state, onCreateLink, onShowToast, url, result, _result;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dispatch = view.dispatch, state = view.state;
            onCreateLink = options.onCreateLink, onShowToast = options.onShowToast;
            _context.prev = 2;
            _context.next = 5;
            return onCreateLink(title);

          case 5:
            url = _context.sent;
            result = findPlaceholderLink(view.state.doc, href);

            if (result) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return");

          case 9:
            dispatch(view.state.tr.removeMark(result.pos, result.pos + result.node.nodeSize, state.schema.marks.link).addMark(result.pos, result.pos + result.node.nodeSize, state.schema.marks.link.create({
              href: url
            })));
            _context.next = 19;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](2);
            _result = findPlaceholderLink(view.state.doc, href);

            if (_result) {
              _context.next = 17;
              break;
            }

            return _context.abrupt("return");

          case 17:
            dispatch(view.state.tr.removeMark(_result.pos, _result.pos + _result.node.nodeSize, state.schema.marks.link));
            onShowToast(options.dictionary.createLinkError);

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 12]]);
  }));

  return function createAndInsertLink(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var _default = createAndInsertLink;
exports.default = _default;