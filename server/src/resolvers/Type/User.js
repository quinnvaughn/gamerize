const { getUserId } = require('../../utils')

const User = {
  currentGamerRequest: async (parent, _, ctx) => {
    const alreadyRequested = await ctx.prisma.gamerRequests({
      where: { user: { id: parent.id } },
    })
    return alreadyRequested.length === 1 ? true : false
  },
  areWeFriends: async (parent, _, ctx) => {
    try {
      const userId = getUserId(ctx)
      const friends = await ctx.prisma
        .user({ id: parent.id })
        .friends({ where: { id: userId } })
      return friends.length > 0 ? true : false
    } catch (e) {
      if (e) return false
    }
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
  savedCards: async (parent, _, { prisma }) => {
    return await prisma.user({ id: parent.id }).savedCards()
  },
  sentMeAFriendRequest: async (parent, _, ctx) => {
    try {
      const userId = getUserId(ctx)
      const sentRequest = await ctx.prisma.friendRequests({
        where: {
          to: { id: userId },
          from: { id: parent.id },
        },
      })
      return sentRequest.length > 0 ? true : false
    } catch (e) {
      if (e) return false
    }
  },
  sentFriendRequest: async (parent, _, ctx) => {
    try {
      const userId = getUserId(ctx)
      const sentRequest = await ctx.prisma.friendRequests({
        where: {
          to: { id: parent.id },
          from: { id: userId },
        },
      })
      return sentRequest.length > 0 ? true : false
    } catch (e) {
      if (e) return false
    }
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
  numSessions: async (parent, _, ctx) => {
    const QUERY = `
      {
        gamingSessionsConnection(where: {
          gamers_some: {
            id: "${parent.id}"
          },
          retired: false
        }) {
          aggregate {
            count
          }
        }
      }
    `
    const {
      gamingSessionsConnection: {
        aggregate: { count },
      },
    } = await ctx.prisma.$graphql(QUERY)
    return count
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
              picture
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
        res[v.name] = { count: (res[v.name] || 0) + 1, picture: v.picture }
      })
    return Object.keys(res)
      .map(key => ({
        picture: res[key].picture,
        name: key,
        count: res[key].count,
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
