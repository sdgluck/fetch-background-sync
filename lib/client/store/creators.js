'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestOpenComms = exports.requestCancelAllSyncs = exports.requestCancelSync = exports.requestRegisterSync = exports.setServiceWorker = exports.setCommsOpen = exports.removeAllSyncs = exports.removeSync = exports.addSyncs = exports.addSync = undefined;

var _actionTypes = require('../../actionTypes');

// ---
// Sync action creators
// ---

var addSync = exports.addSync = function addSync(sync) {
  return { type: _actionTypes.ADD_SYNC, sync: sync };
};

var addSyncs = exports.addSyncs = function addSyncs(syncs) {
  return { type: _actionTypes.ADD_SYNCS, syncs: syncs };
};

var removeSync = exports.removeSync = function removeSync(sync) {
  return { type: _actionTypes.REMOVE_SYNC, sync: sync };
};

var removeAllSyncs = exports.removeAllSyncs = function removeAllSyncs() {
  return { type: _actionTypes.REMOVE_ALL_SYNCS };
};

var setCommsOpen = exports.setCommsOpen = function setCommsOpen(open) {
  return { type: _actionTypes.SET_COMMS_OPEN, open: open };
};

var setServiceWorker = exports.setServiceWorker = function setServiceWorker(value) {
  return { type: _actionTypes.SET_SERVICE_WORKER, value: value };
};

// ---
// Async request action creators
// ---

var requestRegisterSync = exports.requestRegisterSync = function requestRegisterSync(sync) {
  return {
    type: _actionTypes.Requests.REGISTER_SYNC,
    sync: {
      id: sync.id,
      name: sync.name,
      request: sync.request
    }
  };
};

var requestCancelSync = exports.requestCancelSync = function requestCancelSync(sync) {
  return { type: _actionTypes.Requests.CANCEL_SYNC, id: sync.id };
};

var requestCancelAllSyncs = exports.requestCancelAllSyncs = function requestCancelAllSyncs() {
  return { type: _actionTypes.Requests.CANCEL_ALL };
};

var requestOpenComms = exports.requestOpenComms = function requestOpenComms() {
  return { type: _actionTypes.Requests.OPEN_COMMS };
};