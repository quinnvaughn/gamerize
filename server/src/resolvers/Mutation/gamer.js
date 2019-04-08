const { getUserId } = require('../../utils')
const gamer = {
  async updateGamerProfile(parent, { input }, ctx) {
    const userId = getUserId(ctx)
    const updatedUser = await ctx.prisma.updateUser({
      where: { id: userId },
      data: {
        setup: input.setup,
      },
    })
    return updatedUser ? { updated: true } : { updated: false }
  },
}

module.exports = { gamer }
