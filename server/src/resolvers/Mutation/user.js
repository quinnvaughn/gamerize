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
    const user = await ctx.prisma.user({ id: userId })
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
    const gamertags = await ctx.prisma
      .user({ id: userId })
      .gamertags()
      .pc()
    console.log(gamertags)
    const updatedIndex = await ctx.prisma.updateUserIndex({
      where: { username: user.username.toLowerCase() },
      data: {
        name: rest.name.toLowerCase(),
        displayName: rest.displayName.toLowerCase(),
      },
    })
    return updated && updatedIndex ? { updated: true } : { updated: false }
  },
}

module.exports = { user }
