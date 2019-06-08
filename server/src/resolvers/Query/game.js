const game = {
  async allGames(parent, { first, orderBy }, { prisma }) {
    return await prisma.games({
      orderBy: orderBy ? orderBy : 'name_ASC',
      first,
    })
  },
  async totalGames(parent, _, { prisma }) {
    return await prisma
      .gamesConnection()
      .aggregate()
      .count()
  },
  async specificGame(parent, { name }, { prisma }) {
    return await prisma.game({ name })
  },
}

module.exports = { game }
