const { getUserId } = require('../../utils')
const dateFns = require('date-fns')
const { DateTime } = require('luxon')

const timeslot = {
  async thatDaySessions(parent, { day, today, timeZone }, ctx) {
    const userId = getUserId(ctx)
    if (today) {
      return await ctx.prisma.gamingTimeSlots({
        where: {
          AND: [
            { gamers_some: { id: userId } },
            {
              startTime_gte: dateFns.startOfDay(
                DateTime.local()
                  .setZone(timeZone)
                  .toISO()
              ),
            },
            {
              startTime_lte: dateFns.endOfDay(
                DateTime.local()
                  .setZone(timeZone)
                  .toISO()
              ),
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
              startTime_gte: dateFns.startOfDay(
                DateTime.fromISO(day)
                  .setZone(timeZone)
                  .toISO()
              ),
            },
            {
              startTime_lte: dateFns.endOfDay(
                DateTime.fromISO(day)
                  .setZone(timeZone)
                  .toISO()
              ),
            },
          ],
        },
      })
    }
  },
  async gamerSessionsSpecificDay(parent, { day, gamer, timeZone }, ctx) {
    return await ctx.prisma.gamingTimeSlots({
      where: {
        gamers_some: { username: gamer },
        startTime_gte: dateFns.startOfDay(
          DateTime.fromISO(day)
            .setZone(timeZone)
            .toISO()
        ),
        startTime_lte: dateFns.endOfDay(
          DateTime.fromISO(day)
            .setZone(timeZone)
            .toISO()
        ),
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
            startTime_gte: DateTime.local()
              .setZone(timeZone)
              .toISO(),
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
            startTime_gte: dateFns.startOfDay(
              DateTime.local()
                .setZone(timeZone)
                .toISO()
            ),
          },
          {
            startTime_lte: dateFns.endOfDay(
              DateTime.local()
                .setZone(timeZone)
                .toISO()
            ),
          },
        ],
      },
    })
  },
}

module.exports = { timeslot }
