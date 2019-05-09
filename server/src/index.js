const { ApolloServer, gql } = require('apollo-server')
const { importSchema } = require('graphql-import')
const { Prisma } = require('./generated/prisma-client')
const cron = require('node-cron')

//local data
const resolvers = require('./resolvers')

const basicDefs = gql(importSchema('./src/schema.graphql'))

const mutationDefs = gql`
  extend type Mutation {
    uploadProfilePicture(file: Upload!): UploadProfilePicturePayload!
    uploadBanner(file: Upload!): UploadBannerPayload!
  }
`

const prisma = new Prisma({
  endpoint: process.env.PRISMA_ENDPOINT || 'http://192.168.1.125:4466',
  secret: process.env.PRISMA_SECRET || null,
})
const server = new ApolloServer({
  typeDefs: [basicDefs, mutationDefs],
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
        sessions(where: {retired: false}) {
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
