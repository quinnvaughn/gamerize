const axios = require('axios')
const { getUserId } = require('../../utils')
const { stripe: stripeAPI } = require('../../stripe')

const stripe = {
  async addStripeConnectAccount(parent, { input }, ctx) {
    const userId = getUserId(ctx)
    const response = await axios.post(
      'https://connect.stripe.com/oauth/token',
      {
        client_secret: process.env.STRIPE_CLIENT_ID,
        code: input.code,
        grant_type: 'authorization_code',
      }
    )
    const connectedStripeId = response.data.stripe_user_id
    const updatedUser = await ctx.prisma.updateUser({
      where: { id: userId },
      data: { connectedStripeId },
    })
    return updatedUser ? { completed: true } : { completed: false }
  },
  async addCard(parent, { input }, ctx) {
    const userId = getUserId(ctx)
    const user = await ctx.prisma.user({ id: userId })
    if (user.customerStripeId) {
      await stripeAPI.customers.createSource(user.customerStripeId, {
        source: input.id,
      })
      const customer = await stripeAPI.customers.retrieve(user.customerStripeId)
      const defaultCard = customer.default_source === input.id
      const savedCard = await ctx.prisma.createSavedCard({
        user: {
          connect: {
            id: userId,
          },
        },
        default: defaultCard,
        cardId: input.id,
        lastFour: input.lastFour,
        brand: input.brand,
      })
      const updatedUser = await ctx.prisma.updateUser({
        where: { id: userId },
        data: {
          savedCards: {
            connect: {
              id: savedCard.id,
            },
          },
        },
      })
      return updatedUser ? { added: true } : { added: false }
    } else {
      const customer = await stripeAPI.customers.create({
        email: user.email,
        source: input.id,
      })
      const defaultCard = customer.default_source === input.id
      const savedCard = await ctx.prisma.createSavedCard({
        user: {
          connect: {
            id: userId,
          },
        },
        default: defaultCard,
        cardId: input.id,
        lastFour: input.lastFour,
        brand: input.brand,
      })
      const updatedUser = await ctx.prisma.updateUser({
        where: { id: userId },
        data: {
          savedCards: {
            connect: {
              id: savedCard.id,
            },
          },
          customerStripeId: customer.id,
        },
      })
      return updatedUser ? { added: true } : { added: false }
    }
  },
  async deleteCard(parent, { input }, ctx) {
    const userId = getUserId(ctx)
    const user = await ctx.prisma.user({ id: userId })
    const deletedCard = await stripeAPI.customers.deleteSource(
      user.customerStripeId,
      input.cardId
    )
    return deletedCard ? { deleted: true } : { deleted: false }
  },
  async changeDefaultCard(parent, { input }, ctx) {
    const userId = getUserId(ctx)
    const user = await ctx.prisma.user({ id: userId })
    const updatedCustomer = await stripeAPI.customers.update(
      user.customerStripeId,
      {
        source: input.cardId,
      }
    )
    const updatedCard = await ctx.prisma.updateSavedCard({
      where: { id: input.id },
      data: { default: true },
    })
    const updatedCards = await ctx.prisma.updateManySavedCards({
      where: { user: { id: userId }, id_not: input.id },
      data: { default: false },
    })
    return updatedCustomer && updatedCard && updatedCards
      ? { updated: true }
      : { updated: false }
  },
  async logIntoStripe(parent, _, ctx) {
    const userId = getUserId(ctx)
    const user = await ctx.prisma.user({ id: userId })
    const {url} = await stripeAPI.accounts.createLoginLink(
      user.connectedStripeId
    )
    return {url}
  },
}

module.exports = {
  stripe,
}
