const http = require('http')
const fs = require('fs')
const path = require('path')
const {
  QueryQueue,
  QueryEvents
} = require('./src/QueryQueue.js')
const { registerConnection, writeMessage } = require('./src/streamService')
const { routeHandler } = require('./src/api')
const { errorHandler } = require('./src/errorHandler')

// instantiate a queue to push query demands to
const queryQueue = new QueryQueue()
// listen for query completion events and write messages to stream
queryQueue.addListener(QueryEvents.QUERY_COMPLETE, writeMessage)

const server = http.createServer((req, res) => {
  
  req.ctx = {
    queryQueue
  }

  req.on('error', err => errorHandler(err, req, res))
  res.on('error', err => errorHandler(err, req, res))

  if (req.url.split('/')[0] === 'api') {
    routeHandler(req, res)
  }

  if (req.url === '/api/events') {

    

  } else if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    const fileStream = fs.createReadStream(path.resolve(__dirname, 'public/index.html'))
    fileStream.pipe(res)
  } else if (req.url === '/index.css') {
    res.writeHead(200, { 'Content-Type': 'text/css' })
    const fileStream = fs.createReadStream(path.resolve(__dirname, 'public/index.css'))
    fileStream.pipe(res)
  }
})

server.listen(1337, () => console.log('Listening on: http://localhost:1337'))