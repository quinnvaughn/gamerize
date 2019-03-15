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
  async respondToGamerRequest(parent, { input }, { prisma }) {
    const user = await prisma.updateUser({
      where: { id: input.userId },
      data: {
        isGamer: input.decision === 'ACCEPT' ? true : false,
        occupations: inputs.occupations,
      },
    })
    // Do delete many for now because of unique issue.
    let request
    if (user) {
      request = await prisma.deleteGamerRequest({
        id: input.gamerRequestId,
      })
    }
    return user
      ? { responded: true }
      : {
          msg: 'Your attempt cannot be processed. Please try again.',
          responded: false,
        }
  },
}

module.exports = { gamer }
