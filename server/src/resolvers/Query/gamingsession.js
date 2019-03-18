const { getUserId } = require('../../utils')
const dateFns = require('date-fns')

const gamingsession = {
  async todaySessions(parent, _, ctx) {
    const userId = getUserId(ctx)
    return await ctx.prisma.individualGamingSessions({
      where: {
        AND: [
          { gamers_some: { id: userId } },
          { startTime_gte: dateFns.startOfDay(new Date()) },
          { startTime_lte: dateFns.endOfDay(new Date()) },
        ],
      },
    })
  },
}

module.exports = { gamingsession }
