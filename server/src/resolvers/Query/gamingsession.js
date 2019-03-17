const { getUserId } = require('../../utils')

const gamingsession = {
  async mySessions(parent, _, ctx) {
    const userId = getUserId(ctx)
    return await ctx.prisma.user({ id: userId }).sessions()
  },
}

module.exports = { gamingsession }
