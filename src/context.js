const {
  QueryQueue,
  QueryEvents
} = require('./QueryQueue.js')
const streamService = require('./streamService')

exports.createContext = () => {
  // instantiate a queue to push query demands to
  const queryQueue = new QueryQueue()
  // listen for query completion events and write messages to stream
  queryQueue.addListener(QueryEvents.QUERY_COMPLETE, streamService.writeMessage)
  
  return {
    streamService,
    queryQueue
  }
}