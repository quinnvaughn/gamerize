const game = {
  async createGame(parent, { input }, { prisma }) {
    const lowercaseTags = input.tags.map(tag => tag.toLowerCase())
    const lowercaseName = input.name.toLowerCase()
    const lowercaseLauncher = input.launcher.toLowerCase()
    const game = await prisma.createGame({
      name: input.name,
      tags: { set: input.tags },
      launcher: input.launcher,
    })
    await prisma.createGameIndex({
      name: lowercaseName,
      game: { connect: { id: game.id } },
      tags: { set: lowercaseTags },
      launcher: lowercaseLauncher,
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
