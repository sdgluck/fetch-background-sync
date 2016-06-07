'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _actionTypes = require('../actionTypes');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Channel = function () {
  function Channel(worker, messageHandlers) {
    _classCallCheck(this, Channel);

    worker.onmessage = this.onMessageEvent.bind(this);
    this.messageHandlers = messageHandlers;
    this.defaultPort = null;
  }

  _createClass(Channel, [{
    key: 'setDefaultPort',
    value: function setDefaultPort(defaultPort) {
      this.defaultPort = defaultPort;
    }
  }, {
    key: 'postMessage',
    value: function postMessage(data, port) {
      if (port) {
        port.postMessage(JSON.stringify(data));
      } else if (this.defaultPort) {
        this.defaultPort.postMessage(JSON.stringify(data));
      } else {
        throw new Error('No port available');
      }
    }
  }, {
    key: 'handleMessage',
    value: function handleMessage(event) {
      var request = event.data;
      if (request.type in this.messageHandlers) {
        return this.messageHandlers[request.type](event);
      }
      return Promise.reject(new Error('Unknown request type "' + request.type + '"'));
    }
  }, {
    key: 'onMessageEvent',
    value: function onMessageEvent(event) {
      var _this = this;

      return this.handleMessage(event).catch(function (err) {
        return _this.postMessage({
          type: _actionTypes.Responses.FAILURE,
          data: { error: err.message }
        }, event.ports[0]);
      }).then(function (data) {
        return _this.postMessage({
          type: _actionTypes.Responses.SUCCESS,
          data: data
        }, event.ports[0]);
      });
    }
  }]);

  return Channel;
}();

exports.default = Channel;
module.exports = exports['default'];