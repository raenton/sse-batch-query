const { SECRET } = require('./config')
const jwt = require('jsonwebtoken')

exports.nap = (duration) => new Promise(resolve => {
  setTimeout(resolve, duration)
})

exports.now = () => Date.now()

exports.base64Encode = string => Buffer.from(string).toString('base64')

exports.base64Decode = string => Buffer.from(string, 'base64').toString('ascii')

exports.verifyToken = (token) => {
  return jwt.verify(token, SECRET)
}

exports.generateToken = (connectionId) => {
  return jwt.sign({ connectionId }, SECRET)
}