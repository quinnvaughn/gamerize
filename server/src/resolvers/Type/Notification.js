const Notification = {
  friendRequest: async (parent, _, { prisma }) => {
    return await prisma.notification({ id: parent.id }).friendRequest()
  },
  bookingInvite: async (parent, _, { prisma }) => {
    return await prisma.notification({ id: parent.id }).bookingInvite()
  },
}

module.exports = {
  Notification,
}
