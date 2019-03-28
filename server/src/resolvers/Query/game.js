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
}

module.exports = { game }
