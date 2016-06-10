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
    response: null
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
 * Start a channel with the worker. Wrapped so that we can delay
 * execution until we know we have a worker that controls the page.
 * @returns {Object}
 */
const openCommsChannel = (worker) => msgr.client(worker, {
  SYNC_RESULT: ({ id, response }) => {
    const sync = syncs.find((syncs) => syncs.id === id)
    if (sync) {
      const realResponse = serialiseResponse.deserialise(response)
      sync.resolve(realResponse)
      if (sync.name) {
        sync.response = realResponse
        sync.syncedOn = Date.now()
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
export default function fetchSync (name, request, options) {
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

  let sync

  return ready.promise
    .then(() => serialiseRequest(new Request(request, options)))
    .then((request) => syncUtil.createFromUserOptions({ name, request, options }))
    .then((s) => { sync = s })
    .then(() => channel.send('REGISTER_SYNC', sync))
    .then(() => syncs.push(sync))
    .then(() => syncUtil.makePublicApi(sync))
}

/**
 * Initialise fetchSync.
 * @param {Object} options
 * @returns {Promise}
*/
fetchSync.init =
function fetchSync_init (options = null) {
  if (hasStartedInit) {
    throw new Error('fetchSync.init() called multiple times')
  } else if (options && !options.url) {
    throw new Error('expecting `url` in options object')
  }

  if (!('serviceWorker' in navigator) || !('SyncManager' in window)) {
    hasBackgroundSyncSupport = false
    return Promise.reject(new Error('environment not supported'))
  }

  hasStartedInit = true

  return register(options)
    .then(openCommsChannel)
    .then((c) => {
      channel = c
      channel.send('GET_SYNCS').then((data) => {
        const syncs = data.map(syncUtil.hydrate)
        syncs.push(...syncs)
        ready.resolve()
      })
    })
    .then(() => ready.promise)
}

/**
 * Get a sync.
 * @param {String} name
 * @returns {Promise}
 */
fetchSync.get =
function fetchSync_get (name) {
  const sync = syncs.find((sync) => sync.name === name)
  return sync ? syncUtil.makePublicApi(sync) : null
}

/**
 * Get all named syncs.
 * @returns {Promise}
 */
fetchSync.getAll =
function fetchSync_getAll () {
  return syncs.filter((sync) => Boolean(sync.name))
    .map(syncUtil.makePublicApi)
}

/**
 * Cancel a sync.
 * @param {Object|String} sync
 * @returns {Promise}
 */
fetchSync.cancel =
function fetchSync_cancel (sync) {
  const syncObj = fetchSync.get(typeof sync === 'object' ? sync.id : sync)
  return syncObj ? syncObj.cancel() : Promise.reject('not found')
}

/**
 * Cancel all syncs.
 * @returns {Promise}
 */
fetchSync.cancelAll =
function fetchSync_cancelAll () {
  return channel.send('CANCEL_ALL_SYNCS')
    .then(() => { syncs = [] })
}

Object.keys(fetchSync).forEach((methodName) => {
  if (methodName !== 'init') {
    const method = fetchSync[methodName].bind(fetchSync)
    fetchSync[methodName] = function (...args) {
      if (!hasStartedInit) {
        throw new Error('initialise first with fetchSync.init()')
      }
      return method(...args)
    }
  }
})
