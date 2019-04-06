const { getUserId, addMinutes, AuthError } = require('../../utils')
const dateFns = require('date-fns')
const _ = require('lodash')
const timeslot = {
  async cancelExtraSlot(parent, { input }, ctx) {
    // Disconnect an invite. Delete an invite.
    const userId = getUserId(ctx)
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
    const bookingId = booking.id
    const timeslotId = booking.timeslot.id
    const { numSlots, numPlayers, total } = await ctx.prisma.booking({
      id: bookingId,
    })
    const GAMING_TIME_SLOT_QUERY = `
      {
        gamingTimeSlot(where: {id: "${timeslotId}"}) {
          players {
            id
            player {
              id
            }
          }
          gamingSession {
            price
          }
        }
      }
    `
    const {
      gamingTimeSlot: { players, gamingSession },
    } = await ctx.prisma.$graphql(GAMING_TIME_SLOT_QUERY)
    const newNumSlots = numSlots - 1
    const newNumPlayers = numPlayers - 1
    const newPrice = total - gamingSession.price
    const disconnectedPlayer = players
      .filter(({ player }) => player.id === userId)
      .map(player => player.id)
      .pop()
    const deletedPlayer = await ctx.prisma.deleteBookedPlayer({
      id: disconnectedPlayer,
    })
    const updatedBooking = await ctx.prisma.updateBooking({
      where: { id: bookingId },
      data: {
        numSlots: newNumSlots,
        numPlayers: newNumPlayers,
        total: newPrice,
      },
    })
    const deletedBooking = await ctx.prisma.deleteBookingInvite({
      id: input.inviteId,
    })
    return deletedPlayer && updatedBooking && deletedBooking
      ? { cancelled: true }
      : { cancelled: false }
  },
  async createGamingTimeSlot(parent, { input }, ctx) {
    const userId = getUserId(ctx)
    const query = `
        {
          user(where: {id: "${userId}"}) {
            setup
          }
              gamingSession(where: {id: "${input.gamingSessionId}"}) {
                  length
                  slots
                  gamers {
                    id
                  }
            }
          }
        `
    const result = await ctx.prisma.$graphql(query)
    const sessions = result.gamingSession
    const setup = result.user.setup
    const sessionLength = sessions.length + setup
    const endTime = addMinutes(input.startTime, sessionLength)
    const gamers = sessions.gamers
    if (!gamers) {
      return {
        created: false,
        errorMsg:
          'You cannot add an individual session to not your own session',
      }
    }
    const currentTime = new Date()
    if (dateFns.compareAsc(input.startTime, currentTime) === -1) {
      return {
        created: false,
        errorMsg: 'You cannot add a timeslot that has already passed.',
      }
    }
    const overlap = await ctx.prisma.gamingTimeSlots({
      where: {
        gamers_some: { id: userId },
        AND: [
          {
            endTime_gt: input.startTime,
          },
          {
            startTime_lt: endTime,
          },
        ],
      },
    })
    if (overlap.length === 0) {
      const dateFormat = 'h:mm aa'
      const individualGamingSession = await ctx.prisma.createGamingTimeSlot({
        startTime: input.startTime,
        endTime,
        length: sessionLength,
        gamingSession: { connect: { id: input.gamingSessionId } },
        gamers: { connect: gamers },
        slots: sessions.slots,
      })
      return {
        created: true,
        individualGamingSession,
        successMsg: `Successfully added session from ${dateFns.format(
          individualGamingSession.startTime,
          dateFormat
        )}-${dateFns.format(endTime, dateFormat)}`,
      }
    } else {
      const dateFormat = 'h:mm aa'
      return {
        created: false,
        overlap: true,
        errorMsg: `Time overlaps session from ${dateFns.format(
          overlap[0].startTime,
          dateFormat
        )}-${dateFns.format(overlap[0].endTime, dateFormat)}`,
      }
    }
  },
  async createBulkGamingTimeSlots(parent, { input }, ctx) {
    const userId = getUserId(ctx)
    const query = `
        {
              user(where: {id: "${userId}"}) {
                setup
              }
              gamingSession(where: {id: "${input.gamingSessionId}"}) {
                  length
                  slots
                  creator {
                    id
                  }
                  gamers {
                    id
                  }
            }
          }
        `
    const result = await ctx.prisma.$graphql(query)
    const session = result.gamingSession
    const setup = result.user.setup
    const gamers = session.gamers
    const creator = session.creator
    const sessionLength = session.length + setup
    if (!gamers) {
      return {
        created: false,
        msg: 'You cannot add an individual session to not your own session',
      }
    }
    const numTimes = Math.floor(
      Number(
        dateFns.differenceInMinutes(input.endTime, input.startTime) /
          sessionLength
      )
    )

    let counterStart = input.startTime
    const endTime = addMinutes(input.startTime, sessionLength)
    let counterEnd = endTime
    let sessions = []
    let overlaps = []
    for (let i = 0; i < numTimes; i++) {
      const overlap = await ctx.prisma.gamingTimeSlots({
        where: {
          gamers_some: { id: userId },
          AND: [
            {
              endTime_gt: counterStart,
            },
            {
              startTime_lt: counterEnd,
            },
          ],
        },
      })
      if (overlap.length === 0) {
        const gamingSlot = await ctx.prisma.createGamingTimeSlot({
          startTime: counterStart,
          endTime: counterEnd,
          gamingSession: { connect: { id: input.gamingSessionId } },
          gamers: { connect: gamers },
          slots: session.slots,
          length: sessionLength,
        })
        counterStart = gamingSlot.endTime
        counterEnd = addMinutes(counterStart, sessionLength)
        sessions = [...sessions, gamingSlot]
      } else {
        overlaps = [...overlap]
      }
    }
    if (sessions.length > 0) {
      let successMsg = []
      const dateFormat = 'h:mm aa'
      for (const session in sessions) {
        successMsg = [
          ...successMsg,
          `Session added from ${dateFns.format(
            sessions[session].startTime,
            dateFormat
          )}-${dateFns.format(sessions[session].endTime, dateFormat)}`,
        ]
      }
      return { created: true, overlaps, sessions, successMsg }
    } else {
      return {
        created: false,
        errorMsg: 'Unable to add any times. Please try again',
        overlaps,
        sessions,
      }
    }
  },
  async addMinutesToTimeSlot(parent, { input }, ctx) {
    //fix
    const userId = getUserId(ctx)
    const session = await ctx.prisma.gamingTimeSlot({
      id: input.sessionId,
    })
    const newEnd = addMinutes(session.endTime, input.minutes)
    let overlaps = await ctx.prisma.gamingTimeSlots({
      where: {
        gamers_some: { id: userId },
        AND: [
          {
            endTime_gt: newEnd,
          },
          {
            startTime_lt: newEnd,
          },
        ],
      },
    })
    let pushedEnd = session.endTime
    let counter = overlaps.length
    while (counter > 0) {
      for (const session in overlaps) {
        let timeAdded =
          input.minutes -
          dateFns.differenceInMinutes(overlaps[session].startTime, pushedEnd)
        startTime = addMinutes(overlaps[session].startTime, timeAdded)
        endTime = addMinutes(overlaps[session].endTime, timeAdded)
        pushedEnd = overlaps[session].endTime
        await ctx.prisma.updateGamingTimeSlot({
          where: { id: overlaps[session].id },
          data: {
            startTime,
            endTime,
          },
        })
      }
      let newOverlaps = await ctx.prisma.gamingTimeSlot({
        where: {
          gamers_some: { id: userId },
          AND: [
            {
              endTime_gt: endTime,
            },
            {
              startTime_lt: endTime,
            },
          ],
        },
      })
      counter = newOverlaps.length > 0 ? newOverlaps.length : 0
      overlaps = newOverlaps
    }
    const updatedSession = await ctx.prisma.updateGamingTimeSlot({
      where: { id: session.id },
      data: {
        endTime: newEnd,
      },
    })
    return { updatedSession }
  },
  async cancelTimeSlot(parent, { input }, ctx) {
    const userId = getUserId(ctx)
    const gamers = await ctx.prisma
      .gamingTimeSlot({ id: input.sessionId })
      .gamers({ where: { id: userId } })
    if (gamers.length === 0) {
      throw AuthError()
    } else {
      const deletedSession = await ctx.prisma.deleteGamingTimeSlot({
        id: input.sessionId,
      })
      return { cancelled: deletedSession ? true : false }
    }
  },
  async bookTimeSlots(parent, { input }, ctx) {
    const userId = getUserId(ctx)
    let sessionsBought = []
    for (const timeslot in input.timeSlots) {
      const sessionBought = await ctx.prisma.createBooking({
        total: input.timeSlots[timeslot].total,
        numSlots: input.timeSlots[timeslot].slots,
        numPlayers: input.timeSlots[timeslot].players,
        timeslot: {
          connect: {
            id: input.timeSlots[timeslot].timeSlotId,
          },
        },
        bookee: {
          connect: {
            id: userId,
          },
        },
        players: {
          connect: {
            id: userId,
          },
        },
      })
      sessionsBought.push(sessionBought)
      let counter = 0
      let end = input.timeSlots[timeslot].slots
      while (counter < end) {
        await ctx.prisma.updateGamingTimeSlot({
          data: {
            players: {
              create: {
                player: { connect: { id: userId } },
              },
            },
          },
          where: {
            id: input.timeSlots[timeslot].timeSlotId,
          },
        })
        counter++
      }
      if (input.timeSlots[timeslot].players > 1) {
        let counter = 0
        // The number of players you can send an invite to. Doesn't include you.
        let end = input.timeSlots[timeslot].players - 1
        while (counter < end) {
          await ctx.prisma.createBookingInvite({
            booking: {
              connect: {
                id: sessionBought.id,
              },
            },
            from: {
              connect: {
                id: userId,
              },
            },
            startTime: input.timeSlots[timeslot].startTime,
            sent: false,
          })
          counter++
        }
      }
    }
    if (sessionsBought.length > 0) {
      return { booked: true }
    }
    return { booked: false }
  },
}

module.exports = { timeslot }
