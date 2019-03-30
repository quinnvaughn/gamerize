const Booking = {
  timeslot: async (parent, _, { prisma }) => {
    return await prisma.booking({ id: parent.id }).timeslot()
  },
}

module.exports = { Booking }
