const moment = require('moment')
const GamingSession = {
  creator: async (parent, _, { prisma }) =>
    await prisma.gamingSession({ id: parent.id }).creator(),
  game: async (parent, _, { prisma }) =>
    await prisma.gamingSession({ id: parent.id }).game(),
  gamers: async (parent, _, { prisma }) =>
    await prisma.gamingSession({ id: parent.id }).gamers(),
  reviews: async (parent, _, { prisma }) =>
    await prisma.gamingSession({ id: parent.id }).reviews(),
  numReviews: async (parent, _, { prisma }) => {
    const reviews = await prisma.gamingSession({ id: parent.id }).reviews()
    return reviews.length
  },
  slotsLeftToday: async (parent, _, { prisma }) => {
    const currentTime = moment()
      .utc()
      .format('YYYY-MM-DDTHH:mm:ss')
    const endOfDay = moment()
      .endOf('day')
      .utc()
      .format('YYYY-MM-DDTHH:mm:ss')
    const query = `
        {
          gamingSession(where: {id: "${parent.id}"}) {
            timeslots(where: {
              startTime_lte: "${endOfDay}"
              startTime_gte: "${currentTime}"
            }) {
              id
              startTime 
              endTime
              slots
              players {
                player {
                  id
                }
              }
            }
          }
        }
      `
    const { gamingSession } = await prisma.$graphql(query)
    const reducer = (acc, val) => acc + (val.slots - val.players.length)
    const total = gamingSession.timeslots.reduce(reducer, 0)
    return total
  },
  reviewRating: async (parent, _, { prisma }) => {
    const reviews = await prisma.gamingSession({ id: parent.id }).reviews()
    const reducer = (acc, cur) => acc + cur.rating
    if (reviews.length === 0) {
      return 0
    } else {
      return Number(reviews.reduce(reducer, 0) / reviews.length).toFixed(2)
    }
  },
  timeSlots: async (parent, _, { prisma }) => {
    return await prisma.gamingSession({ id: parent.id }).timeSlots()
  },
}

module.exports = {
  GamingSession,
}
