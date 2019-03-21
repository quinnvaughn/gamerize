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
      type: input.type,
      slots: input.slots,
      systems: { set: input.systems },
      requirements: { create: input.requirements },
      discounts: { create: input.discounts },
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
    const sessions = result.gamingSession
    const buffer = result.user.buffer
    const sessionLength = sessions.length + buffer
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
    const overlap = await ctx.prisma.individualGamingSessions({
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
      const individualGamingSession = await ctx.prisma.createIndividualGamingSession(
        {
          startTime: input.startTime,
          endTime,
          gamingSession: { connect: { id: input.gamingSessionId } },
          gamers: { connect: gamers },
          slots: sessions.slots,
        }
      )
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
      let successMsg = []
      for (const session in sessions) {
        successMsg = [
          ...successMsg,
          `Session added from ${sessions[session].startTime}-${
            sessions[session].endTime
          }`,
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
  async addMinutesToSession(parent, { input }, ctx) {
    const userId = getUserId(ctx)
    const session = await ctx.prisma.individualGamingSession({
      id: input.sessionId,
    })
    const newEnd = addMinutes(session.endTime, input.minutes)
    let overlaps = await ctx.prisma.individualGamingSessions({
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
        await ctx.prisma.updateIndividualGamingSession({
          where: { id: overlaps[session].id },
          data: {
            startTime,
            endTime,
          },
        })
      }
      let newOverlaps = await ctx.prisma.individualGamingSessions({
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
    const updatedSession = await ctx.prisma.updateIndividualGamingSession({
      where: { id: session.id },
      data: {
        endTime: newEnd,
      },
    })
    return { updatedSession }
  },
}

module.exports = { gamingsession }
