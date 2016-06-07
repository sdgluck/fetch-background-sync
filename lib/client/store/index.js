'use strict';

/* global __DEV__:false */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _miniDefer = require('mini-defer');

var _miniDefer2 = _interopRequireDefault(_miniDefer);

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reduxLogger = require('redux-logger');

var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

var _redux = require('redux');

var _actionTypes = require('../../actionTypes');

var _constants = require('../../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var middlewares = [_reduxThunk2.default];

if (__DEV__) {
  middlewares.push((0, _reduxLogger2.default)({ collapsed: true }));
}

exports.default = (0, _redux.createStore)((0, _redux.combineReducers)({ serviceWorker: serviceWorker, commsChannel: commsChannel, syncs: syncs }), _redux.applyMiddleware.apply(undefined, middlewares));


function serviceWorker() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
  var action = arguments[1];

  return action.type === _actionTypes.SET_SERVICE_WORKER ? action.value : state;
}

function commsChannel() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? _extends({
    status: _constants.CommsChannelStatus.CLOSED
  }, (0, _miniDefer2.default)()) : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case _actionTypes.SET_COMMS_OPEN:
      if (!action.open) {
        state.reject();
        return state;
      }
      state.resolve();
      state.status = _constants.CommsChannelStatus.OPEN;
      return state;
    default:
      return state;
  }
}

function syncs() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case _actionTypes.ADD_SYNC:
      state = Object.assign({}, state);
      state[action.sync.id] = action.sync;
      return state;
    case _actionTypes.ADD_SYNCS:
      return Object.assign({}, state, action.syncs);
    case _actionTypes.REMOVE_SYNC:
      delete state[action.sync.id];
      return Object.assign({}, state);
    case _actionTypes.REMOVE_ALL_SYNCS:
      return {};
    default:
      return state;
  }
}
module.exports = exports['default'];