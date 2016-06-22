/* global require:false, fetch:false, Request:false */

'use strict'

const msgr = require('msgr')
const shortid = require('shortid')
const defer = require('mini-defer')
const register = require('sw-register')
const serialiseRequest = require('serialise-request')
const serialiseResponse = require('serialise-response')

const ready = defer()

let syncs = []
let channel = null
let hasStartedInit = false
let hasBackgroundSyncSupport = true

const syncUtil = {
  _base: {
    id: null,
    name: null,
    createdOn: null,
    syncedOn: null,
    request: null,
    response: null,
    cancelled: false
  },

  _create (obj = {}) {
    return {
      ...syncUtil._base,
      ...obj,
      ...defer()
    }
  },

  createFromUserOptions (obj) {
    return syncUtil._create({
      id: obj.name || shortid.generate(),
      name: obj.name,
      createdOn: Date.now(),
      request: obj.request
    })
  },

  hydrate (obj) {
    const sync = syncUtil._create(obj)
    if (sync.response) {
      sync.response = serialiseResponse.deserialise(sync.response)
      sync.resolve()
    }
    return sync
  },

  makePublicApi (sync) {
    return Object.assign(sync.promise, {
      name: sync.name,
      id: sync.id,
      createdOn: sync.createdOn,
      syncedOn: sync.syncedOn,
      cancel: () => !sync.cancelled && !sync.response
        ? (sync.cancelled = true, channel.send('CANCEL_SYNC', sync.id))
        : Promise.reject(new Error('already cancelled or complete'))
    })
  }
}

/**
 * Start a channel with the worker. Wrapped so we can delay
 * execution until we know we have an activated worker.
 * @param {Object} worker
 * @returns {Object}
 */
const openCommsChannel = (worker) => msgr.client(worker, {
  SYNC_RESULT: ({ id, syncedOn, response }) => {
    const sync = syncs.find((s) => s.id === id)
    if (sync) {
      const realResponse = serialiseResponse.deserialise(response)
      sync.resolve(realResponse)
      if (sync.name) {
        sync.response = realResponse
        sync.syncedOn = syncedOn
      }
    }
  }
})

// ---
// Public
// ---

/**
 * Create a 'sync' operation.
 * @param {String|Request} [name]
 * @param {Object|String|Request} request
 * @param {Object} [options]
 * @returns {Promise}
 */
const _fetchSync = function fetchSync (name, request, options) {
  if (!hasStartedInit) {
    throw new Error('initialise first with fetchSync.init()')
  }

  const isRequestOptionsCall = () => arguments.length === 2 &&
    (typeof arguments[0] === 'string' || arguments[0] instanceof Request) &&
    (typeof arguments[1] === 'object' && !(arguments[1] instanceof Request))

  if (arguments.length === 1) {
    request = name
    name = null
  } else if (isRequestOptionsCall()) {
    options = request
    request = name
    name = null
  }

  if (typeof request !== 'string' && !(request instanceof Request)) {
    throw new Error('expecting request to be a string or Request')
  } else if (options && typeof options !== 'object') {
    throw new Error('expecting options to be an object')
  }

  if (!hasBackgroundSyncSupport) {
    return fetch(request, options)
  }

  let sync = syncs.find((s) => s.id === name)

  if (sync) {
    const err = new Error(`sync operation already exists with name '${name}'`)
    return Promise.reject(err)
  }

  sync = syncUtil.createFromUserOptions({ name, request, options })

  syncs.push(sync)

  ready.promise
    .then(() => serialiseRequest(new Request(request, options)))
    .then((request) => { sync.request = request })
    .then(() => channel.send('REGISTER_SYNC', sync))

  return syncUtil.makePublicApi(sync)
}

export default _fetchSync

/**
 * Initialise fetchSync.
 * @param {Object} options
 * @returns {Promise}
*/
_fetchSync.init = function fetchSync_init (options = null) {
  if (hasStartedInit) {
    throw new Error('fetchSync.init() called multiple times')
  }

  hasStartedInit = true

  if (!('serviceWorker' in navigator) || !('SyncManager' in window)) {
    hasBackgroundSyncSupport = false
    return Promise.reject(new Error('environment not supported'))
  }

  return register(options)
    .then(openCommsChannel)
    .then((c) => { channel = c })
    .then(() => channel.send('GET_SYNCS'))
    .then((data) => syncs.push(...(data || []).map(syncUtil.hydrate)))
    .then(() => { ready.resolve() })
}

/**
 * Get a sync.
 * @param {String} name
 * @returns {Promise}
 */
_fetchSync.get = waitForReady(function fetchSync_get (name) {
  const sync = syncs.find((s) => s.name === name)
  return sync ? syncUtil.makePublicApi(sync) : Promise.reject(new Error('not found'))
})

/**
 * Get all syncs.
 * @returns {Array}
 */
_fetchSync.getAll = waitForReady(function fetchSync_getAll () {
  return syncs.map(syncUtil.makePublicApi)
})

/**
 * Cancel a sync.
 * @param {Object|String} sync
 * @returns {Promise}
 */
_fetchSync.cancel = waitForReady(function fetchSync_cancel (name) {
  const sync = syncs.find((s) => s.name === name)
  return sync ? syncUtil.makePublicApi(sync).cancel() : Promise.reject(new Error('not found'))
})

/**
 * Cancel all syncs.
 * @returns {Promise}
 */
_fetchSync.cancelAll = waitForReady(function fetchSync_cancelAll () {
  return channel.send('CANCEL_ALL_SYNCS')
    .then(() => { syncs = [] })
})

/**
 * Wrap a function to wait for the application to be initialised
 * (comms channel with service worker is open) before executing.
 * @param {Function} method
 * @returns {Function}
 */
function waitForReady (method) {
  return function fetchSync_readyWrapper (...args) {
    if (hasStartedInit) return ready.promise.then(() => method(...args))
    throw new Error('initialise first with fetchSync.init()')
  }
}
