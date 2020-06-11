const http = require('http')
const { createContext } = require('./src/context')
const { routeHandler } = require('./src/api')
const { serveFile } = require('./src/staticServe')
const { errorHandler } = require('./src/errorHandler')

const context = createContext()

const patchRequest = (req) => {
  req.getHeader = function(header) {
    return this.headers[header.toLowerCase()]
  }
  req.ctx = context
}

const server = http.createServer((req, res) => {
  patchRequest(req)

  req.on('error', err => errorHandler(err, req, res))
  res.on('error', err => errorHandler(err, req, res))

  if (req.url.includes('/api')) {
    routeHandler(req, res)
  } else {
    serveFile(req, res)
  }
})

server.listen(1337, () => console.log('Listening on: http://localhost:1337'))