exports.routeHandler = (req, res) => {
  if (req.url === '/api/events') {

    switch(req.method) {
      case 'GET':
        req.ctx.streamService.registerConnection(req, res)
        break
      case 'POST':
  
        req.setEncoding('utf-8')
  
        let rawData = ''
        req.on('data', chunk => {
          rawData += chunk
        }).on('end', () => {
          // TODO: find another way to track connections
          const connId = req.headers['x-connection']
          const data = JSON.parse(rawData)
          req.ctx.queryQueue.addQuery(connId, data.query)
  
          res.writeHead(200)
          res.end()
        })
        
        break
      default:
        break
    }

  }
  
}
