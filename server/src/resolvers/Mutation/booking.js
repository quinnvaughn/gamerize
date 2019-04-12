const { getUserId, AuthError } = require('../../utils')
const booking = {
  async cancelBooking(parent, { input }, ctx) {
    const userId = getUserId(ctx)
    const bookee = await ctx.prisma.booking({ id: input.bookingId }).bookee()
    if (bookee.id !== userId) {
      throw new AuthError()
    }
    const cancelledBooking = await ctx.prisma.deleteBooking({
      id: input.bookingId,
    })
    return cancelledBooking ? { cancelled: true } : { cancelled: false }
  },
}

module.exports = { booking }
