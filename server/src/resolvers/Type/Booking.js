const Booking = {
  timeslot: async (parent, _, { prisma }) => {
    return await prisma.booking({ id: parent.id }).timeslot()
  },
  bookee: async (parent, _, { prisma }) => {
    return await prisma.booking({ id: parent.id }).bookee()
  },
}

module.exports = { Booking }
