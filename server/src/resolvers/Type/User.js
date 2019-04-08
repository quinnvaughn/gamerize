const { getUserId } = require('../../utils')

const User = {
  currentGamerRequest: async (parent, _, ctx) => {
    const alreadyRequested = await ctx.prisma.gamerRequests({
      where: { user: { id: parent.id } },
    })
    return alreadyRequested.length === 1 ? true : false
  },
  areWeFriends: async (parent, _, ctx) => {
    const userId = getUserId(ctx)
    const friends = await ctx.prisma
      .user({ id: parent.id })
      .friends({ where: { id: userId } })
    return friends.length > 0 ? true : false
  },
  invites: async (parent, _, { prisma }) => {
    return await prisma.user({ id: parent.id }).invites()
  },
  invitesReceived: async (parent, _, { prisma }) => {
    return await prisma.user({ id: parent.id }).invitesReceived()
  },
  gamertags: async (parent, _, { prisma }) => {
    return await prisma.user({ id: parent.id }).gamertags()
  },
  sessions: async (parent, _, ctx) => {
    return await ctx.prisma.user({ id: parent.id }).sessions()
  },
  timeSlots: async (parent, _, ctx) => {
    return await ctx.prisma.user({ id: parent.id }).timeSlots()
  },
  timeSlotsBooked: async (parent, _, { prisma }) => {
    return await prisma.user({ id: parent.id }).timeSlotsBooked()
  },
  sentMeAFriendRequest: async (parent, _, ctx) => {
    const userId = getUserId(ctx)
    const sentRequest = await ctx.prisma.friendRequests({
      where: {
        to: { id: userId },
        from: { id: parent.id },
      },
    })
    return sentRequest.length > 0 ? true : false
  },
  sentFriendRequest: async (parent, _, ctx) => {
    const userId = getUserId(ctx)
    const sentRequest = await ctx.prisma.friendRequests({
      where: {
        to: { id: parent.id },
        from: { id: userId },
      },
    })
    return sentRequest.length > 0 ? true : false
  },
  sessionIsGoingOn: async (parent, _, ctx) => {
    const currentTime = new Date()
    const session = await ctx.prisma.user({ id: parent.id }).timeSlots({
      where: {
        startTime_lte: currentTime,
        endTime_gt: currentTime,
      },
    })
    return session.length > 0
      ? { session: session[0], goingOn: true }
      : { goingOn: false }
  },
  mostPlayedGames: async (parent, _, { prisma }) => {
    const QUERY = `
      {
        gamingTimeSlots(where: {
          gamers_some: {
            id: "${parent.id}"
          }
        }) {
          gamingSession {
            game {
              name
            }
          }
        }
      }
    `
    const { gamingTimeSlots } = await prisma.$graphql(QUERY)
    const res = {}
    gamingTimeSlots
      .map(({ gamingSession }) => gamingSession.game)
      .forEach(v => {
        res[v.name] = (res[v.name] || 0) + 1
      })
    return Object.keys(res)
      .map(key => ({
        name: key,
        count: res[key],
      }))
      .sort((a, b) => {
        return b.count - a.count
      })
      .slice(0, 3)
  },
  numReviews: async (parent, _, { prisma }) => {
    const reviews = await prisma.user({ id: parent.id }).reviews()
    return reviews.length
  },
  reviews: async (parent, _, { prisma }) => {
    return await prisma.user({ id: parent.id }).reviews()
  },
  reviewRating: async (parent, _, { prisma }) => {
    const reviews = await prisma.user({ id: parent.id }).reviews()
    const reducer = (acc, cur) => acc + cur.rating
    if (reviews.length === 0) {
      return 0
    } else {
      return reviews.reduce(reducer, 0) / reviews.length
    }
  },
}

module.exports = {
  User,
}
