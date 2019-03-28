const gamer = {
  async getGamers(parent, { first }, { prisma }) {
    return await prisma.users({ where: { isGamer: true }, first })
  },
  async totalGamers(parent, _, { prisma }) {
    return await prisma
      .usersConnection({ where: { isGamer: true } })
      .aggregate()
      .count()
  },
}

module.exports = { gamer }
