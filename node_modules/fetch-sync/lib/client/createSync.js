'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createSync;

var _miniDefer = require('mini-defer');

var _miniDefer2 = _interopRequireDefault(_miniDefer);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _constants = require('../constants');

var _requests = require('./store/requests');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createSync(name, request) {
  var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  var sync = syncInitialObject();

  // Assign private properties
  Object.assign(sync, {
    name: name,
    request: request,
    options: options,
    id: uId(),
    createdOn: Date.now(),
    syncedOn: null,
    response: null
  });

  // Assign properties to the Promise so that
  // they will be available to the consumer
  Object.assign(sync.promise, {
    name: name,
    id: sync.id,
    createdOn: sync.createdOn,
    syncedOn: sync.syncedOn
  });

  // Assign methods to the Promise
  Object.assign(sync.promise, {
    getResponse: function getResponse() {
      return sync.response;
    },
    cancel: function cancel() {
      if (!sync.cancelled) {
        sync.cancelled = true;
        return _store2.default.dispatch((0, _requests.cancelSync)(this));
      }
      return Promise.reject(new Error('Sync already cancelled'));
    },
    toString: function toString() {
      var nameString = this.name ? ' name=\'' + this.name + '\'' : '';
      return '[fetchSync ' + nameString + ']';
    }
  });

  return sync;
}

function syncInitialObject() {
  var deferred = (0, _miniDefer2.default)();

  return {
    promise: deferred.promise,
    resolve: deferred.resolve,
    reject: deferred.reject
  };
}

function uId() {
  var _store$getState = _store2.default.getState();

  var syncs = _store$getState.syncs;

  var name = _constants.SyncIdPrefix + Date.now();
  while (name in syncs) {
    name = name + 1;
  }return name;
}
module.exports = exports['default'];