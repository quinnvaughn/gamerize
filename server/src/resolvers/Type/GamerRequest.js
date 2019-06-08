const GamerRequest = {
  user: async (parent, _, ctx) => {
    return await ctx.prisma
      .gamerRequest({
        id: parent.id,
      })
      .user()
  },
  socialMedia: async (parent, _, ctx) => {
    return await ctx.prisma
      .gamerRequest({
        id: parent.id,
      })
      .socialMedia()
  },
}

module.exports = {
  GamerRequest,
}
