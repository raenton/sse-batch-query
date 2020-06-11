const { EventEmitter } = require('events')

const QueryEvents = {
  QUERY_COMPLETE: 'queryComplete'
}

class QueryQueue extends EventEmitter {

  constructor() {
    super()
    this.queue = []
    this.queryHandler = this.start()
  }

  start() {
    this.queryHandler = setInterval(this._readQueue.bind(this))
  }
  
  stop() {
    clearInterval(this.queryHandler)
  }

  addQuery(connectionId, query) {
    this.queue.push({ connectionId, query })
  }
  
  _readQueue() {
    const item = this.queue.splice(0, 1)[0]
    if (item) {
      // perform item.query
      const data = {
        connectionId: item.connectionId,
        message: 'Query complete'
      }
      this.emit(QueryEvents.QUERY_COMPLETE, data)
    }
  }

}

module.exports = {
  QueryQueue,
  QueryEvents
}