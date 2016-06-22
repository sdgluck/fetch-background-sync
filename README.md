# fetch-sync

> Proxy fetch requests through the [Background Sync API](https://github.com/WICG/BackgroundSync/blob/master/explainer.md)

Made with ❤ at [@outlandish](http://www.twitter.com/outlandish)

<a href="http://badge.fury.io/js/fetch-sync"><img alt="npm version" src="https://badge.fury.io/js/fetch-sync.svg"></a>
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Fetch Sync allows you to proxy fetch requests through the Background Sync API so that they are
honoured if made when the UA is offline! Hooray!

Check out a [live demo here](https://sdgluck.github.io/fetch-sync/).

- Make requests offline that will be sent when the UA regains connectivity (even if the web page is no longer open).
- Responses are forwarded back to the client as soon as they are received.
- Implements a familiar fetch-like API: similar function signature and the same return type (a Response).
- Make named requests that have their response stored in an IDBStore which you can collect in subsequent user sessions.
- Manage sync operations with `fetchSync.{get,getAll,cancel,cancelAll}()`.
- Can be used with existing Service Worker infrastructures with `importScripts`, or handles SW registration for you.
- If the browser does not support Background Sync, the library will fall back on normal `fetch` requests.

## Install

```sh
npm install fetch-sync --save
```

## Table of Contents

- [Requirements](#requirements)
- [Support](#support)
- __[Import](#import)__
- __[Initialisation](#initialisation)__
- __[Usage](#usage)__
- __[Sync API](#sync-api)__
- [Dependencies](#dependencies)
- [Test](#test)
- [Development](#development)
- [Contributing](#contributing)
- [Author & License](author--license)

## Requirements

The library utilises some new technologies so currently only works in some browsers. It definitely works in
[Chrome Canary](https://www.google.co.uk/chrome/browser/canary.html)
with the `experimental-web-platform-features` flag enabled.

The browser must support:

- [Background Sync](https://github.com/WICG/BackgroundSync/blob/master/explainer.md)
- [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [Promise] (https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise)

## Support

Chrome Canary | Chrome | Firefox | IE | Opera | Safari
:------------:|:------:|:-------:|:--:|:-----:|:-----:
✔             |✔      |✘       |✘   |✘     |✘

## Initialise

__Existing Service Worker__

If your application already uses a Service Worker, you can import the fetch-sync worker using `importScripts`:

```js
importScripts('node_modules/fetch-sync/dist/fetch-sync.sw.min.js')
```

And then call `fetchSync.init()` somewhere in your application's initialisation procedure.

__No Service Worker__

fetch-sync can handle registration if you don't use a SW already...

Either serve the fetch-sync worker file with a header `"Service-Worker-Allowed : /"`, or to avoid configuring headers,
create a Service Worker script in the root of your project and use the method above for 'Existing Service Worker'.

Then see the example under [Usage](#usage) for the `fetchSync.init()` method.

## Import

__Client__

```js
// ES6
import fetchSync from 'fetch-sync'
```

```js
// CommonJS
var fetchSync = require('fetch-sync')
```

```html
<!-- Script, using minified dist -->
<script src="/node_modules/fetch-sync/dist/fetch-sync.min.js"></script>
```

__Worker__

See [Initialise](#initialise) for details on importing and registering the service worker.

## Usage

### `fetchSync.init([options]) : Promise`

Initialise fetchSync.

- __options__ {Object} _(optional)_ options object

Look at the documentation for [`sw-register`](https://github.com/sdgluck/sw-register)
available options and for more details on Service Worker registration.

Example:

```js
// Import client lib...

// ES6
import fetchSync from 'fetch-sync'

// ES5
var fetchSync = require('fetch-sync')
```

```html
<!-- Script, using bundled dist -->
<script src="/node_modules/fetch-sync/dist/fetch-sync.min.js"></script>
```

```js
// Initialise, passing in worker lib location...

fetchSync.init({
  url: 'node_modules/fetch-sync/dist/fetch-sync.sw.js',
  scope: '<website address>' // e.g. 'http://localhost:8000'
})
```

### `fetchSync([name, ]request[, options]) : Promise<Response>`

Perform a [`sync`](https://github.com/WICG/BackgroundSync/blob/master/explainer.md#one-off-synchronization) Background Sync operation.

- [__name__] {String} _(optional)_ name of the sync operation
- __request__ {String|Request} URL or an instance of fetch Request
- [__options__] {Object} _(optional)_ [fetch options](https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch) object

Returns a Promise that resolves on success of the fetch request. Rejects if a sync exists with this name already.

If called with a `name`:

- the response will be stored and can be retrieved later using e.g. `fetchSync.get('name').then(sync => sync.response)`.
- the response will not automatically be removed from the IDBStore in the worker. You should request
that a named sync be removed manually by using `sync.remove()`.
- see the [Sync API](#sync-api) for more details.

Examples:

- named GET

    ```js
    fetchSync('GetMessages', '/messages')
      .then((response) => response.json())
      .then((json) => console.log(json.foo))
    ```

- unnamed POST

    ```js
    const post = fetchSync('/update-profile', {
      method: 'POST',
      body: { name: '' }
    })

    // cancel the sync...
    post.cancel()
    ```

- unnamed with options

    ```js
    const headers = new Headers();

    headers.append('Authorization', 'Basic abcdefghijklmnopqrstuvwxyz');

    // `fetchSync` accepts the same args as `fetch`...
    fetchSync('/send-message', { headers })
    ```

- named with options

    ```js
    fetchSync('/get-messages', { headers })
    ```

- unnamed with Request

    ```js
    fetchSync(
      new Request('/messages')
    )
    ```

### `fetchSync.get(name) : Sync`

Get a sync by its name.

- __name__ {String} name of the sync operation to get

Returns a Promise that resolves with success of the sync operation or reject if sync operation is not found.

There are also some properties/methods on the Sync. See the [Sync API](#sync-api) for more details.

Example:

```js
fetchSync('SendMessage', '/message', { body: 'Hello, World!' })

const sync = fetchSync.get('SendMessage')

sync.then((response) => {
  if (response.ok) {
    alert(`Your message was received at ${new Date(sync.syncedOn).toDateString()}.`
  } else {
    alert('Message failed to send.')
  }
})
```

### `fetchSync.getAll() : Array<Sync>`

Get all sync operations.

Returns an array of all sync operations (named and unnamed).

Example:

```js
fetchSync.getAll()
  .then((syncs) => syncs.forEach(sync => sync.cancel()))
```

### `fetchSync.cancel(name) : Promise`

Cancel the sync with the given `name`.

- __name__ {String} name of the sync operation to cancel

Example:

```js
fetchSync('Update', '/update', { body })
fetchSync.cancel('Update')
```

### `fetchSync.cancelAll() : Promise`

Cancel all syncs, named and unnamed.

## Sync API

### `sync.cancel() : Promise`

Cancels the sync operation.

Returns a Promise of success of the cancellation.

Example:

```js
const sync = fetchSync.get('Update')
sync.cancel()
```

### `sync.id`

The unique ID of the sync operation. This will be its name if it has one.

### `sync.name`

The name of the sync operation if it has one.

### `sync.createdOn`

The time that the sync operation was created.

### `sync.syncedOn`

The time that the sync operation was completed.

### `sync.cancelled`

Is the sync operation cancelled?

## Dependencies

- [idb-wrapper](https://github.com/jensarps/IDBWrapper)
- [msgr](https://github.com/sdgluck/msgr)
- [sw-register](https://github.com/sdgluck/sw-register)
- [serialise-request](https://github.com/sdgluck/serialise-request)
- [serialise-response](https://github.com/sdgluck/serialise-response)
- [mini-defer](https://github.com/sdgluck/mini-defer)

## Test

As the library depends on Service Workers and no headless browser has (good enough) support for Service Workers
that would allow tests to be executed within the console, tests are ran through the browser using
[Mocha](https://github.com/mochajs/mocha) and [Chai](https://github.com/chaijs/chai).

On running `npm test` an Express server will be started at `localhost:8000`.

Run the tests:

```sh
$ cd fetch-sync
$ npm test
```

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
