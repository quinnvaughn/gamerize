const { getUserId } = require('../../utils')
const dateFns = require('date-fns')
const bookingInvite = {
  async sendInvite(parent, { input }, ctx) {
    const QUERY = `
      {
        bookingInvite(where: {id: "${input.inviteId}"}) {
          from {
            username
          }
          booking {
            timeslot {
              gamingSession {
                system
                game {
                  name
                }
              }
              startTime
              endTime
              gamers {
                username
              }
            }
          }
        }
      }
    `
    const {
      bookingInvite: {
        from,
        booking: { timeslot },
      },
    } = await ctx.prisma.$graphql(QUERY)
    const usernames = timeslot.gamers.map(gamer => gamer.username)
    const gamers = usernames.join(', ')
    const dateFormat = 'h:mm a'
    const dayFormat = 'MMM Do'
    const system = timeslot.gamingSession.system
    const start = dateFns.format(timeslot.startTime, dateFormat)
    const end = dateFns.format(timeslot.endTime, dateFormat)
    const day = dateFns.format(timeslot.startTime, dayFormat)
    const to = await ctx.prisma
      .updateBookingInvite({
        data: {
          to: {
            connect: {
              username: input.username,
            },
          },
          notification: {
            create: {
              type: 'TIMESLOT_INVITE',
              text: `${from.username} sent you an invite to play ${
                timeslot.gamingSession.game.name
              } on ${system} with ${gamers} from ${start}-${end} on ${day}`,
              for: {
                connect: {
                  username: input.username,
                },
              },
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
    const you = await ctx.prisma.user({ id: userId })
    const user = await ctx.prisma.bookingInvite({ id: input.inviteId }).from()
    const QUERY = `
      {
        bookingInvite(where: {id: "${input.inviteId}"}) {
          notification {
            id
          }
          booking {
            id
            timeslot {
              startTime 
              endTime 
              gamingSession {
                creator {
                  username
                }
              }
              id
            }
          }
        }
      }
    `
    const {
      bookingInvite: { notification, booking },
    } = await ctx.prisma.$graphql(QUERY)
    const updatedBooking = await ctx.prisma.updateBooking({
      where: { id: booking.id },
      data: {
        players: {
          create: {
            timeslot: {
              connect: {
                id: booking.timeslot.id,
              },
            },
            player: {
              connect: {
                id: userId,
              },
            },
          },
        },
      },
    })
    // const SECOND_QUERY = `
    //   {
    //     gamingTimeSlot(where: {id: "${booking.timeslot.id}"}) {
    //       players(where: {player: {id: "${user.id}"}}) {
    //         id
    //       }
    //     }
    //   }
    // `
    // const timeslot = await ctx.prisma.$graphql(SECOND_QUERY)
    // const updateId = timeslot.gamingTimeSlot.players[1].id
    // const updatedBookedPlayer = await ctx.prisma.updateBookedPlayer({
    //   where: { id: updateId },
    //   data: {
    //     player: {
    //       connect: {
    //         id: userId,
    //       },
    //     },
    //   },
    // })
    const updatedInvite = await ctx.prisma.updateBookingInvite({
      where: { id: input.inviteId },
      data: {
        accepted: true,
      },
    })
    const gamer = booking.timeslot.gamingSession.creator
    const timeFormat = 'h:mm aa'
    const startTime = dateFns.format(booking.timeslot.startTime, timeFormat)
    const endTime = dateFns.format(booking.timeslot.endTime, timeFormat)
    const createdNotification = await ctx.prisma.createNotification({
      type: 'ACCEPTED_TIMESLOT_INVITE',
      text: `${you.username} accepted your invite for the session with ${
        gamer.username
      } from ${startTime}-${endTime}`,
      for: {
        connect: {
          id: user.id,
        },
      },
    })
    const deletedNotification = await ctx.prisma.deleteNotification({
      id: notification.id,
    })
    return createdNotification &&
      deletedNotification &&
      updatedBooking &&
      updatedInvite
      ? { accepted: true }
      : { accepted: false }
  },
  async declineInvite(parent, { input }, ctx) {
    const QUERY = `
      {
        bookingInvite(where: {id: "${input.inviteId}"}) {
          notification {
            id
          }
        }
      }
    `
    const {
      bookingInvite: { notification },
    } = await ctx.prisma.$graphql(QUERY)
    const updatedInvite = await ctx.prisma.updateBookingInvite({
      where: { id: input.inviteId },
      data: {
        to: {
          disconnect: true,
        },
        sent: false,
      },
    })
    const deletedNotification = await ctx.prisma.deleteNotification({
      id: notification.id,
    })
    return deletedNotification && updatedInvite
      ? { declined: true }
      : { declined: false }
  },
  async deleteOldInvites(parent, { input }, ctx) {
    const userId = getUserId(ctx)
    await ctx.prisma.deleteManyBookingInvites({
      OR: [
        {
          from: {
            id: userId,
          },
          startTime_lte: new Date(),
        },
        {
          to: {
            id: userId,
          },
          startTime_lte: new Date(),
        },
      ],
    })
    return { deleted: true }
  },
}

module.exports = { bookingInvite }
