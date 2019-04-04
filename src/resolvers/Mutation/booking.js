const booking = {
  async cancelBooking(parent, { input }, ctx) {
    const cancelledBooking = await ctx.prisma.deleteBooking({
      id: input.bookingId,
    })
    return cancelledBooking ? { cancelled: true } : { cancelled: false }
  },
}

module.exports = { booking }
