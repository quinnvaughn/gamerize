const Game = {
  sessions: async (parent, _, { prisma }) => {
    return await prisma
      .game({ id: parent.id })
      .sessions({ where: { retired: false }, orderBy: 'views_DESC' })
  },
}

module.exports = { Game }
