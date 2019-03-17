const { getUserId } = require('../../utils')

const gamingsession = {
  async createGamingSession(parent, { input }, ctx) {
    const userId = getUserId(ctx)
    const gamingSession = await ctx.prisma.createGamingSession({
      game: { connect: { name: input.gameName } },
      title: input.title,
      length: input.length,
      price: input.price,
      gamers: {
        connect: [{ id: userId }],
      },
    })
    await ctx.prisma.createGamingSessionIndex({
      title: input.title,
      gamingSession: { connect: { id: gamingSession.id } },
    })
    return gamingSession
      ? { gamingSession, created: true }
      : {
          msg:
            'There was an error creating the game session. Please try again.',
          created: false,
        }
  },
}

module.exports = { gamingsession }
