const { getUserId } = require('../../utils')

const gamingsession = {
  async getSpecificSession(parent, { sessionId }, { prisma }) {
    return await prisma.gamingSession({ id: sessionId })
  },
  async myGamingSessions(parent, _, ctx) {
    const userId = getUserId(ctx)
    return await ctx.prisma.gamingSessions({
      where: {
        creator: {
          id: userId,
        },
        retired: false,
      },
    })
  },
  async myRetiredGamingSessions(parent, _, ctx) {
    const userId = getUserId(ctx)
    return await ctx.prisma.gamingSessions({
      where: {
        creator: {
          id: userId,
        },
        retired: true,
      },
    })
  },
  async allSessions(parent, { first }, { prisma }) {
    return await prisma.gamingSessions({
      orderBy: 'views_DESC',
      first,
      where: {
        retired: false,
      },
    })
  },
  async totalSessions(parent, _, { prisma }) {
    return await prisma
      .gamingSessionsConnection({ where: { retired: false } })
      .aggregate()
      .count()
  },
}

module.exports = { gamingsession }
