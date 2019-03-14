const { getUserId } = require('../../utils')
const User = {
  currentGamerRequest: async (parent, _, ctx) => {
    const userId = getUserId(ctx)
    const alreadyRequested = await ctx.prisma.gamerRequests({
      where: { user: { id: userId } },
    })
    return alreadyRequested.length === 1 ? true : false
  },
}

module.exports = {
  User,
}
