const jwt = require('jsonwebtoken')

function getUserId(context) {
  const Authorization = context.req.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, process.env.APP_SECRET)
    return userId
  }

  throw new AuthError()
}
const addMinutes = (date, minutes) =>
  new Date(new Date(date).getTime() + minutes * 60000)

class AuthError extends Error {
  constructor(props) {
    super(props ? props : 'Not authorized')
  }
}

module.exports = {
  getUserId,
  AuthError,
  addMinutes,
}
