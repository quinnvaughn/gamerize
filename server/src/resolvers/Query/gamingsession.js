const gamingsession = {
  async getSpecificSession(parent, { sessionId }, { prisma }) {
    return await prisma.gamingSession({ id: sessionId })
  },
}

module.exports = { gamingsession }
