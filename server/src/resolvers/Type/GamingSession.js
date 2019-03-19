const moment = require('moment')
const GamingSession = {
  game: async (parent, _, { prisma }) =>
    await prisma.gamingSession({ id: parent.id }).game(),
  gamers: async (parent, _, { prisma }) =>
    await prisma.gamingSession({ id: parent.id }).gamers(),
  reviews: async (parent, _, { prisma }) =>
    await prisma.gamingSession({ id: parent.id }).reviews(),
  slotsLeftToday: async (parent, _, { prisma }) => {
    const currentTime = moment().format('YYYY-MM-DDTHH:mm:ss')
    const endOfDay = moment()
      .endOf('day')
      .format('YYYY-MM-DDTHH:mm:ss')
    const query = `
        {
          gamingSession(where: {id: "${parent.id}"}) {
            sessions(where: {
              startTime_lte: "${endOfDay}"
              startTime_gte: "${currentTime}"
            }) {
              id
              startTime 
              endTime
              slots
              players {
                id
              }
            }
          }
        }
      `
    const { gamingSession } = await prisma.$graphql(query)
    const reducer = (acc, val) => acc + (val.slots - val.players.length)
    const total = gamingSession.sessions.reduce(reducer, 0)
    return total
  },
}

module.exports = {
  GamingSession,
}
