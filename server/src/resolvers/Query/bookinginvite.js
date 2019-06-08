const { getUserId } = require('../../utils')

const bookingInvite = {
  async myInvites(parent, _, ctx) {
    const userId = getUserId(ctx)
    return await ctx.prisma.bookingInvites({
      where: {
        from: { id: userId },
        booking: {
          timeslot: {
            startTime_gte: new Date(),
          },
        },
        sent: false,
      },
    })
  },
  async myInvitesReceived(parent, _, ctx) {
    const userId = getUserId(ctx)
    return await ctx.prisma.bookingInvites({
      where: {
        to: { id: userId },
        booking: {
          timeslot: {
            startTime_gte: new Date(),
          },
        },
        accepted: null,
      },
    })
  },
}

module.exports = {
  bookingInvite,
}
