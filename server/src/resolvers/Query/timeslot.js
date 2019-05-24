const { getUserId } = require('../../utils')
const dateFns = require('date-fns')
const { DateTime } = require('luxon')
const moment = require('moment-timezone')

const timeslot = {
  async thatDaySessions(parent, { day, today, timeZone }, ctx) {
    const userId = getUserId(ctx)
    if (today) {
      return await ctx.prisma.gamingTimeSlots({
        where: {
          AND: [
            { gamers_some: { id: userId } },
            {
              startTime_gte: moment
                .tz(timeZone)
                .startOf('day')
                .utc()
                .toDate(),
            },
            {
              startTime_lte: moment
                .tz(timeZone)
                .endOf('day')
                .utc()
                .toDate(),
            },
          ],
        },
      })
    } else {
      return await ctx.prisma.gamingTimeSlots({
        where: {
          AND: [
            { gamers_some: { id: userId } },
            {
              startTime_gte: moment
                .tz(day, timeZone)
                .startOf('day')
                .utc()
                .toDate(),
            },
            {
              startTime_lte: moment
                .tz(day, timeZone)
                .endOf('day')
                .utc()
                .toDate(),
            },
          ],
        },
      })
    }
  },
  async specificSessionForGamerDay(parent, { day, sessionId, timeZone }, ctx) {
    return await ctx.prisma.gamingTimeSlots({
      where: {
        AND: [
          { gamingSession: { id: sessionId } },
          {
            startTime_gte: moment
              .tz(day, timeZone)
              .startOf('day')
              .utc()
              .toDate(),
          },
          {
            startTime_lte: moment
              .tz(day, timeZone)
              .endOf('day')
              .utc()
              .toDate(),
          },
        ],
      },
    })
  },
  async gamerSessionsSpecificDay(parent, { gamer, timeZone }, ctx) {
    return await ctx.prisma.gamingTimeSlots({
      where: {
        AND: [
          { gamers_some: { username: gamer } },
          {
            startTime_gte: moment
              .tz(timeZone)
              .startOf('day')
              .utc()
              .toDate(),
          },
          {
            startTime_lte: moment
              .tz(timeZone)
              .endOf('day')
              .utc()
              .toDate(),
          },
        ],
      },
    })
  },
  async nextTimeSlot(parent, { timeZone }, ctx) {
    const userId = getUserId(ctx)
    const sessions = await ctx.prisma.gamingTimeSlots({
      where: {
        AND: [
          { gamers_some: { id: userId } },
          {
            startTime_gte: moment
              .tz(timeZone)
              .utc()
              .toDate(),
          },
        ],
      },
      orderBy: 'startTime_ASC',
    })
    return sessions[0]
  },
  async specificSessionSlotsToday(parent, { sessionId, timeZone }, ctx) {
    return await ctx.prisma.gamingTimeSlots({
      where: {
        AND: [
          { gamingSession: { id: sessionId } },
          {
            startTime_gte: moment
              .tz(timeZone)
              .startOf('day')
              .utc()
              .toDate(),
          },
          {
            startTime_lte: moment
              .tz(timeZone)
              .endOf('day')
              .utc()
              .toDate(),
          },
        ],
      },
    })
  },
}

module.exports = { timeslot }
