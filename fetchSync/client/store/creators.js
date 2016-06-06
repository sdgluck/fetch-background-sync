'use strict'

import { ADD_SYNC, ADD_SYNCS, REMOVE_SYNC, REMOVE_ALL_SYNCS, SET_COMMS_OPEN,
  SET_SERVICE_WORKER, Requests } from '/fetchSync/actionTypes'

// ---
// Sync action creators
// ---

export const addSync = (sync) =>
  ({ type: ADD_SYNC, sync })

export const addSyncs = (syncs) =>
  ({ type: ADD_SYNCS, syncs })

export const removeSync = (sync) =>
  ({ type: REMOVE_SYNC, sync })

export const removeAllSyncs = () =>
  ({ type: REMOVE_ALL_SYNCS })

export const setCommsOpen = (open) =>
  ({ type: SET_COMMS_OPEN, open })

export const setServiceWorker = (value) =>
  ({ type: SET_SERVICE_WORKER, value })

// ---
// Async request action creators
// ---

export const requestRegisterSync = (sync) =>
  ({
    type: Requests.REGISTER_SYNC,
    sync: {
      id: sync.id,
      name: sync.name,
      request: sync.request
    }
  })

export const requestCancelSync = (sync) =>
  ({ type: Requests.CANCEL_SYNC, id: sync.id })

export const requestCancelAllSyncs = () =>
  ({ type: Requests.CANCEL_ALL })

export const requestOpenComms = () =>
  ({ type: Requests.OPEN_COMMS })
