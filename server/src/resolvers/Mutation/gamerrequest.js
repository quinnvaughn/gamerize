const { getUserId, AuthError } = require('../../utils')

const gamerrequest = {
  async createGamerRequest(parent, { input }, context) {
    const userId = getUserId(context)
    const alreadyRequested = await context.prisma.gamerRequests({
      where: { user: { id: userId } },
    })
    if (alreadyRequested.length === 0) {
      const request = await context.prisma.createGamerRequest({
        addToOccupations: input.addToOccupations,
        occupations: { set: input.occupations },
        socialMedia: { create: input.socialMedia },
        age: input.age,
        ownsOwnBankAccount: input.ownsOwnBankAccount,
        user: {
          connect: {
            id: userId,
          },
        },
      })
      return request
        ? { request, created: true }
        : { msg: 'Gamer request failed. Try again.', created: false }
    }
    return { msg: 'You already have a pending gamer request', created: false }
  },
  async acceptGamerRequest(parent, { input }, ctx) {
    const adminId = getUserId(ctx)
    const admin = await ctx.prisma.user({ id: adminId })
    if (admin.role !== 'ADMIN') {
      throw new AuthError('You are not an admin')
    }
    const request = await ctx.prisma.gamerRequest({
      id: input.gamerRequestId,
    })
    const user = await ctx.prisma
      .gamerRequest({
        id: input.gamerRequestId,
      })
      .user()
    const updatedUser = await ctx.prisma.updateUser({
      where: { id: user.id },
      data: {
        role: 'GAMER',
        occupations: { set: request.occupations },
        setup: 5,
      },
    })
    if (updatedUser) {
      const deletedRequest = await ctx.prisma.deleteGamerRequest({
        id: input.gamerRequestId,
      })
      const notification = await ctx.prisma.createNotification({
        type: 'ACCEPTED_GAMER_REQUEST',
        text: `Congratulations ${
          user.name.split(' ')[0]
        }! Your gamer request has been accepted. You can now start hosting games.`,
        for: {
          connect: {
            id: user.id,
          },
        },
      })
      return deletedRequest && notification
        ? { accepted: true }
        : { accepted: false }
    }
    return { accepted: false }
  },
  async declineGamerRequest(parent, { input }, ctx) {
    const adminId = getUserId(ctx)
    const admin = await ctx.prisma.user({ id: adminId })
    if (admin.role !== 'ADMIN') {
      throw AuthError('You are not an admin')
    }
    const user = await ctx.prisma
      .gamerRequest({
        id: input.gamerRequestId,
      })
      .user()
    const deletedRequest = await ctx.prisma.deleteGamerRequest({
      id: input.gamerRequestId,
    })
    const notification = await ctx.prisma.createNotification({
      type: 'DENIED_GAMER_REQUEST',
      text: `Unfortunately your gamer request was not accepted. However, you can keep applying as you get more popular.`,
      for: {
        connect: {
          id: user.id,
        },
      },
    })

    return deletedRequest && notification
      ? { declined: true }
      : { declined: false }
  },
}

module.exports = { gamerrequest }
