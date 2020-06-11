exports.routeHandler = (req, res) => {
  if (req.url === '/api/events') {
    const { streamService, queryQueue, utils } = req.ctx

    switch(req.method) {
      case 'GET':
        streamService.registerConnection(req, res)
        break
      case 'POST':
        const token = req.getHeader('Authorization').split(' ')[1]
        const { connectionId } = utils.verifyToken(token)

        if (streamService.hasConnection(connectionId)) {
          req.setEncoding('utf-8')
  
          let rawData = ''
          req.on('data', chunk => {
            rawData += chunk
          }).on('end', () => {
            const data = JSON.parse(rawData)
            queryQueue.addQuery(connectionId, data.query)
    
            res.writeHead(200).end()
          })
        } else {
          res.writeHead(400, {
            'Content-Type': 'text/plain'
          }).end('The server has lost your connection token. Please refresh the page.')
        }
        break
      default:
        break
    }

  }
}
