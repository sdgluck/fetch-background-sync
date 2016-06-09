(function () {
  /* global self:false, require:false, fetch:false, __DEV__:false */

  const msgr = require('msgr')
  const IDBStore = require('idb-wrapper')
  const serialiseRequest = require('serialise-request')
  const serialiseResponse = require('serialise-response')

  const { OPEN_COMMS, REGISTER_SYNC, 
    CANCEL_SYNC, CANCEL_ALL_SYNCS } = require('./Messages')

  const store = new IDBStore({
    dbVersion: 1,
    keyPath: 'id',
    storeName: __DEV__
      ? '$$syncs_' + Date.now()
      : '$$syncs'
  })

  const channel = msgr({
    [OPEN_COMMS]: (event) => {
      channel.setDefaultPort(event.ports[0])
    },
    [REGISTER_SYNC]: ({ data }) => {
      return registerSync(data.sync)
        .then(() => addSync(data.sync))
    },
    [CANCEL_SYNC]: ({ data }) => {
      return new Promise(store.remove.bind(store, data.id))
    },
    [CANCEL_ALL_SYNCS]: () => {
      return new Promise(store.getAll.bind(store)).then((syncs) => {
        const ids = syncs.map((sync) => sync.id)
        return new Promise(store.removeBatch.bind(store, ids))
      })
    }
  })

  function registerSync (sync) {
    return self
      .registration['sync']
      .register(sync.id)
  }

  function addSync (sync) {
    return new Promise(store.put.bind(store, sync)).catch((err) => {
      if (!/key already exists/i.test(err.message)) {
        throw err
      }
    })
  }

  function syncEvent (event) {
    event.waitUntil(
      new Promise(store.get.bind(store, event.tag)).then((sync) => {
        if (!sync) {
          if (event.registration) {
            event.registration.unregister()
          }
          return
        }

        const id = sync.id
        const lastChance = event.lastChance
        const request = serialiseRequest.deserialise(sync.request)

        return fetch(request)
          .then(serialiseResponse)
          .then((response) => {
            const syncedOn = Date.now()

            if (!sync.name) store.remove(id)
            else store.put({ ...sync, response, syncedOn })
            
            channel.postMessage({ id, lastChance, response })
          })
      })
    )
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
