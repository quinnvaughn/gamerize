const gamer = {
  async getGamers(parent, { first }, { prisma }) {
    return await prisma.users({ where: { isGamer: true }, first })
  },
}

module.exports = { gamer }
