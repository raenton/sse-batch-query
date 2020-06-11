const path = require('path')
const fs = require('fs')

exports.serveFile = (req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    const fileStream = fs.createReadStream(path.resolve(process.cwd(), 'public/index.html'))
    fileStream.pipe(res)
  } else {
    const urlParts = req.url.split('/')
    const filePath = path.resolve(process.cwd(), 'public/', urlParts[urlParts.length - 1])

    fs.exists(filePath, (exists => {
      if (!exists) {
        res.writeHead(404, {
          'Content-Type': 'text/plain'
        })
        res.end('404: Not Found')
      } else {
        const dotOffset = req.url.lastIndexOf('.');
        const mimeType = dotOffset == -1
          ? 'text/plain'
          : {
            '.html' : 'text/html',
            '.ico' : 'image/x-icon',
            '.jpg' : 'image/jpeg',
            '.png' : 'image/png',
            '.gif' : 'image/gif',
            '.css' : 'text/css',
            '.js' : 'text/javascript'
          }[ req.url.substr(dotOffset) ];
        res.writeHead(200, {
          'Content-Type': mimeType
        })
        const fileStream = fs.createReadStream(filePath)
        fileStream.pipe(res)
      }
    }))
  }
}