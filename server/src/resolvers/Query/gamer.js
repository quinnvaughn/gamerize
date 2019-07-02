const gamer = {
  async getGamers(parent, { first }, { prisma }) {
    return await prisma.users({
      where: { role: 'GAMER', gamerIsSetup: true },
      orderBy: 'views_DESC',
      first,
    })
  },
  async totalGamers(parent, _, { prisma }) {
    return await prisma
      .usersConnection({ where: { role: 'GAMER', gamerIsSetup: true } })
      .aggregate()
      .count()
  },
}

module.exports = { gamer }
