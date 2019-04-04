const notification = {
  async deleteNotification(parent, { input }, { prisma }) {
    const deletedNotification = await prisma.deleteNotification({
      id: input.notificationId,
    })
    return deletedNotification ? { deleted: true } : { deleted: false }
  },
}

module.exports = {
  notification,
}
