const { user } = require('./Query/user')
const { auth } = require('./Mutation/auth')
const { gamer } = require('./Mutation/gamer')
const { game } = require('./Mutation/game')
const { game: gameQuery } = require('./Query/game')
const { gamingsession } = require('./Mutation/gamingsession')
const { gamingsession: gamingSessionQuery } = require('./Query/gamingsession')
const { GamingSession } = require('./Type/GamingSession')
const { User } = require('./Type/User')
const { Node } = require('./Type/Node')

module.exports = {
  Query: {
    ...user,
    ...gameQuery,
    ...gamingSessionQuery,
  },
  Mutation: {
    ...auth,
    ...gamer,
    ...game,
    ...gamingsession,
  },
  User,
  Node,
  GamingSession,
}
