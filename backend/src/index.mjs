import { GraphQLServer } from 'graphql-yoga'
import resolvers from './resolvers'

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({ ...req }),
})

server.start(({ url }) => console.log(`Server is running on ${url}`))
