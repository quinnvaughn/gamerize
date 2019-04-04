const FriendRequest = {
  to: async (parent, _, { prisma }) => {
    return await prisma.friendRequest({ id: parent.id }).to()
  },
  from: async (parent, _, { prisma }) => {
    return await prisma.friendRequest({ id: parent.id }).from()
  },
}

module.exports = {
  FriendRequest,
}
