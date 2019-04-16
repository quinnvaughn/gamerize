const { getUserId } = require('../../utils')
const dateFns = require('date-fns')

const timeslot = {
  async mySlotsToday(parent, _, ctx) {
    const userId = getUserId(ctx)
    return await ctx.prisma.gamingTimeSlots({
      where: {
        AND: [
          { gamers_some: { id: userId } },
          { startTime_gte: dateFns.startOfDay(new Date()) },
          { startTime_lte: dateFns.endOfDay(new Date()) },
        ],
      },
    })
  },
  async thatDaySessions(parent, { day }, ctx) {
    const userId = getUserId(ctx)
    return await ctx.prisma.gamingTimeSlots({
      where: {
        AND: [
          { gamers_some: { id: userId } },
          { startTime_gte: dateFns.startOfDay(new Date(day)) },
          { startTime_lte: dateFns.endOfDay(new Date(day)) },
        ],
      },
    })
  },
  async gamerSessionsSpecificDay(parent, { day, gamer }, ctx) {
    return await ctx.prisma.gamingTimeSlots({
      where: {
        gamers_some: { username: gamer },
        startTime_gte: dateFns.startOfDay(new Date(day)),
        startTime_lte: dateFns.endOfDay(new Date(day)),
      },
    })
  },
  async nextTimeSlot(parent, _, ctx) {
    const userId = getUserId(ctx)
    const sessions = await ctx.prisma.gamingTimeSlots({
      where: {
        AND: [{ gamers_some: { id: userId } }, { startTime_gte: new Date() }],
      },
      orderBy: 'startTime_ASC',
    })
    return sessions[0]
  },
  async specificSessionSlotsToday(parent, { sessionId }, ctx) {
    return await ctx.prisma.gamingTimeSlots({
      where: {
        AND: [
          { gamingSession: { id: sessionId } },
          { startTime_gte: dateFns.startOfDay(new Date()) },
          { startTime_lte: dateFns.endOfDay(new Date()) },
        ],
      },
    })
  },
}

module.exports = { timeslot }
