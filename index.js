const http = require('http')
const { createContext } = require('./src/context')
const { routeHandler } = require('./src/api')
const { serveFile } = require('./src/staticServe')
const { errorHandler } = require('./src/errorHandler')

const context = createContext()

const server = http.createServer((req, res) => {
  req.ctx = context

  req.on('error', err => errorHandler(err, req, res))
  res.on('error', err => errorHandler(err, req, res))

  if (req.url.includes('/api')) {
    routeHandler(req, res)
  } else {
    serveFile(req, res)
  }
})

server.listen(1337, () => console.log('Listening on: http://localhost:1337'))