const { user } = require('./Query/user')
const { auth } = require('./Mutation/auth')
const { gamer } = require('./Mutation/gamer')
const { User } = require('./Type/User')

module.exports = {
  Query: {
    ...user,
  },
  Mutation: {
    ...auth,
    ...gamer,
  },
  User,
}
