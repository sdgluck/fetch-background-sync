'use strict'

/* global
  fetchSync:false, Request:false, catchAndMatch:false,
  describe:false, it:false, before:false, chai:false */

const assert = chai.assert
const expect = chai.expect

const fetchSyncOptions = {
  forceUpdate: true,
  url: '/dist/fetch-sync.sw.js',
  scope: 'http://localhost:8000/'
}

describe('pre-init', () => {
  const methods = [fetchSync, fetchSync.cancel, fetchSync.cancelAll]

  it('fetchSync and cancel methods should throw if called', () => {
    return Promise.all(methods.map((method) => {
      return catchAndMatch(method, 'initialise first with fetchSync.init()')
    }))
  })
})

describe('fetchSync.init()', () => {
  it('should return a Promise', () => {
    expect(fetchSync.init(fetchSyncOptions)).to.be.an.instanceof(Promise)
  })

  it('should throw if called multiple times', () => {
    return catchAndMatch(fetchSync.init, 'fetchSync.init() called multiple times')
  })
})

describe('fetchSync()', () => {
  before(() => fetchSync.cancelAll())

  it('should throw without a first argument', () => {
    return catchAndMatch(fetchSync, 'expecting request to be a string or Request')
  })

  it('should return a Promise', () => {
    expect(fetchSync('/get/1')).to.be.an.instanceof(Promise)
  })

  it('should do GET with string URL', () => {
    return fetchSync('/get/1')
      .then((response) => response.json())
      .then((json) => {
        assert.equal(json.test, 1)
      })
  })

  it('should do GET with Request URL', () => {
    return fetchSync(new Request('/get/2'))
      .then((response) => response.json())
      .then((json) => {
        assert.equal(json.test, 2)
      })
  })

  it('should do named GET with string URL', () => {
    return fetchSync('MyFirstNamedSync', new Request('/get/3'))
      .then((response) => response.json())
      .then((json) => {
        assert.equal(json.test, 3)
      })
  })

  it('should do POST with string URL', () => {
    return fetchSync('/post/4', { method: 'POST' })
      .then((response) => response.json())
      .then((json) => {
        assert.equal(json.test, 4)
      })
  })
})

describe('fetchSync.get()', () => {
  before(() => fetchSync('MySecondNamedSync', '/get/5'))

  it('should return a Promise', () => {
    expect(fetchSync.get('123').catch(() => {})).to.be.an.instanceof(Promise)
  })

  it('should reject for unknown named operation', () => {
    return catchAndMatch(() => fetchSync.get('123'), 'not found')
  })

  it('should resolve to promise for known named operation', () => {
    return fetchSync.get('MySecondNamedSync')
      .then((response) => response.json())
      .then((json) => {
        assert.equal(json.test, 5)
      })
  })
})

describe('fetchSync.getAll()', () => {
  before(() => {
    return fetchSync.cancelAll()
      .then(() => fetchSync('/get/1'))
      .then(() => fetchSync('named', '/get/2'))
  })

  it('should return the correct number of sync operations', () => {
    return fetchSync.getAll().then((syncs) => {
      assert.equal(syncs.length, 2)
    })
  })

  it('should return named and unnamed sync operations', () => {
    return fetchSync.getAll().then((syncs) => {
      assert.equal(syncs[0].name, null)
      assert.equal(syncs[1].name, 'named')
    })
  })
})

describe('fetchSync.cancel()', () => {
  let sync

  it('should return a Promise', () => {
    expect(fetchSync.cancel('123').catch(() => {})).to.be.an.instanceof(Promise)
  })

  it('should cancel a sync operation', () => {
    sync = fetchSync('cancelMe1', '/get/1')
    return fetchSync.cancel('cancelMe1')
  })

  it('should throw when attempting to cancel again', () => {
    return catchAndMatch(sync.cancel, 'already cancelled or complete')
  })
})

describe('fetchSync.cancelAll()', () => {
  let sync

  before(() => sync = fetchSync('cancelMe2', '/get/1'))

  it('should return a Promise', () => {
    expect(fetchSync.cancelAll()).to.be.an.instanceof(Promise)
  })

  it('should cancel all sync operations', () => {
    return fetchSync.cancelAll()
      .then(() => fetchSync.getAll())
      .then((syncs) => {
        assert.equal(syncs.length, 0)
        return catchAndMatch(sync.cancel, 'already cancelled or complete')
      })
  })
})

describe('Sync API', () => {
  const props = ['id', 'name', 'syncedOn', 'createdOn']

  let sync1

  before(() => fetchSync('cancelMe3', '/get/2'))

  it('should cancel the sync operation', () => {
    return (sync1 = fetchSync('/get/1')).cancel()
  })

  it('should throw if attempting to cancel for a second time', () => {
    return catchAndMatch(sync1.cancel, 'already cancelled or complete')
  })

  it('should throw if cancelling a completed sync operation', () => {
    return catchAndMatch(() => fetchSync.cancel('cancelMe3'), 'already cancelled or complete')
  })

  it(`should have public '${props.join(`', '`)}' properties`, () => {
    props.forEach((prop) => {
      if (typeof sync1[prop] === 'undefined') {
        throw new Error(`no '${prop}' property`)
      }
    })
  })
})
