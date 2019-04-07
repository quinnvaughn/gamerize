const { getUserId, AuthError } = require('../../utils')
const gamingsession = {
  async createGamingSession(parent, { input }, ctx) {
    const userId = getUserId(ctx)
    const gamingSession = await ctx.prisma.createGamingSession({
      game: { connect: { name: input.game } },
      title: input.title,
      length: input.length,
      price: input.price,
      gamers: {
        connect: [{ id: userId }],
      },
      creator: {
        connect: {
          id: userId,
        },
      },
      type: input.type,
      slots: input.slots,
      system: input.system,
      requirements: { create: [] },
      discounts: { create: [] },
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
  async updateSession(parent, { input }, ctx) {
    const userId = getUserId(ctx)
    const gamers = await ctx.prisma
      .gamingSession({ id: input.sessionId })
      .gamers({ where: { id: userId } })
    if (gamers.length === 0) {
      throw AuthError()
    } else {
      const updatedSession = await ctx.prisma.updateGamingSession({
        where: {
          id: input.sessionId,
        },
        data: {
          title: input.title,
          price: input.price,
          game: { connect: { name: input.game } },
          length: input.length,
          system: input.system,
          slots: input.slots,
          type: input.type,
        },
      })
      return { updatedSession }
    }
  },
}

module.exports = { gamingsession }
