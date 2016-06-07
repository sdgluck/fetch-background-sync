'use strict'

/* global MessageChannel:false */

import defer from 'mini-defer'
import serialiseResponse from 'serialise-response'

import { addSync, addSyncs, removeSync, setCommsOpen, removeAllSyncs, requestOpenComms,
  requestCancelSync, requestRegisterSync, requestCancelAllSyncs } from './creators'

import { CommsChannelStatus } from '../../constants'
import { Responses } from '../../actionTypes'
import store from './index'

export function registerSync (sync) {
  return (dispatch, getState) => {
    const { syncs } = getState()
    const request = requestRegisterSync(sync)

    // We may have already added the sync when the register
    // operation was performed without the comms channel open
    if (!(sync.id in syncs)) {
      dispatch(addSync(sync))
    }

    return postMessage(request)
      .catch(sync.reject)
  }
}

export function cancelAllSyncs () {
  return (dispatch) => {
    dispatch(removeAllSyncs())
    return postMessage(requestCancelAllSyncs())
  }
}

export function cancelSync (sync) {
  return (dispatch) => {
    dispatch(removeSync(sync))
    return postMessage(requestCancelSync(sync))
  }
}

/**
 * Open a MessageChannel that will be used for receiving the results of fetch requests
 * made on behalf of fetchSync operations and other requests by the client.
 */
export function openCommsChannel () {
  return (dispatch, getState) => {
    const { serviceWorker, commsChannel } = getState()

    if (!serviceWorker) {
      return Promise.reject(new Error('No service worker'))
    }

    return new Promise((resolve, reject) => {
      const messageChannel = new MessageChannel()
      let complete = false

      serviceWorker.controller.postMessage(
        requestOpenComms(),
        [messageChannel.port2]
      )

      messageChannel.port1.onmessage = (event) => {
        complete = true

        // First response is to confirm comms channel is
        // open and send all named syncs to the client
        if (commsChannel.status === CommsChannelStatus.CLOSED) {
          dispatch(setCommsOpen(true))
          dispatch(addSyncs(event.data.data || []))
        } else {
          dispatch(receiveFetchResponse(event))
        }

        resolve()
      }

      // Fail after two seconds
      setTimeout(() => {
        if (!complete) {
          dispatch(setCommsOpen(false))
          reject(new Error(
            'Connecting to Worker timed out. ' +
            'See Initialisation documentation.'
          ))
        }
      }, 2000)
    })
  }
}

/**
 * Send a message to the Service Worker. Each message is sent through a new
 * channel and wrapped in a Promise resolving with the first response.
 * @param {Object} data
 * @returns {Promise}
 */
function postMessage (data) {
  const { serviceWorker } = store.getState()
  const { promise, resolve, reject } = defer()
  const messageChannel = new MessageChannel()
  let complete = false

  serviceWorker.postMessage(
    data,
    [messageChannel.port2]
  )

  messageChannel.port1.onmessage = (event) => {
    if (complete) {
      return
    }

    complete = true
    messageChannel.port1.close()
    messageChannel.port2.close()

    if (event.data.error) {
      reject(event.data.error)
      return
    }

    resolve(event.data)
  }

  return promise
}

function receiveFetchResponse (event) {
  return (dispatch, getState) => {
    const { syncs } = getState()
    const { type, data } = JSON.parse(event.data)
    const sync = syncs[data.id]

    if (sync) {
      switch (type) {
        case Responses.SUCCESS:
          handleSyncSuccess(dispatch, sync, data)
          return
        case Responses.FAILURE:
          handleSyncFailure(dispatch, sync, data)
          return
        default:
          throw new Error(`Unknown response type '${type}'`)
      }
    }
  }
}

function handleSyncSuccess (dispatch, sync, data) {
  const response = serialiseResponse.deserialise(data.response)

  sync.resolve(response)

  if (sync.name) {
    sync.response = response
  } else {
    dispatch(removeSync(sync))
  }
}

function handleSyncFailure (dispatch, sync, data) {
  sync.reject(data.error)

  if (sync.name) {
    sync.response = null
  } else {
    dispatch(removeSync(sync))
  }
}
