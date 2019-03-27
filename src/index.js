const { ApolloServer, gql } = require('apollo-server')
const { importSchema } = require('graphql-import')
const { Prisma } = require('./generated/prisma-client')
const cron = require('node-cron')

//local data
const resolvers = require('./resolvers')

const typeDefs = gql(importSchema('./src/schema.graphql'))

const prisma = new Prisma({
  endpoint: 'http://192.168.1.125:4466',
})
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
    }
  },
})

const numSessions = cron.schedule('*/30 * * * * *', async () => {
  const query = `
    {
      games {
        id
        numSessions
        sessions {
          id
        }
      }
    }
  `
  const result = await prisma.$graphql(query)
  result.games.forEach(async game => {
    if (game.numSessions !== game.sessions.length) {
      await prisma.updateGame({
        where: { id: game.id },
        data: { numSessions: game.sessions.length },
      })
    }
  })
})
numSessions.start()

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
