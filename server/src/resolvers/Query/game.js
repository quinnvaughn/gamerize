const game = {
  async searchGames(parent, { search }, { prisma }) {
    const games = await prisma.gameIndexes({}).game()
    const newGames = games.map(game => game.game)
    return newGames
  },
}

module.exports = { game }
