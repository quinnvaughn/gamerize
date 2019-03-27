const game = {
  async allGames(parent, { first, orderBy }, { prisma }) {
    return await prisma.games({
      orderBy: orderBy ? orderBy : 'name_ASC',
      first,
    })
  },
}

module.exports = { game }
