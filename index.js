const mysql = require('mysql')
const http = require('http')
const { createContext } = require('./src/context')
const { routeHandler } = require('./src/api')
const { serveFile } = require('./src/staticServe')

const dbPool = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  port            : 3307,
  user            : 'root',
  password        : 'example'
});

const context = createContext(dbPool)

const patchRequest = (req) => {
  req.getHeader = function(header) {
    return this.headers[header.toLowerCase()]
  }
  req.ctx = context
}

const server = http.createServer((req, res) => {
  patchRequest(req)

  if (req.url.includes('/api')) {
    routeHandler(req, res)
  } else {
    serveFile(req, res)
  }
})

server.listen(1337, () => console.log('Listening on: http://localhost:1337'))