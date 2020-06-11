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
  res.write('event:' + event + '\n')
  res.write('data:' + data + '\n')
  res.write('\n\n')
}

exports.writeMessage = ({ connectionId, message }) => {
  const conn = openConnections[connectionId]
  if (conn) {
    const encodedMessage = JSON.stringify(message)
    conn.res.write('event: message\n')
    conn.res.write('data: ' + encodedMessage + '\n')
    conn.res.write('\n\n')
  } else {
    throw new Error('Can not write to a connection which does not exist')
  }
}