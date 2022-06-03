"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = chainTransactions;

require("core-js/modules/es.array.reduce.js");

require("core-js/modules/es.object.to-string.js");

function chainTransactions() {
  for (var _len = arguments.length, commands = new Array(_len), _key = 0; _key < _len; _key++) {
    commands[_key] = arguments[_key];
  }

  return function (state, dispatch) {
    var dispatcher = function dispatcher(tr) {
      state = state.apply(tr);
      dispatch === null || dispatch === void 0 ? void 0 : dispatch(tr);
    };

    var last = commands.pop();
    var reduced = commands.reduce(function (result, command) {
      return result || command(state, dispatcher);
    }, false);
    return reduced && last !== undefined && last(state, dispatch);
  };
}