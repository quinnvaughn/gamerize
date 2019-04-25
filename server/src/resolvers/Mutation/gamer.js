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
  async allowGamerToPlay(parent, _, ctx) {
    const userId = getUserId(ctx)
    const updatedUser = await ctx.prisma.updateUser({
      where: { id: userId },
      data: {
        gamerIsSetup: true,
      },
    })
    return updatedUser ? { allowed: true } : { allowed: false }
  },
}

module.exports = { gamer }
