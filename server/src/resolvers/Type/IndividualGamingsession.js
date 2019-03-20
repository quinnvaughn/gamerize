const dateFns = require('date-fns')
IndividualGamingSession = {
  gamingSession: async (parent, _, { prisma }) =>
    await prisma.individualGamingSession({ id: parent.id }).gamingSession(),
  finished: async (parent, _, { prisma }) => {
    const currentTime = new Date()
    const session = await prisma.individualGamingSession({ id: parent.id })
    const boolean = dateFns.compareAsc(session.endTime, currentTime)
    return boolean === (-1 || 0) ? true : false
  },
  full: async (parent, _, { prisma }) => {
    const query = `
      {
        individualGamingSession(where: {id: "${parent.id}"}) {
          slots
          players {
            id
          }
        }
      }
    `
    const { individualGamingSession: session } = await prisma.$graphql(query)
    return session.slots - session.players.length === 0
  },
  players: async (parent, _, { prisma }) =>
    await prisma.individualGamingSession({ id: parent.id }).players(),
}

module.exports = { IndividualGamingSession }
