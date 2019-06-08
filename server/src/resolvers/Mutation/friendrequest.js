const { getUserId } = require('../../utils')
const friendrequest = {
  async cancelFriendRequest(parent, { input }, ctx) {
    const userId = getUserId(ctx)
    const request = await ctx.prisma.friendRequests({
      where: {
        from: { id: userId },
        to: { username: input.username },
      },
    })
    const deleted = await ctx.prisma.deleteFriendRequest({ id: request[0].id })
    return deleted ? { cancelled: true } : { cancelled: false }
  },
  async sendFriendRequest(parent, { input }, ctx) {
    const userId = getUserId(ctx)
    // Check if there is already a pending one.Prevent if so.
    const user = await ctx.prisma.user({ id: userId })
    const friendRequest = await ctx.prisma.createFriendRequest({
      to: {
        connect: {
          username: input.username,
        },
      },
      from: {
        connect: {
          id: userId,
        },
      },
      notification: {
        create: {
          type: 'FRIEND_REQUEST',
          text: `${user.username} sent you a friend request`,
          for: {
            connect: {
              username: input.username,
            },
          },
        },
      },
    })
    return friendRequest ? { sent: true } : { sent: false }
  },
  async acceptFriendRequest(parent, { input }, ctx) {
    const userId = getUserId(ctx)
    if (input.friendRequestId) {
      const QUERY = `
        {
          friendRequest(where: {id: "${input.friendRequestId}"}) {
            to {
              username
            }
            from {
              username
            }
          }
        }
      `
      const {
        friendRequest: { to, from },
      } = await ctx.prisma.$graphql(QUERY)
      const updatedTo = await ctx.prisma.updateUser({
        where: { username: to.username },
        data: {
          friends: {
            connect: {
              username: from.username,
            },
          },
        },
      })
      const updatedFrom = await ctx.prisma.updateUser({
        where: { username: from.username },
        data: {
          friends: {
            connect: {
              username: to.username,
            },
          },
        },
      })
      const deletedFriendRequest = await ctx.prisma.deleteFriendRequest({
        id: input.friendRequestId,
      })
      // send notification to friendRequest from that it was accepted.
      const createdNotification = await ctx.prisma.createNotification({
        type: 'ACCEPTED_FRIEND_REQUEST',
        text: `${to.username} accepted your friend request`,
        for: {
          connect: {
            username: from.username,
          },
        },
      })
      return createdNotification &&
        updatedFrom &&
        updatedTo &&
        deletedFriendRequest
        ? { accepted: true }
        : { accepted: false }
    } else if (input.username) {
      const QUERY = `
        {
          friendRequests(where: {
            OR: [
              {
                to: {
                  username: "${input.username}"
                },
                from: {
                  id: "${userId}"
                }
              },
              {
                to: {
                  id: "${userId}"
                }
                from: {
                  username: "${input.username}"
                }
              }
            ]
          }) {
            id
            to {
              username
            }
            from {
              username
            }
          }
        }
      `
      const { friendRequests } = await ctx.prisma.$graphql(QUERY)
      const { to, from, id } = friendRequests[0]
      const updatedTo = await ctx.prisma.updateUser({
        where: { username: to.username },
        data: {
          friends: {
            connect: {
              username: from.username,
            },
          },
        },
      })
      const updatedFrom = await ctx.prisma.updateUser({
        where: { username: from.username },
        data: {
          friends: {
            connect: {
              username: to.username,
            },
          },
        },
      })
      const createdNotification = await ctx.prisma.createNotification({
        type: 'ACCEPTED_FRIEND_REQUEST',
        text: `${to.username} accepted your friend request`,
        for: {
          connect: {
            username: from.username,
          },
        },
      })
      const deletedFriendRequest = await ctx.prisma.deleteFriendRequest({
        id,
      })
      return deletedNotification &&
        createdNotification &&
        updatedFrom &&
        updatedTo &&
        deletedFriendRequest
        ? { accepted: true }
        : { accepted: false }
    }
  },
  async declineFriendRequest(parent, { input }, ctx) {
    const userId = getUserId(ctx)
    if (input.friendRequestId) {
      const deletedFriendRequest = await ctx.prisma.deleteFriendRequest({
        id: input.friendRequestId,
      })
      return deletedFriendRequest ? { declined: true } : { declined: false }
    } else if (input.username) {
      const QUERY = `
        {
          friendRequests(where: {
            OR: [
              {
                to: {
                  username: "${input.username}"
                },
                from: {
                  id: "${userId}"
                }
              },
              {
                to: {
                  id: "${userId}"
                }
                from: {
                  username: "${input.username}"
                }
              }
            ]
          }) {
            id
          }
        }
      `
      const { friendRequests } = await ctx.prisma.$graphql(QUERY)
      const { id } = friendRequests[0]
      const deletedFriendRequest = await ctx.prisma.deleteFriendRequest({
        id,
      })
      return updatedFrom && updatedTo && deletedFriendRequest
        ? { deleted: true }
        : { deleted: false }
    }
  },
}

module.exports = { friendrequest }
