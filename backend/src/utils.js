const jwt = require('jsonwebtoken')

function getUser(token) {
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET)
    return userId
  }

  throw new AuthError()
}

class AuthError extends Error {
  constructor() {
    super('Not authorized')
  }
}

function createToken(userId) {
  return jwt.sign({ userId }, process.env.APP_SECRET)
}

module.exports = {
  getUser,
  createToken,
}
