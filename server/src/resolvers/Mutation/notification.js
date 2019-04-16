const { getUserId } = require('../../utils')

const notification = {
  async deleteNotification(parent, { input }, { prisma }) {
    const deletedNotification = await prisma.deleteNotification({
      id: input.notificationId,
    })
    return deletedNotification ? { deleted: true } : { deleted: false }
  },
  async viewUserNotifications(parent, _, ctx) {
    const userId = getUserId(ctx)
    const viewedNotifications = await ctx.prisma.updateManyNotifications({
      where: {
        for: { id: userId },
        OR: [
          { type: 'ACCEPTED_FRIEND_REQUEST' },
          { type: 'ACCEPTED_TIMESLOT_INVITE' },
          { type: 'ACCEPTED_GAMER_REQUEST' },
          { type: 'DENIED_GAMER_REQUEST' },
          { type: 'CANCELLED_TIMESLOT' },
          { type: 'FRIEND_REQUEST' },
          { type: 'ACCEPTED_TIMESLOT_REQUEST' },
          { type: 'TIMESLOT_INVITE' },
          { type: 'FRIEND_CANCELLED_THEIR_SLOT' },
          { type: 'GAMER_PUSHED_BACK_SLOT' },
        ],
      },
      data: { viewed: true },
    })
    return viewedNotifications ? { viewed: true } : { viewed: false }
  },
  async viewGamerNotifications(parent, _, ctx) {
    const userId = getUserId(ctx)
    const viewedNotifications = await ctx.prisma.updateManyNotifications({
      where: {
        for: { id: userId },
        OR: [{ type: 'BOOKED_TIMESLOT' }, { type: 'TIMESLOT_REQUEST' }],
      },
      data: { viewed: true },
    })
    return viewedNotifications ? { viewed: true } : { viewed: false }
  },
}

module.exports = {
  notification,
}
