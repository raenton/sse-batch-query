const http = require('http')
const fs = require('fs')
const path = require('path')
const {
  QueryQueue,
  QueryEvents
} = require('./src/QueryQueue.js')
const streamService = require('./src/streamService')
const { routeHandler } = require('./src/api')
const { serveFile } = require('./src/staticServe')
const { errorHandler } = require('./src/errorHandler')

// instantiate a queue to push query demands to
const queryQueue = new QueryQueue()
// listen for query completion events and write messages to stream
queryQueue.addListener(QueryEvents.QUERY_COMPLETE, streamService.writeMessage)

const server = http.createServer((req, res) => {
  
  req.ctx = {
    queryQueue,
    streamService
  }

  req.on('error', err => errorHandler(err, req, res))
  res.on('error', err => errorHandler(err, req, res))

  if (req.url.includes('/api')) {
    routeHandler(req, res)
  } else {
    serveFile(req, res)
  }
})

server.listen(1337, () => console.log('Listening on: http://localhost:1337'))