const { prisma } = require('../src/generated/prisma-client')
const faker = require('faker')

async function main() {
  let counter = 4
  while (counter < 23) {
    const email = `email${counter}@email.com`
    const firstName = faker.name.firstName()
    const lastName = faker.name.lastName()
    const name = `${firstName} ${lastName}`
    const username = `${faker.internet.userName()}`
    const displayName = name
    await prisma.createUser({
      email,
      password: 'password',
      name: `${name}`,
      username,
      gamerIsSetup: true,
      role: 'GAMER',
      setup: 5,
      profilePicture:
        'https://res.cloudinary.com/gamerize/image/upload/v1555813486/gamerize_default_avatar.jpg',
      banner:
        'https://res.cloudinary.com/gamerize/image/upload/v1555813486/gamerize_default_banner.jpg',
      displayName,
      index: {
        create: {
          email,
          displayName,
          username,
          name,
        },
      },
    })
    counter++
  }
}

main().catch(e => console.error(e))
