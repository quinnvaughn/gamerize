const { getUserId, AuthError } = require('../../utils')
const gamerrequest = {
  async acceptGamerRequest(parent, { input }, ctx) {
    const userId = getUserId(ctx)
    const user = await ctx.prisma.user({ id: userId })
    if (!user.isAdmin) {
      throw AuthError()
    }
    const newGamer = await ctx.prisma
      .gamerRequest({ id: input.gamerRequestId })
      .user()
    const updatedUser = await ctx.prisma.updateUser({
      where: { id: newGamer.id },
      data: {
        isGamer: true,
      },
    })
    const notification = await ctx.prisma.createNotification({
      type: 'ACCEPTED_GAMER_REQUEST',
      text: `Congratulations ${
        newGamer.name.split(' ')[0]
      }! Your gamer request been accepted. Please fill out additional information so you can start hosting sessions.`,
      for: {
        connect: {
          id: newGamer.id,
        },
      },
    })
    const deletedRequest = await ctx.prisma.deleteGamerRequest({
      id: input.gamerRequestId,
    })
    return updatedUser && notification && deletedRequest
      ? { accepted: true }
      : { accepted: false }
  },
}

module.exports = {
  gamerrequest,
}
