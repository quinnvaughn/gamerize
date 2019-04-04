const { getUserId } = require('../../utils')

const notification = {
  async myNotifications(parent, _, ctx) {
    const userId = getUserId(ctx)
    return await ctx.prisma.notifications({
      where: {
        for: {
          id: userId,
        },
      },
    })
  },
}

module.exports = {
  notification,
}
