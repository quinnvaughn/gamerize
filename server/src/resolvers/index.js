const { user } = require('./Query/user')
const { auth } = require('./Mutation/auth')
const { gamer } = require('./Mutation/gamer')
const { User } = require('./Type/User')
const { Node } = require('./Type/Node')

module.exports = {
  Query: {
    ...user,
  },
  Mutation: {
    ...auth,
    ...gamer,
  },
  User,
  Node,
}
