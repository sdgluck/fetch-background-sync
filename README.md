# Fetch Sync

> A handy wrapper for the [Background Sync API](https://github.com/WICG/BackgroundSync/blob/master/explainer.md)

Made with ❤ at [@outlandish](http://www.twitter.com/outlandish)

<a href="http://badge.fury.io/js/fetch-sync"><img alt="npm version" src="https://badge.fury.io/js/fetch-sync.svg"></a>
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Fetch Sync allows you to proxy fetch requests through the
[Background Sync API](https://github.com/WICG/BackgroundSync/blob/master/explainer.md).

## Install

    npm install fetch-sync --save

## Table of Contents

- [Requirements](#requirements)
- [Support](#support)
- __[Features](#features)__
- __[Initialisation](#initialisation)__
- __[Usage](#client-api)__
- [Todo](#todo)
- [Test](#test)
- [Development](#development)
- [Contributing](#contributing)
- [Author & License](author--license)

## Requirements

The library utilises some experimental/new technologies so is currently only operational in the latest versions of
[Chrome Canary](https://www.google.co.uk/chrome/browser/canary.html) with the `experimental-web-platform-features`
flag enabled. As experimental technologies are prone to change, so is this library! (Though I hope the API can remain
the same.)

- [Background Sync](https://github.com/WICG/BackgroundSync/blob/master/explainer.md)
- [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [Promise] (https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise)

## Support

Chrome Canary | Chrome | Firefox | IE | Opera | Safari
:------------:|:------:|:-------:|:--:|:-----:|:-----:
✔            |✘       |✘       |✘   |✘     |✘

## Features

- Register a Background Sync operation with one call to `fetchSync()`.

- Shares exactly the same API as `fetch`. Accepts a Request or String, and returns the Promise of a Response.

- Manage sync operations with `fetchSync.{get,getAll,cancel,cancelAll}()`.

- Named sync operations have their response stored within an IndexedDB store.

## Usage

### `fetchSync.init([options]) : Promise`

Initialise fetchSync.

- __options__ {Object} options object

        options {
          // The URL of the fetchSync worker script.
          workerUrl {String} (required, default: null)

          // The options object to pass to the worker registration function.
          workerOptions {Object} (optional, default: null)

          // Force the worker registration to update the worker script.
          forceUpdate {Boolean} (optional, default: false)
        }

Example:

        // Import client lib...

        // ES6
        import fetchSync from 'fetch-sync'

        // ES5
        var fetchSync = require('fetch-sync')

        // Script
        <script src="/node_modules/fetch-sync/dist/fetch-sync.min.js"></script>

        // Initialise, passing in worker lib...

        fetchSync.init({
          workerUrl: '/node_modules/fetch-sync/dist/fetch-sync.sw.js',
          workerOptions: {
            scope: '<website address>' // e.g. 'http://localhost:8000'
          }
        })

<p>______</p>

### `fetchSync.sync([name, ]request[, options]) : Promise<Response>`

Perform a [`sync`](https://github.com/WICG/BackgroundSync/blob/master/explainer.md#one-off-synchronization) Background Sync operation.

- [__name__] {String} _(optional)_ name of the sync operation
- __request__ {String|Request} URL or an instance of fetch Request
- [__options__] {Object} _(optional)_ [fetch options](https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch) object

Returns a Promise that resolves on success of the fetch request. If called with a `name` the response can be retrieved
at a later date (e.g. when the user leaves and returns to the application). Without a name, the fetch request will be
performed as usual but the response will be discarded and not made available after the session in which it was declared.

Examples:

- named GET

        // Equivalent to `fetchSync.sync()`
        fetchSync('GetMessages', '/messages')

- unnamed POST

        fetchSync.sync('/update-profile', {
          method: 'POST',
          body: { name: '' }
        })

- named with options

        fetchSync('/send-message', {
          body: 'Hello!'
        })

- unnamed with Request

        fetchSync.sync(
          new Request('/messages')
        )

<p>______</p>

### `fetchSync.get(name) : Promise`

Get a sync by its name.

- __name__ {String} name of the sync operation to get

<p>______</p>

### `fetchSync.getAll() : Array<Promise>`

Get all sync operations.

Returns an array of all sync operations (named and unnamed).

<p>______</p>

### `fetchSync.cancel(name) : Promise`

Cancel the sync with the given `name`.

- __name__ {String} name of the sync operation to cancel

<p>______</p>

### `fetchSync.cancelAll() : Promise`

Cancel all syncs, named and unnamed.

## Example

    import fetchSync from 'fetch-sync'

    // Initialise the library...

    fetchSync.init({
      workerUrl: 'fetch-sync.sw.js',
      workerOptions: {
        scope: 'http://localhost:8000'
      }
    })

    /**
     * Save important work using a `sync` operation
     * to ensure request gets made now or later if
     * UA has lost connectivity.
     */
    function saveImportantWork () {
      return fetchSync('/important-work', {
        body: 'so important',
        method: 'POST'
      }).then((response) => {
        console.log('Status ' + response.statusText)
      })
    }

Then, [sometime later :alarm_clock:](https://www.youtube.com/watch?v=K9yuDdCyQhs)...

    // UA loses connectivity

    saveImportantWork()

    // UA regains connectivity

    // Console
    // > OK
    // > Their work was saved!

## Todo

- [WIP] Add support for periodicSync operations.
(See the [`periodic-sync-support`](https://github.com/sdgluck/fetch-sync/tree/periodic-sync-support) branch.)
- Reduce size of library by dropping some dependencies, e.g. is using Redux overkill?
- Implement some way of integrating into existing service worker infrastructures.
Maybe using [service-worker-ware](https://github.com/fxos-components/serviceworkerware)?

## Test

As the library depends on Service Workers and no headless browser has (good enough) support for Service Workers
that would allow tests to be executed within the console, tests are ran through the browser using
[Mocha](https://github.com/mochajs/mocha) and [Chai](https://github.com/chaijs/chai).

On running `npm test` an Express server will be started at `localhost:8000`.

Run the tests:

    $ cd fetch-sync
    $ npm test

## Development

The library is bundled by [Webpack](https://github.com/webpack/webpack)
and transpiled by [Babel](https://github.com/babel/babel).

- Install dependencies: `npm install`
- Start Webpack in a console: `npm run watch`
- Start the test server in another: `npm test`
- Navigate to `http://localhost:8000`

## Contributing

All pull requests and issues welcome!

If you're not sure how, check out Kent C. Dodds'
[great video tutorials on egghead.io](https://egghead.io/lessons/javascript-identifying-how-to-contribute-to-an-open-source-project-on-github)!

## Author & License

`fetch-sync` was created by [Sam Gluck](https://twitter.com/sdgluck) and is released under the MIT license.
