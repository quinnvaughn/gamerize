const { getUserId } = require('../../utils')

const notification = {
  async myUserNotifications(parent, _, ctx) {
    const userId = getUserId(ctx)
    return await ctx.prisma.notifications({
      where: {
        for: {
          id: userId,
        },
        OR: [
          { type: 'ACCEPTED_FRIEND_REQUEST' },
          { type: 'ACCEPTED_TIMESLOT_INVITE' },
          { type: 'ACCEPTED_GAMER_REQUEST' },
          { type: 'DENIED_GAMER_REQUEST' },
          { type: 'CANCELLED_TIMESLOT' },
          { type: 'FRIEND_REQUEST' },
          { type: 'ACCEPTED_TIMESLOT_REQUEST' },
          { type: 'TIMESLOT_INVITE' },
        ],
      },
    })
  },
  async myGamerNotifications(parent, _, ctx) {
    const userId = getUserId(ctx)
    return await ctx.prisma.notifications({
      where: {
        for: {
          id: userId,
        },
        OR: [{ type: 'BOOKED_TIMESLOT' }, { type: 'TIMESLOT_REQUEST' }],
      },
    })
  },
  async numUserNotifications(parent, _, ctx) {
    const userId = getUserId(ctx)
    const notifications = await ctx.prisma.notifications({
      where: {
        for: {
          id: userId,
        },
        OR: [
          { type: 'ACCEPTED_FRIEND_REQUEST' },
          { type: 'ACCEPTED_TIMESLOT_INVITE' },
          { type: 'ACCEPTED_GAMER_REQUEST' },
          { type: 'DENIED_GAMER_REQUEST' },
          { type: 'CANCELLED_TIMESLOT' },
          { type: 'FRIEND_REQUEST' },
          { type: 'ACCEPTED_TIMESLOT_REQUEST' },
          { type: 'TIMESLOT_INVITE' },
        ],
        viewed: false,
      },
    })
    return notifications.length
  },
  async numGamerNotifications(parent, _, ctx) {
    const userId = getUserId(ctx)
    const notifications = await ctx.prisma.notifications({
      where: {
        for: {
          id: userId,
        },
        OR: [{ type: 'BOOKED_TIMESLOT' }, { type: 'TIMESLOT_REQUEST' }],
        viewed: false,
      },
    })
    return notifications.length
  },
}

module.exports = {
  notification,
}
