exports.nap = (duration) => new Promise(resolve => {
  setTimeout(resolve, duration)
})

exports.base64Encode = string => Buffer.from(string).toString('base64')

exports.base64Decode = string => Buffer.from(string, 'base64').toString('ascii')