const game = {
  async allGames(parent, { search }, { prisma }) {
    return await prisma.games()
  },
}

module.exports = { game }
