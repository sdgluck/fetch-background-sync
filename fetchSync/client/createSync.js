'use strict'

import defer from 'mini-defer'

import store from './store'
import { SyncIdPrefix } from '../constants'
import { cancelSync } from './store/requests'

export default function createSync (name, request, options = {}) {
  let sync = syncInitialObject()

  // Assign private properties
  Object.assign(sync, {
    name,
    request,
    options,
    id: uId(),
    createdOn: Date.now(),
    syncedOn: null,
    response: null
  })

  // Assign properties to the Promise so that
  // they will be available to the consumer
  Object.assign(sync.promise, {
    name,
    id: sync.id,
    createdOn: sync.createdOn,
    syncedOn: sync.syncedOn
  })

  // Assign methods to the Promise
  Object.assign(sync.promise, {
    getResponse () {
      return sync.response
    },
    cancel () {
      if (!sync.cancelled) {
        sync.cancelled = true
        return store.dispatch(cancelSync(this))
      }
      return Promise.reject(new Error('Sync already cancelled'))
    },
    toString () {
      const nameString = this.name ? ` name='${this.name}'` : ''
      return `[fetchSync ${nameString}]`
    }
  })

  return sync
}

function syncInitialObject () {
  const deferred = defer()

  return {
    promise: deferred.promise,
    resolve: deferred.resolve,
    reject: deferred.reject
  }
}

function uId () {
  const { syncs } = store.getState()
  let name = SyncIdPrefix + Date.now()
  while (name in syncs) name = name + 1
  return name
}
