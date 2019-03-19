const game = {
  async createGame(parent, { input }, { prisma }) {
    const lowercaseTags = input.tags.map(tag => tag.toLowerCase())
    const game = await prisma.createGame({
      name: input.name,
      tags: { set: input.tags },
    })
    await prisma.createGameIndex({
      name: input.name,
      game: { connect: { id: game.id } },
      tags: { set: lowercaseTags },
    })
    return game
      ? { game, created: true }
      : {
          msg: 'There was an error creating the game. Please try again.',
          created: false,
        }
  },
}

module.exports = { game }
