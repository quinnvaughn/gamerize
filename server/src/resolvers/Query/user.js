const { getUserId } = require('../../utils')

const user = {
  async me(parent, args, ctx) {
    const id = getUserId(ctx)
    return await ctx.prisma.user({ id })
  },
  async getUser(parent, { username }, { prisma }) {
    return await prisma.user({ username })
  },
}

module.exports = { user }
