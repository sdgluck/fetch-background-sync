'use strict'

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
      .then((data) => this.postMessage(data, event.ports[0]))
  }
}
