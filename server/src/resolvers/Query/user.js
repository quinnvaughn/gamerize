const { getUserId } = require('../../utils')

const user = {
  async me(parent, args, ctx) {
    const id = getUserId(ctx)
    return await ctx.prisma.user({ id })
  },
}

module.exports = { user }
