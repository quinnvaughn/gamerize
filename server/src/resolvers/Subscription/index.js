const { getUserId } = require('../../utils')

const Subscription = {
  gamerEditsTimeslots: {
    subscribe: async (parent, args, context) => {
      const userId = getUserId(ctx)
      const createdAndDeletedTimeSlot = await ctx.prisma.$subscribe.gamingTimeSlot(
        {
          mutation_in: ['CREATED'],
        }
      )
      console.log(createdAndDeletedTimeSlot)
    },
    resolve: payload => {
      return payload
    },
  },
}

module.exports = { Subscription }
