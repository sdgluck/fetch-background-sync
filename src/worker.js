(function () {
  /* global self:false, require:false, fetch:false */

  'use strict'

  const msgr = require('msgr')
  const IDBStore = require('idb-wrapper')
  const serialiseRequest = require('serialise-request')
  const serialiseResponse = require('serialise-response')

  const store = new IDBStore({
    dbVersion: 1,
    keyPath: 'id',
    storePrefix: 'fetchSyncs/',
    storeName: 'syncs'
  })

  const channel = msgr.worker({
    // On get syncs, respond with all operations in the store
    GET_SYNCS: (_, respond) => {
      pify(store.getAll)()
        .then(...responders(respond))
    },
    // On register, register a sync with worker and then add to store
    REGISTER_SYNC: (sync, respond) => {
      registerSync(sync)
        .then(() => addSync(sync))
        .then(...responders(respond))
    },
    // On cancel, remove the sync from store
    CANCEL_SYNC: (id, respond) => {
      pify(store.remove)(id)
        .then(...responders(respond))
    },
    // On cancel all, remove all syncs from store
    CANCEL_ALL_SYNCS: (_, respond) => {
      pify(store.getAll)()
        .then((syncs) => syncs.map((sync) => sync.id))
        .then((ids) => pify(store.removeBatch)(ids))
        .then(...responders(respond))
    }
  })

  function pify (method) {
    return (...args) => new Promise(method.bind(store, ...args))
  }

  function responders (respond) {
    return [respond, (e) => respond({ error: e.message })]
  }

  function registerSync (sync) {
    return self
      .registration['sync']
      .register(sync.id)
  }

  function addSync (sync) {
    return pify(store.put)(sync).then(null, (err) => {
      if (!/key already exists/.test(err.message)) {
        throw err
      }
    })
  }

  function syncEvent (event) {
    event.waitUntil(pify(store.get)(event.tag).then((sync) => {
      if (!sync) {
        event.registration && event.registration.unregister()
        store.remove(event.tag)
        return
      }

      const id = sync.id
      const syncedOn = Date.now()

      return fetch(serialiseRequest.deserialise(sync.request))
        .then(serialiseResponse)
        .then((response) => {
          const updatedSync = { ...sync, response, syncedOn }
          channel.send('SYNC_RESULT', { id, syncedOn, response })
          if (!updatedSync.name) store.remove(id)
          else store.put(updatedSync)
        })
    }))
  }

  // The 'sync' event fires when connectivity is
  // restored or already available to the UA.
  self.addEventListener('sync', syncEvent)

  // The 'activate' event is fired when the service worker becomes operational.
  // For example, after a refresh after install, or after all pages using
  // the older version of the worker have closed after upgrade of the worker.
  self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()))

  // The 'install' event is fired when the service worker has been installed.
  // This does not mean that the service worker is operating, as the UA will wait
  // for all pages to close that are using older versions of the worker.
  self.addEventListener('install', (event) => event.waitUntil(self.skipWaiting()))
})()
