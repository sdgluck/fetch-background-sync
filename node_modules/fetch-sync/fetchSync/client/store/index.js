'use strict'

/* global __DEV__:false */

import defer from 'mini-defer'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware, combineReducers } from 'redux'

import { SET_COMMS_OPEN, SET_SERVICE_WORKER, ADD_SYNC,
  ADD_SYNCS, REMOVE_SYNC, REMOVE_ALL_SYNCS } from '/fetchSync/actionTypes'

import { CommsChannelStatus } from '/fetchSync/constants'

const middlewares = [thunk]

if (__DEV__) {
  middlewares.push(createLogger({ collapsed: true }))
}

export default createStore(
  combineReducers({ serviceWorker, commsChannel, syncs }),
  applyMiddleware(...middlewares)
)

function serviceWorker (state = null, action) {
  return action.type === SET_SERVICE_WORKER
    ? action.value
    : state
}

function commsChannel (state = {
  status: CommsChannelStatus.CLOSED,
  ...defer()
}, action) {
  switch (action.type) {
    case SET_COMMS_OPEN:
      if (!action.open) {
        state.reject()
        return state
      }
      state.resolve()
      state.status = CommsChannelStatus.OPEN
      return state
    default:
      return state
  }
}

function syncs (state = {}, action) {
  switch (action.type) {
    case ADD_SYNC:
      state = Object.assign({}, state)
      state[action.sync.id] = action.sync
      return state
    case ADD_SYNCS:
      return Object.assign({}, state, action.syncs)
    case REMOVE_SYNC:
      delete state[action.sync.id]
      return Object.assign({}, state)
    case REMOVE_ALL_SYNCS:
      return {}
    default:
      return state
  }
}
