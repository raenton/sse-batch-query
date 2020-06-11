exports.handleError = (err, req, res) => {
  res.writeHead(500, {
    'Content-type': 'text/plain'
  })
  res.end('Status 500: Internal Server Error')
}