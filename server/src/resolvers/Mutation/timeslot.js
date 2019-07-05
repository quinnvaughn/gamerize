const { getUserId, addMinutes, AuthError } = require('../../utils')
const dateFns = require('date-fns')
const _ = require('lodash')
const { stripe } = require('../../stripe')
const { formatToTimeZone } = require('date-fns-timezone')
const AsyncLock = require('async-lock')

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
    const { numSlots, numPlayers, total, charge } = await ctx.prisma.booking({
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
    const refund = charge
      ? await stripe.refunds.create({
          charge,
          reverse_transfer: true,
          amount: gamingSession.price * 100,
        })
      : true
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
    return deletedPlayer && updatedBooking && deletedBooking && refund
      ? { cancelled: true }
      : { cancelled: false }
  },
  async createGamingTimeSlot(parent, { input }, ctx) {
    const userId = getUserId(ctx)
    const timeZone = input.timeZone
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
        slotsLeft: sessions.slots,
      })
      return {
        created: true,
        individualGamingSession,
        successMsg: `Successfully added session from ${formatToTimeZone(
          individualGamingSession.startTime,
          dateFormat,
          {
            timeZone,
          }
        )}-${formatToTimeZone(endTime, dateFormat, {
          timeZone,
        })}`,
      }
    } else {
      const dateFormat = 'h:mm aa'
      return {
        created: false,
        overlap: true,
        errorMsg: `Time overlaps session from ${formatToTimeZone(
          overlap[0].startTime,
          dateFormat,
          {
            timeZone,
          }
        )}-${formatToTimeZone(overlap[0].endTime, dateFormat, {
          timeZone,
        })}`,
      }
    }
  },
  async createBulkGamingTimeSlots(parent, { input }, ctx) {
    const userId = getUserId(ctx)
    const timeZone = input.timeZone
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
    const sessionLength = session.length + setup
    if (!gamers) {
      return {
        created: false,
        errorMsg:
          'You cannot add an individual session to not your own session',
      }
    }
    const numTimes = Math.floor(
      Number(
        dateFns.differenceInMinutes(input.endTime, input.startTime) /
          sessionLength
      )
    )
    let counterStart = input.startTime
    let successMsg = []
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
      const dateFormat = 'h:mm aa'
      for (const session in sessions) {
        successMsg = [
          ...successMsg,
          `Session added from ${formatToTimeZone(
            sessions[session].startTime,
            dateFormat,
            {
              timeZone,
            }
          )}-${formatToTimeZone(sessions[session].endTime, dateFormat, {
            timeZone,
          })}`,
        ]
      }
      return { created: true, overlaps, sessions, successMsg }
    } else {
      return {
        created: false,
        errorMsg: 'Unable to add any times. Please try again',
        successMsg,
        overlaps,
        sessions,
      }
    }
  },
  async addMinutesToTimeSlot(parent, { input }, ctx) {
    //fix
    const userId = getUserId(ctx)
    const timeZone = input.timeZone
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
    const gamer = await ctx.prisma.user({ id: userId })
    let pushedEnd = session.endTime
    let counter = overlaps.length
    while (counter > 0) {
      for (const session of overlaps) {
        let timeAdded =
          input.minutes -
          dateFns.differenceInMinutes(session.startTime, pushedEnd)
        startTime = addMinutes(session.startTime, timeAdded)
        endTime = addMinutes(session.endTime, timeAdded)
        pushedEnd = session.endTime
        const players = await ctx.prisma
          .gamingTimeSlot({ id: session.id })
          .players()
          .player()
        const game = await ctx.prisma
          .gamingTimeSlot({ id: session.id })
          .gamingSession()
          .game()
        let playerIds = []
        for (const { player } of players) {
          const includes = playerIds.includes(player.id)
          if (!includes) playerIds.push(player.id)
          const timeFormat = 'h:mm aa'
          const formattedOldStartTime = formatToTimeZone(
            session.startTime,
            timeFormat,
            {
              timeZone,
            }
          )
          const formattedNewStartTime = formatToTimeZone(
            startTime,
            timeFormat,
            {
              timeZone,
            }
          )
          if (!includes)
            await ctx.prisma.createNotification({
              for: {
                connect: {
                  id: player.id,
                },
              },
              type: 'GAMER_PUSHED_BACK_SLOT',
              text: `${gamer.username} pushed back the session for ${
                game.name
              } at ${formattedOldStartTime} ${timeAdded} minutes to ${formattedNewStartTime}`,
            })
        }
        await ctx.prisma.updateGamingTimeSlot({
          where: { id: session.id },
          data: {
            startTime,
            endTime,
          },
        })
      }

      let newOverlaps = await ctx.prisma.gamingTimeSlots({
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
    const timeZone = input.timeZone
    const gamers = await ctx.prisma
      .gamingTimeSlot({ id: input.sessionId })
      .gamers({ where: { id: userId } })
    if (gamers.length === 0) {
      throw AuthError()
    } else {
      const QUERY = `
        {
          gamingTimeSlot(where: {id: "${input.sessionId}"}) {
            id
            startTime
            endTime
            gamingSession {
              id
              game {
                id
                name
              }
              creator {
                id
                username
              }
            }
            players {
              player {
                id
              }
            }
          }
        }
      `
      const { gamingTimeSlot } = await ctx.prisma.$graphql(QUERY)

      const playerIds = []
      for (const player of gamingTimeSlot.players) {
        const timeFormat = 'h:mm aa'
        // don't send person multiple notifications if they booked multiple slots.
        if (playerIds.includes(player.player.id)) {
        } else {
          playerIds.push(player.player.id)
          await ctx.prisma.createNotification({
            for: {
              connect: {
                id: player.player.id,
              },
            },
            type: 'CANCELLED_TIMESLOT',
            text: `${
              gamingTimeSlot.gamingSession.creator.username
            } cancelled the timeslot for ${
              gamingTimeSlot.gamingSession.game.name
            } from ${formatToTimeZone(gamingTimeSlot.startTime, timeFormat, {
              timeZone,
            })}-${formatToTimeZone(gamingTimeSlot.endTime, timeFormat, {
              timeZone,
            })}`,
          })
        }
      }
      const deletedSession = await ctx.prisma.deleteGamingTimeSlot({
        id: input.sessionId,
      })
      return deletedSession ? { cancelled: true } : { cancelled: false }
    }
  },
  async bookTimeSlots(parent, { input }, ctx) {
    const userId = getUserId(ctx)
    const creator = await ctx.prisma.user({ id: input.creatorId })
    const user = await ctx.prisma.user({ id: userId })
    const timeslotPlayers = []

    // Check to see if Stripe should be used
    const shouldCharge = input.totalWithFee > 0
    const charged = shouldCharge
      ? await stripe.charges.create({
          amount: input.totalWithFee * 100,
          currency: 'usd',
          customer: user.customerStripeId,
          transfer_data: {
            amount: input.totalWithoutFee * 100 * 0.8,
            destination: creator.connectedStripeId,
          },
        })
      : true
    if (shouldCharge && !charged) {
      done(null, false)
    }
    const bookedTimeslots = _.map(input.timeSlots, 'timeSlotId')
    const lock = new AsyncLock({ timeout: 5000 })
    const booked = await lock.acquire(bookedTimeslots, async done => {
      let timeSlotsBought = []
      for (const timeslot of input.timeSlots) {
        const QUERY = `
        {
          gamingTimeSlot(where: {id: "${timeslot.timeSlotId}"}) {
            slotsLeft
            gamers {
              id
            }
            gamingSession {
              game {
                name
              }
            }
          }
        }
      `
        const {
          gamingTimeSlot: {
            slotsLeft,
            gamers,
            gamingSession: { game },
          },
        } = await ctx.prisma.$graphql(QUERY)
        const notifications = []
        const invites = []
        // add notifications
        _.each(gamers, gamer => {
          notifications.push({
            for: {
              connect: {
                id: gamer.id,
              },
            },
            type: 'BOOKED_TIMESLOT',
            text: `${user.username} booked a timeslot for ${game.name}`,
          })
        })
        // Add booking invites
        if (timeslot.players > 1) {
          _.times(timeslot.slots - 1, () => {
            invites.push({
              from: {
                connect: {
                  id: userId,
                },
              },
              startTime: timeslot.startTime,
              sent: false,
            })
          })
        }
        // add the players
        _.times(timeslot.slots, () =>
          timeslotPlayers.push({
            player: {
              connect: { id: userId },
            },
            timeslot: { connect: { id: timeslot.timeSlotId } },
          })
        )

        // Create the booking with all the fields already created
        const timeslotBought = await ctx.prisma.createBooking({
          charge: shouldCharge ? charged.id : null,
          total: timeslot.total,
          numSlots: timeslot.slots,
          numPlayers: timeslot.players,
          timeslot: {
            connect: {
              id: timeslot.timeSlotId,
            },
          },
          bookee: {
            connect: {
              id: userId,
            },
          },
          players: {
            create: timeslotPlayers,
          },
          notifications: {
            create: notifications,
          },
          invites: {
            create: invites,
          },
        })
        // Get player for updatedTimeSlot
        const players = await ctx.prisma
          .booking({ id: timeslotBought.id })
          .players()
        const player = players[0]
        timeSlotsBought.push(timeslotBought)
        _.times(timeslot.slots - 1, async () => {
          await ctx.prisma.updateGamingTimeSlot({
            data: {
              slotsLeft: slotsLeft - timeslot.slots,
              players: {
                connect: {
                  id: player.id,
                },
              },
            },
            where: {
              id: timeslot.timeSlotId,
            },
          })
        })
      }
      const booked = timeSlotsBought.length > 0
      done(null, booked)
    })
    return {
      booked,
    }
  },
}

module.exports = { timeslot }
