const { ApolloServer } = require('apollo-server')
const { importSchema } = require('graphql-import')
const { prisma } = require('./generated/prisma-client')
const resolvers = require('./resolvers')

const server = new ApolloServer({
  typeDefs: importSchema('src/schema.graphql'),
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
    }
  },
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
