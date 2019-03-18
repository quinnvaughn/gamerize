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
}

module.exports = {
  User,
}
