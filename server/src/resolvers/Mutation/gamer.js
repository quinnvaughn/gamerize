const { getUserId } = require('../../utils')

const gamer = {
  async createGamerRequest(parent, { input }, context) {
    const userId = getUserId(context)
    const alreadyRequested = await context.prisma.gamerRequests({
      where: { user: { id: userId } },
    })
    if (!alreadyRequested) {
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
}

module.exports = { gamer }
