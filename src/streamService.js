const {
  base64Encode
} = require('./utils')

// TODO: clean up dead connections
const openConnections = {}

exports.registerConnection = (req, res) => {
  const conn = {
    id: base64Encode(Date.now().toString()),
    req,
    res
  }
  openConnections[conn.id] = conn

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  })

  this.write('open', res, conn.id)

  return conn
}

exports.write = (event, res, data) => {
  const serialized = JSON.stringify(data)
  res.write('event:' + event + '\n')
  res.write('data:' + serialized + '\n')
  res.write('\n\n')
}

exports.writeMessage = ({ connectionId, data }) => {
  const conn = openConnections[connectionId]
  if (conn) {
    this.write('message', conn.res, data)
  } else {
    throw new TypeError('Can not write to a connection which does not exist')
  }
}

exports.writeError = ({ connectionId, error }) => {
  const conn = openConnections[connectionId]
  if (conn) {
    this.write('error', conn.res, error)
  } else {
    throw new TypeError('Can not write to a connection which does not exist')
  }
}