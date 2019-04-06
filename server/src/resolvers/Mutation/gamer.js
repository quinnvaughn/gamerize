const { getUserId } = require('../../utils')

const gamer = {
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
  async acceptGamerRequest(parent, { input }, { prisma }) {
    let request
    const user = await prisma.updateUser({
      where: { id: input.userId },
      data: {
        roles: {
          set: ['USER', 'GAMER'],
        },
      },
    })
    if (user) {
      request = await prisma.deleteGamerRequest({
        id: input.gamerRequestId,
      })
    }
    return request ? { accepted: true } : { accepted: false }
  },
}

module.exports = { gamer }
