const {
  QueryQueue,
  QueryEvents
} = require('./QueryQueue.js')
const { QueryService } = require('./queryService')
const streamService = require('./streamService')
const utils = require('./utils')

exports.createContext = (dbPool) => {
  const queryService = new QueryService(dbPool)

  // instantiate a queue to push query demands to
  const queryQueue = new QueryQueue(queryService)

  // listen for query completion events and write messages to stream
  queryQueue.addListener(QueryEvents.QUERY_COMPLETE, streamService.writeMessage)
  // listen for query errors and write to error stream
  queryQueue.addListener(QueryEvents.QUERY_ERROR, streamService.writeError)
  // listen for empty queue events and do some other stuff
  // queryQueue.addListener(QueryEvents.QUEUE_EMPTY, doStuff)
  
  return {
    streamService,
    queryQueue,
    utils
  }
}