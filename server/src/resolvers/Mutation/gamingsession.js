const { getUserId, addMinutes } = require('../../utils')
const dateFns = require('date-fns')
const gamingsession = {
  async createGamingSession(parent, { input }, ctx) {
    const userId = getUserId(ctx)
    const gamingSession = await ctx.prisma.createGamingSession({
      game: { connect: { name: input.gameName } },
      title: input.title,
      length: input.length,
      price: input.price,
      gamers: {
        connect: [{ id: userId }],
      },
    })
    await ctx.prisma.createGamingSessionIndex({
      title: input.title,
      gamingSession: { connect: { id: gamingSession.id } },
    })
    return gamingSession
      ? { gamingSession, created: true }
      : {
          msg:
            'There was an error creating the game session. Please try again.',
          created: false,
        }
  },
  async createIndividualGamingSession(parent, { input }, ctx) {
    const query = `
    {
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
    const endTime = addMinutes(input.startTime, sessions.length)
    const gamers = sessions.gamers
    if (!gamers) {
      return {
        created: false,
        msg: 'You cannot add an individual session to not your own session',
      }
    }
    const overlap = await ctx.prisma.individualGamingSessions({
      where: {
        AND: [
          {
            endTime_gte: input.startTime,
          },
          {
            startTime_lte: endTime,
          },
        ],
      },
    })
    if (overlap.length === 0) {
      const individualGamingSession = await ctx.prisma.createIndividualGamingSession(
        {
          startTime: input.startTime,
          endTime,
          gamingSession: { connect: { id: input.gamingSessionId } },
          gamers: { connect: gamers },
          slots: sessions.slots,
        }
      )
      return { created: true, individualGamingSession }
    } else {
      const dateFormat = 'h:mm aa'
      return {
        created: false,
        overlap: true,
        msg: `Session overlaps session from ${dateFns.format(
          overlap[0].startTime,
          dateFormat
        )}-${dateFns.format(overlap[0].endTime, dateFormat)}`,
      }
    }
  },
  async createBulkSessions(parent, { input }, ctx) {
    const userId = getUserId(ctx)
    const query = `
    {
          user(where: {id: "${userId}"}) {
            buffer
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
    const session = result.gamingSession
    const buffer = result.user.buffer
    const gamers = session.gamers
    const sessionLength = session.length + buffer
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
      const overlap = await ctx.prisma.individualGamingSessions({
        where: {
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
        const individualGamingSession = await ctx.prisma.createIndividualGamingSession(
          {
            startTime: counterStart,
            endTime: counterEnd,
            gamingSession: { connect: { id: input.gamingSessionId } },
            gamers: { connect: gamers },
            slots: session.slots,
          }
        )
        counterStart = individualGamingSession.endTime
        counterEnd = addMinutes(counterStart, sessionLength)
        sessions = [...sessions, individualGamingSession]
      } else {
        overlaps = [...overlap]
      }
    }
    if (sessions.length > 0) {
      return { created: true, overlaps, sessions }
    } else {
      return {
        created: false,
        msg: 'Unable to add any sessions. Please try different times.',
        overlaps,
        sessions,
      }
    }
  },
}

module.exports = { gamingsession }
