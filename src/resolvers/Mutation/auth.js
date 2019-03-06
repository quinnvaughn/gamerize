const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const auth = {
  async signup(parent, { input }, { prisma }) {
    const username = input.username.toLowerCase()
    const email = input.email.toLowerCase()
    const password = await bcrypt.hash(input.password, 10)
    const name = input.name
    const alreadyUsername = await prisma.user({
      username,
    })
    if (alreadyUsername) {
      throw new Error('Username already exists')
    }
    const alreadyEmail = await prisma.user({
      email,
    })
    if (alreadyEmail) {
      throw new Error('Email is already in use')
    }
    const user = await prisma.createUser({ email, username, name, password })

    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user,
    }
  },

  async login(parent, { email, password }, { prisma }) {
    const user = await prisma.user({ email })
    if (!user) {
      throw new Error(`No user found for email: ${email}`)
    }
    const passwordValid = await bcrypt.compare(password, user.password)
    if (!passwordValid) {
      throw new Error('Invalid password')
    }
    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user,
    }
  },
}

module.exports = { auth }
