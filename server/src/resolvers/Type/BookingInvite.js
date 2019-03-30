const BookingInvite = {
  to: async (parent, _, { prisma }) => {
    return await prisma.bookingInvite({ id: parent.id }).to()
  },
  from: async (parent, _, { prisma }) => {
    return await prisma.bookingInvite({ id: parent.id }).from()
  },
  booking: async (parent, _, { prisma }) => {
    return await prisma.bookingInvite({ id: parent.id }).booking()
  },
}

module.exports = { BookingInvite }
