const { getUserId } = require('../../utils')
const bookingInvite = {
  async sendInvite(parent, { input }, { prisma }) {
    const to = await prisma
      .updateBookingInvite({
        data: {
          to: {
            connect: {
              username: input.username,
            },
          },
          sent: true,
        },
        where: {
          id: input.inviteId,
        },
      })
      .to()
    return to ? { sent: true } : { sent: false }
  },
  async acceptInvite(parent, { input }, ctx) {
    const userId = getUserId(ctx)
    const user = await ctx.prisma.bookingInvite({ id: input.inviteId }).from()
    const QUERY = `
      {
        bookingInvite(where: {id: "${input.inviteId}"}) {
          booking {
            id
            timeslot {
              id
            }
          }
        }
      }
    `
    const {
      bookingInvite: { booking },
    } = await ctx.prisma.$graphql(QUERY)
    const updatedBooking = await ctx.prisma.updateBooking({
      where: { id: booking.id },
      data: {
        players: {
          connect: {
            id: userId,
          },
        },
      },
    })
    const SECOND_QUERY = `
      {
        gamingTimeSlot(where: {id: "${booking.timeslot.id}"}) {
          players(where: {player: {id: "${user.id}"}}) {
            id
          }
        }
      }
    `
    const timeslot = await ctx.prisma.$graphql(SECOND_QUERY)
    const updateId = timeslot.gamingTimeSlot.players[1].id
    const updatedBookedPlayer = await ctx.prisma.updateBookedPlayer({
      where: { id: updateId },
      data: {
        player: {
          connect: {
            id: userId,
          },
        },
      },
    })
    const updatedInvite = await ctx.prisma.updateBookingInvite({
      where: { id: input.inviteId },
      data: {
        accepted: true,
      },
    })
    return updatedBooking && updatedBookedPlayer && updatedInvite
      ? { accepted: true }
      : { accepted: false }
  },
  async declineInvite(parent, { input }, ctx) {
    const updatedInvite = await ctx.prisma.updateBookingInvite({
      where: { id: input.inviteId },
      data: {
        to: null,
        sent: false,
      },
    })
    return updatedInvite ? { declined: true } : { declined: false }
  },
}

module.exports = { bookingInvite }
