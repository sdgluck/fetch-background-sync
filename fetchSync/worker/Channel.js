'use strict'

import { Responses } from '/fetchSync/actionTypes'

export default class Channel {
  constructor (worker, messageHandlers) {
    worker.onmessage = this.onMessageEvent.bind(this)
    this.messageHandlers = messageHandlers
    this.defaultPort = null
  }

  setDefaultPort (defaultPort) {
    this.defaultPort = defaultPort
  }

  postMessage (data, port) {
    if (port) {
      port.postMessage(JSON.stringify(data))
    } else if (this.defaultPort) {
      this.defaultPort.postMessage(JSON.stringify(data))
    } else {
      throw new Error('No port available')
    }
  }

  handleMessage (event) {
    const request = event.data
    if (request.type in this.messageHandlers) {
      return this.messageHandlers[request.type](event)
    }
    return Promise.reject(new Error(`Unknown request type "${request.type}"`))
  }

  onMessageEvent (event) {
    return this
      .handleMessage(event)
      .catch((err) => this.postMessage({
        type: Responses.FAILURE,
        data: { error: err.message }
      }, event.ports[0]))
      .then((data) => this.postMessage({
        type: Responses.SUCCESS,
        data
      }, event.ports[0]))
  }
}
