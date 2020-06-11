// TODO: clean up dead connections
const openConnections = {}

exports.registerConnection = (req, res) => {
  const {
    base64Encode,
    generateToken,
    now
  } = req.ctx.utils
  const conn = {
    id: base64Encode(now().toString()),
    req,
    res
  }
  openConnections[conn.id] = conn

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  })

  const token = generateToken(conn.id)

  this.write('open', res, { token })

  return conn
}

exports.hasConnection = connectionId => Boolean(openConnections[connectionId])

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