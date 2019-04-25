const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const auth = {
  async signup(parent, { input }, { prisma }) {
    const username = input.username.toLowerCase()
    const email = input.email.toLowerCase()
    const password = await bcrypt.hash(input.password, 10)
    const name = input.name.toLowerCase()
    const alreadyUsername = await prisma.userIndex({
      username,
    })
    if (alreadyUsername) {
      return { error: 'Username already exists' }
    }
    const alreadyEmail = await prisma.userIndex({
      email,
    })
    if (alreadyEmail) {
      return { error: 'Email is already in use' }
    }
    const user = await prisma.createUser({
      ...input,
      profilePicture:
        'https://res.cloudinary.com/gamerize/image/upload/v1555813486/gamerize_default_avatar.jpg',
      banner:
        'https://res.cloudinary.com/gamerize/image/upload/v1555813486/gamerize_default_banner.jpg',
      password,
      index: {
        create: {
          email,
          username,
          name,
        },
      },
    })

    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user,
    }
  },
  async login(
    parent,
    {
      input: { email, password },
    },
    { prisma }
  ) {
    const user = await prisma.user({ email })
    if (!user) {
      return {error: `No user found for email: ${email}`}
    }
    const passwordValid = await bcrypt.compare(password, user.password)
    if (!passwordValid) {
      return {error: 'Invalid password'}
    }
    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user,
    }
  },
}

module.exports = { auth }
