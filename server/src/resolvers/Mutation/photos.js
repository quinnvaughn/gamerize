const { processUpload, getUserId } = require('../../utils')
const photos = {
  async uploadProfilePicture(parent, { file }, ctx) {
    const userId = getUserId(ctx)
    const path = await processUpload(file)
    const updatedUser = await ctx.prisma.updateUser({
      where: { id: userId },
      data: {
        profilePicture: path,
      },
    })
    return path && updatedUser ? { updated: true } : { updated: false }
  },
  async uploadBanner(parent, {file}, ctx) {
    const userId = getUserId(ctx)
    const path = await processUpload(file)
    const updatedUser = await ctx.prisma.updateUser({
      where: {id: userId},
      data: {
        banner: path
      }
    })
    return path && updatedUser ? {updated: true} : {updated: false}
  }
}

module.exports = {
  photos,
}
