const dateFns = require('date-fns')

const admin = {
  async numGamerRequests(parent, _, { prisma }) {
    return await prisma
      .gamerRequestsConnection()
      .aggregate()
      .count()
  },
  async getGamerRequests(parent, _, { prisma }) {
    return await prisma.gamerRequests()
  },
  async numGamers(parent, _, { prisma }) {
    return await prisma
      .usersConnection({ where: { role: 'GAMER' } })
      .aggregate()
      .count()
  },
  async numTimeslotsBooked(parent, _, { prisma }) {
    const reducer = (acc, cur) => acc + cur.numSlots

    const bookings = await prisma.bookings()
    return bookings.reduce(reducer, 0)
  },
  async ourTakeHome(parent, _, { prisma }) {
    const reducer = (acc, cur) => acc + cur.total * 0.2

    const bookings = await prisma.bookings()
    return bookings.reduce(reducer, 0)
  },
  async numUsers(parent, _, { prisma }) {
    return await prisma
      .usersConnection()
      .aggregate()
      .count()
  },
  async numSessionsPlayed(parent, _, { prisma }) {
    return await prisma
      .gamingTimeSlotsConnection()
      .aggregate()
      .count()
  },
  async numSessionsPlayedToday(parent, _, { prisma }) {
    return await prisma
      .gamingTimeSlotsConnection({
        where: {
          startTime_gte: dateFns.startOfDay(new Date()),
          endTime_lt: new Date(),
        },
      })
      .aggregate()
      .count()
  },
}

module.exports = { admin }
