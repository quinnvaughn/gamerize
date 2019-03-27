const { user } = require('./Query/user')
const { auth } = require('./Mutation/auth')
const { gamer } = require('./Mutation/gamer')
const { game } = require('./Mutation/game')
const { game: gameQuery } = require('./Query/game')
const { gamingsession } = require('./Mutation/gamingsession')
const { gamer: gamerQuery } = require('./Query/gamer')
const { gamingsession: gamingSessionQuery } = require('./Query/gamingsession')
const { GamingSession } = require('./Type/GamingSession')
const { IndividualGamingSession } = require('./Type/IndividualGamingsession')
const { User } = require('./Type/User')
const { Node } = require('./Type/Node')

module.exports = {
  Query: {
    ...user,
    ...gamerQuery,
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
  IndividualGamingSession,
}
