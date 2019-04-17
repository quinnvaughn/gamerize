const search = {
  async searchGamerize(parent, { search }, { prisma }) {
    const undercaseSearch = search.toLowerCase()
    const users = await prisma
      .userIndexes({
        where: {
          OR: [
            { name_contains: undercaseSearch },
            { username_contains: undercaseSearch },
          ],
        },
        first: 4,
      })
      .user()
    const userSearchResults = users.map(user => ({
      type: 'USER',
      user: { ...user.user },
    }))
    const games = await prisma
      .gameIndexes({
        where: {
          OR: [
            { name_contains: undercaseSearch },
            { launcher_contains: undercaseSearch },
          ],
        },
        first: 4,
      })
      .game()
    const gameSearchResults = games.map(game => ({
      type: 'GAME',
      game: { ...game.game },
    }))
    const sessions = await prisma
      .gamingSessionIndexes({
        where: {
          OR: [
            { title_contains: undercaseSearch },
            { gamer_contains: undercaseSearch },
          ],
        },
        first: 4,
      })
      .gamingSession()
    const gamingSessionSearchResults = sessions.map(session => ({
      type: 'SESSION',
      session: { ...session.gamingSession },
    }))
    const results = [
      ...userSearchResults,
      ...gameSearchResults,
      ...gamingSessionSearchResults,
    ]
    return results
  },
  async moreSessions(parent, { search, skip }, { prisma }) {
    const undercaseSearch = search.toLowerCase()
    const sessions = await prisma
      .gamingSessionIndexes({
        where: {
          OR: [
            { title_contains: undercaseSearch },
            { gamer_contains: undercaseSearch },
          ],
        },
        first: 10,
        skip,
      })
      .gamingSession()
    return sessions.map(session => ({
      ...session.gamingSession,
    }))
  },
  async moreGames(parent, { search, skip }, { prisma }) {
    const undercaseSearch = search.toLowerCase()
    const games = await prisma
      .gameIndexes({
        where: {
          OR: [
            { name_contains: undercaseSearch },
            { launcher_contains: undercaseSearch },
          ],
        },
        first: 10,
        skip,
      })
      .game()
    return games.map(game => ({
      ...game.game,
    }))
  },
  async moreUsers(parent, { search, skip }, { prisma }) {
    const undercaseSearch = search.toLowerCase()
    const users = await prisma
      .userIndexes({
        where: {
          OR: [
            { name_contains: undercaseSearch },
            { username_contains: undercaseSearch },
          ],
        },
        first: 10,
        skip,
      })
      .user()
    return users.map(user => ({
      ...user.user,
    }))
  },
}

module.exports = {
  search,
}
