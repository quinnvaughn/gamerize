const Game = {
  sessions: async (parent, _, { prisma }) => {
    return await prisma.game({ id: parent.id }).sessions()
  },
}

module.exports = { Game }
