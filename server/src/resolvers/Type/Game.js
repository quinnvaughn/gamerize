const Game = {
  sessions: async (parent, _, { prisma }) => {
    return await prisma
      .game({ id: parent.id })
      .sessions({ where: { retired: false } })
  },
}

module.exports = { Game }
