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
    const userId = getUserId(ctx)
    const query = `
      query {
        user(where: {id: "${String(userId)}"}) {
          sessions(where: {id: "${input.gamingSessionId}"}) {
              length 
              gamers {
                id
              }
          }
        }
      }
    `
    const result = await ctx.prisma.$graphql(query)
    const sessions = result.user.sessions[0]
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
}

module.exports = { gamingsession }
