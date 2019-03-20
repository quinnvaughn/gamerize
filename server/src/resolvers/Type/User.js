const User = {
  currentGamerRequest: async (parent, _, ctx) => {
    const alreadyRequested = await ctx.prisma.gamerRequests({
      where: { user: { id: parent.id } },
    })
    return alreadyRequested.length === 1 ? true : false
  },
  sessions: async (parent, _, ctx) => {
    return await ctx.prisma.user({ id: parent.id }).sessions()
  },
  individualSessions: async (parent, _, ctx) => {
    return await ctx.prisma.user({ id: parent.id }).individualSessions()
  },
  sessionIsGoingOn: async (parent, _, ctx) => {
    const currentTime = new Date()
    const session = await ctx.prisma
      .user({ id: parent.id })
      .individualSessions({
        where: {
          startTime_lte: currentTime,
          endTime_gt: currentTime,
        },
      })
    return session.length > 0
      ? { session: session[0], goingOn: true }
      : { goingOn: false }
  },
}

module.exports = {
  User,
}
