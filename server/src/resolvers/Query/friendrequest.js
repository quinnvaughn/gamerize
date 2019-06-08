const { getUserId } = require('../../utils')

const friendrequest = {
  async myFriendRequests(parent, _, ctx) {
    const userId = getUserId(ctx)
    return await ctx.prisma.friendRequests({
      to: {
        id: userId,
      },
    })
  },
}

module.exports = { friendrequest }
