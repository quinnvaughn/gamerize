const Notification = {
  friendRequest: async (parent, _, { prisma }) => {
    return await prisma.notification({ id: parent.id }).friendRequest()
  },
  bookingInvite: async (parent, _, { prisma }) => {
    return await prisma.notification({ id: parent.id }).bookingInvite()
  },
  booking: async (parent, _, { prisma }) => {
    return await prisma.notification({ id: parent.id }).booking()
  },
}

module.exports = {
  Notification,
}
