const gamer = {
  async getGamers(parent, { first }, { prisma }) {
    return await prisma.users({
      where: { role: 'GAMER', gamerIsSetup: true },
      first,
    })
  },
  async totalGamers(parent, _, { prisma }) {
    return await prisma
      .usersConnection({ where: { role: 'GAMER' } })
      .aggregate()
      .count()
  },
}

module.exports = { gamer }
