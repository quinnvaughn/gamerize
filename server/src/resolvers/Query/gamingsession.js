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
}

module.exports = { gamingsession }
