const { getUserId, AuthError } = require('../../utils')
const dateFns = require('date-fns')
const bcrypt = require('bcryptjs')
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
  async updatePassword(parent, { input }, { prisma }) {
    const response = await prisma.users({
      where: {
        resetPasswordToken: input.resetPasswordToken,
      },
    })
    const user = response[0]
    if (user) {
      const password = await bcrypt.hash(input.password, 10)
      const updatedUser = await prisma.updateUser({
        where: {
          id: user.id,
        },
        data: {
          password,
        },
      })
      if (updatedUser) {
        return { updated: true }
      } else {
        return { error: 'Password was not updated. Please try again' }
      }
    } else {
      return { error: 'Token is not still valid.' }
    }
  },
  async checkUpdatePasswordToken(parent, { input }, { prisma }) {
    const user = await prisma.users({
      where: {
        resetPasswordToken: input.resetPasswordToken,
        resetPasswordExpires_gt: dateFns.format(Date.now()),
      },
    })
    if (user.length > 0) {
      return {
        valid: true,
      }
    } else {
      return {
        valid: false,
      }
    }
  },
}

module.exports = { user }
