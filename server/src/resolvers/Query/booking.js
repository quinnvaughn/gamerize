const { getUserId } = require('../../utils')

const booking = {
  async myUpcomingBookings(parent, _, ctx) {
    const userId = getUserId(ctx)
    const timeslots = await ctx.prisma
      .gamingTimeSlots({
        where: {
          players_some: { player: { id: userId } },
          startTime_gte: new Date(),
        },
        orderBy: 'startTime_ASC',
      })
      .bookings()
    const bookings =
      timeslots.length > 0
        ? timeslots.reduce((prev, next) => prev.concat(next.bookings), [])
        : []
    return bookings
  },
  async myPastBookings(parent, _, ctx) {
    const userId = getUserId(ctx)
    const timeslots = await ctx.prisma
      .gamingTimeSlots({
        where: {
          players_some: { player: { id: userId } },
          startTime_lt: new Date(),
        },
        orderBy: 'startTime_DESC',
      })
      .bookings()
    const bookings =
      timeslots.length > 0
        ? timeslots.reduce(
            (prev, next) => next.bookings && prev.concat(next.bookings),
            []
          )
        : []
    return bookings
  },
  async averagePricePerBooking(parent, _, { prisma }) {
    const query = `
        {
          bookings {
            numSlots
            timeslot {
              gamingSession {
                price
              }
            }
          }
        }
    `

    const { bookings } = await prisma.$graphql(query)
    const totalreducer = (acc, cur) =>
      acc + cur.numSlots * cur.timeslot.gamingSession.price
    const slotsreducer = (acc, cur) => acc + cur.numSlots
    const total = bookings.reduce(totalreducer, 0)
    const totalSlots = bookings.reduce(slotsreducer, 0)
    return (total / totalSlots).toFixed(2)
  },
}

module.exports = { booking }
