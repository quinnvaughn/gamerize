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
    const updatedIndex = await ctx.prisma.updateUserIndex({
      where: { username: user.username.toLowerCase() },
      data: {
        name: rest.name.toLowerCase(),
        displayName: rest.displayName.toLowerCase(),
      },
    })
    return updated && updatedIndex ? { updated: true } : { updated: false }
  },
  async viewUserProfile(parent, { input }, ctx) {
    const QUERY = `
    {
      user(where:{username:"${input.username}"}) {
        views
      }
    }
    `
    const {
      user: { views },
    } = await ctx.prisma.$graphql(QUERY)
    const newViews = views ? views : 0
    const updatedUser = await ctx.prisma.updateUser({
      data: {
        views: newViews + 1,
      },
      where: {
        username: input.username,
      },
    })
    return updatedUser ? { viewed: true } : { viewed: false }
  },
}

module.exports = { user }
