const BookedPlayer = {
  player: async (parent, _, ctx) => {
    return await ctx.prisma
      .bookedPlayer({
        id: parent.id,
      })
      .player()
  },
}

module.exports = {
  BookedPlayer,
}
