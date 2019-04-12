const { getUserId } = require('../../utils')

const user = {
  async me(parent, args, ctx) {
    try {
      const id = getUserId(ctx)
      return await ctx.prisma.user({ id })
    } catch (e) {
      return null
    }
  },
  async getUser(parent, { username }, { prisma }) {
    return await prisma.user({ username })
  },
  async searchUsersForInvite(parent, { search, gamers, inviteId }, { prisma }) {
    // Needed so a user can't send multiple invites to the same person.
    const to = await prisma
      .bookingInvites({ where: { id: inviteId } })
      .booking()
      .invites()
      .to()
    const newGamers = [
      ...gamers,
      ...to[0].booking.invites
        .filter(item => item.to !== null)
        .map(item => item.to.username.toLowerCase()),
    ]
    const indexes = await prisma
      .userIndexes({
        where: {
          username_contains: search.toLowerCase(),
          username_not_in: newGamers,
        },
        orderBy: 'username_ASC',
        first: 10,
      })
      .user()
    const users = indexes.map(index => index.user)
    return users
  },
}

module.exports = { user }
