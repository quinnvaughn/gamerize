const gamer = {
  async getGamers(parent, { first }, { prisma }) {
    return await prisma.users({
      where: { role: 'GAMER', gamerIsSetUp: true },
      first,
    })
  },
  async totalGamers(parent, _, { prisma }) {
    return await prisma
      .usersConnection({ where: { role: 'GAMER', gamerIsSetUp: true } })
      .aggregate()
      .count()
  },
}

module.exports = { gamer }
