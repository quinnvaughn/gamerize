const { getUserId, AuthError } = require('../../utils')
const gamingsession = {
  async createGamingSession(parent, { input }, ctx) {
    const userId = getUserId(ctx)
    const gamer = await ctx.prisma.user({ id: userId })
    const gamingSession = await ctx.prisma.createGamingSession({
      game: { connect: { name: input.game } },
      title: input.title,
      length: input.length,
      launcher: input.launcher,
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
      title: input.title.toLowerCase(),
      gamer: gamer.username.toLowerCase(),
      game: input.game.toLowerCase(),
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
          launcher: input.launcher,
          system: input.system,
          slots: input.slots,
          type: input.type,
        },
      })
      const gamingSessionIndex = await ctx.prisma.gamingSessionIndexes({
        where: {
          gamingSession: {
            id: input.sessionId,
          },
        },
      })
      const indexId = gamingSessionIndex[0].id
      await ctx.prisma.updateGamingSessionIndex({
        where: { id: indexId },
        data: {
          title: input.title.toLowerCase(),
          game: input.game.toLowerCase(),
        },
      })
      return { updatedSession }
    }
  },
  async retireSession(parent, { input }, ctx) {
    const userId = getUserId(ctx)
    const gamers = await ctx.prisma
      .gamingSession({ id: input.sessionId })
      .gamers({ where: { id: userId } })
    if (gamers.length === 0) {
      throw AuthError()
    } else {
      const retiredSession = await ctx.prisma.updateGamingSession({
        where: {
          id: input.sessionId,
        },
        data: {
          retired: true,
        },
      })
      return { retired: retiredSession ? true : false }
    }
  },
  async unretireSession(parent, { input }, ctx) {
    const userId = getUserId(ctx)
    const gamers = await ctx.prisma
      .gamingSession({ id: input.sessionId })
      .gamers({ where: { id: userId } })
    if (gamers.length === 0) {
      throw AuthError()
    } else {
      const unretiredSession = await ctx.prisma.updateGamingSession({
        where: {
          id: input.sessionId,
        },
        data: {
          retired: false,
        },
      })
      return { unretired: unretiredSession ? true : false }
    }
  },
}

module.exports = { gamingsession }
