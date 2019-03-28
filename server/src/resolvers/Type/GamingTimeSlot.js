const dateFns = require('date-fns')
GamingTimeSlot = {
  gamingSession: async (parent, _, { prisma }) =>
    await prisma.gamingTimeSlot({ id: parent.id }).gamingSession(),
  passed: async (parent, _, { prisma }) => {
    const currentTime = new Date()
    const session = await prisma.gamingTimeSlot({ id: parent.id })
    const boolean = dateFns.compareAsc(session.startTime, currentTime)
    return boolean === (-1 || 0) ? true : false
  },
  full: async (parent, _, { prisma }) => {
    const query = `
      {
        gamingTimeSlot(where: {id: "${parent.id}"}) {
          slots
          players {
            id
          }
        }
      }
    `
    const { gamingTimeSlot: session } = await prisma.$graphql(query)
    return session.slots - session.players.length === 0
  },
  players: async (parent, _, { prisma }) => {
    return await prisma.gamingTimeSlot({ id: parent.id }).players()
  },
}

module.exports = { GamingTimeSlot }
