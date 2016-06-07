'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ADD_SYNC = exports.ADD_SYNC = 'ADD_SYNC';
var ADD_SYNCS = exports.ADD_SYNCS = 'ADD_SYNCS';

var REMOVE_SYNC = exports.REMOVE_SYNC = 'REMOVE_SYNC';
var REMOVE_ALL_SYNCS = exports.REMOVE_ALL_SYNCS = 'REMOVE_ALL_SYNCS';

var SET_SERVICE_WORKER = exports.SET_SERVICE_WORKER = 'SET_SERVICE_WORKER';
var SET_COMMS_OPEN = exports.SET_COMMS_OPEN = 'SET_COMMS_OPEN';

var Requests = exports.Requests = {
  OPEN_COMMS: 'OPEN_COMMS',
  REGISTER_SYNC: 'REGISTER_SYNC',
  CANCEL_SYNC: 'CANCEL_SYNC',
  CANCEL_ALL: 'CANCEL_ALL'
};

var Responses = exports.Responses = {
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE'
};