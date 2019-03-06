const { user } = require('./Query/user')
const { auth } = require('./Mutation/auth')

module.exports = {
  Query: {
    ...user,
  },
  Mutation: {
    ...auth,
  },
}
