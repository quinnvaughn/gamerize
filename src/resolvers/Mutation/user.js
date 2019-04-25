const { getUserId, AuthError } = require('../../utils')
// const dateFns = require('date-fns')
const user = {
  async updateUserProfile(
    parent,
    {
      input: {
        gamertags: { pc, ...gts },
        ...rest
      },
    },
    ctx
  ) {
    const userId = getUserId(ctx)
    const updated = await ctx.prisma.updateUser({
      where: { id: userId },
      data: {
        gamertags: {
          upsert: {
            update: {
              ...gts,
              pc: {
                update: {
                  ...pc,
                },
              },
            },
            create: {
              ...gts,
              pc: {
                create: {
                  ...pc,
                },
              },
            },
          },
        },
        ...rest,
      },
    })
    return updated ? { updated: true } : { updated: false }
  },
}

module.exports = { user }
