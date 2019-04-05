const GamerTag = {
  pc: async (parent, _, { prisma }) => {
    return await prisma.gamerTag({ id: parent.id }).pc()
  },
}

module.exports = { GamerTag }
