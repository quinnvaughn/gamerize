const { ApolloServer, gql } = require('apollo-server')
const { importSchema } = require('graphql-import')
const { Prisma } = require('./generated/prisma-client')
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

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
