const http = require('http')
const fs = require('fs')
const path = require('path')
const {
  QueryQueue,
  QueryEvents
} = require('./src/QueryQueue.js')
const {
  registerConnection,
  writeMessage
} = require('./src/streamService')

// instantiate a queue to push query demands to
const queryQueue = new QueryQueue()
// listen for query completion events and write messages to stream
queryQueue.addListener(QueryEvents.QUERY_COMPLETE, writeMessage)

const handleError = (err, req, res) => {
  console.log('Handling error')
  res.writeHead(500, {
    'Content-type': 'text/plain'
  })
  res.end('Status 500: Internal Server Error')
}

const server = http.createServer((req, res) => {
  req.on('error', err => handleError(err, req, res))
  res.on('error', err => handleError(err, req, res))

  if (req.url === '/api/events') {

    switch(req.method) {
      case 'GET':
        registerConnection(req, res)
        break
      case 'POST':

        req.setEncoding('utf-8')

        let rawData = ''
        req.on('data', chunk => {
          rawData += chunk
        }).on('end', () => {
          const connId = req.headers['x-connection']
          const data = JSON.parse(rawData)
          queryQueue.addQuery(connId, data.query)

          res.writeHead(200)
          res.end()
        })
        
        break
      default:
        break
    }

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