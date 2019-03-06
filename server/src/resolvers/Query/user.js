const { getUserId } = require('../../utils')

const user = {
  me(parent, args, context) {
    const id = getUserId(context)
    return context.prisma.user({ id })
  },
}

module.exports = { user }
