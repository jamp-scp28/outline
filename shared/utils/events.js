"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/web.dom-collections.for-each.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/**
 * A tiny EventEmitter implementation for the browser.
 */
var EventEmitter = /*#__PURE__*/function () {
  function EventEmitter() {
    _classCallCheck(this, EventEmitter);

    this.listeners = {};
    this.on = this.addListener;
    this.off = this.removeListener;
  }

  _createClass(EventEmitter, [{
    key: "addListener",
    value: function addListener(name, callback) {
      if (!this.listeners[name]) {
        this.listeners[name] = [];
      }

      this.listeners[name].push(callback);
    }
  }, {
    key: "removeListener",
    value: function removeListener(name, callback) {
      var _this$listeners$name;

      this.listeners[name] = (_this$listeners$name = this.listeners[name]) === null || _this$listeners$name === void 0 ? void 0 : _this$listeners$name.filter(function (cb) {
        return cb !== callback;
      });
    }
  }, {
    key: "emit",
    value: function emit(name, data) {
      var _this$listeners$name2;

      (_this$listeners$name2 = this.listeners[name]) === null || _this$listeners$name2 === void 0 ? void 0 : _this$listeners$name2.forEach(function (callback) {
        callback(data);
      });
    }
  }]);

  return EventEmitter;
}();

exports.default = EventEmitter;