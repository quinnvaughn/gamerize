const GamingSession = {
  game: (parent, _, { prisma }) =>
    prisma.gamingSession({ id: parent.id }).game(),
  gamers: (parent, _, { prisma }) =>
    prisma.gamingSession({ id: parent.id }).gamers(),
  reviews: (parent, _, { prisma }) =>
    prisma.gamingSession({ id: parent.id }).reviews(),
}

module.exports = {
  GamingSession,
}
