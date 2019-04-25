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
          endTime_lt: dateFns.endOfDay(new Date()),
        },
      })
      .aggregate()
      .count()
  },
}

module.exports = { admin }
