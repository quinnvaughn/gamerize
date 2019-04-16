const { getUserId, AuthError } = require('../../utils')
const dateFns = require('date-fns')
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
  async cancelNotBookeeBooking(parent, { input }, ctx) {
    // Difference is this is when you didn't make the booking and you're cancelling your slot.
    const userId = getUserId(ctx)
    const QUERY = `
      {
        booking(where: {id: "${input.bookingId}"}) {
          timeslot {
            startTime 
            endTime
            gamingSession {
              creator {
                username
              }
            }
          }
          bookee {
            id
          }
          players {
            id
            player {
              id
              username
            }
          }
        }
      }
    `
    const {
      booking: { bookee, players, timeslot },
    } = await ctx.prisma.$graphql(QUERY)
    const invite = await ctx.prisma.bookingInvites({
      where: { from: { id: bookee.id }, to: { id: userId } },
    })
    const inviteId = invite[0].id
    const updatedBookingInvite = await ctx.prisma.updateBookingInvite({
      where: { id: inviteId },
      data: {
        to: {
          disconnect: true,
        },
        sent: false,
        accepted: null,
      },
    })
    const bookedPlayer = players.filter(({ player }) => player.id === userId)[0]
    const deletedBookedPlayer = await ctx.prisma.deleteBookedPlayer({
      id: bookedPlayer.id,
    })
    const gamer = timeslot.gamingSession.creator
    const timeFormat = 'h:mm aa'
    const startTime = dateFns.format(timeslot.startTime, timeFormat)
    const endTime = dateFns.format(timeslot.endTime, timeFormat)
    const notification = await ctx.prisma.createNotification({
      for: {
        connect: {
          id: bookee.id,
        },
      },
      type: 'FRIEND_CANCELLED_THEIR_SLOT',
      text: `${
        bookedPlayer.player.username
      } cancelled their slot for the session with ${
        gamer.username
      } from ${startTime}-${endTime}`,
    })
    return deletedBookedPlayer && updatedBookingInvite && notification
      ? { cancelled: true }
      : { cancelled: false }
  },
}

module.exports = { booking }
