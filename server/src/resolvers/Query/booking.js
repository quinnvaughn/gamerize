const { getUserId } = require('../../utils')

const booking = {
  async myUpcomingBookings(parent, _, ctx) {
    const userId = getUserId(ctx)
    return await ctx.prisma.gamingTimeSlots({
      where: {
        players_some: { player: { id: userId } },
        startTime_gte: new Date(),
      },
      orderBy: 'startTime_ASC',
    })
  },
  async myPastBookings(parent, _, ctx) {
    const userId = getUserId(ctx)
    return await ctx.prisma.gamingTimeSlots({
      where: {
        players_some: { player: { id: userId } },
        startTime_lt: new Date(),
      },
      orderBy: 'startTime_DESC',
    })
  },
}

module.exports = { booking }
