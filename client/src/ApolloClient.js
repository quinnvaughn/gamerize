import { ApolloClient } from 'apollo-client'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { createUploadLink } from 'apollo-upload-client'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'

const uploadLink = createUploadLink({
  uri: process.env.REACT_APP_APOLLO_CLIENT_URL,
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('TOKEN')
  // return the headers to the context so link can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_WEBSOCKET_LINK,
  options: {
    reconnect: true,
  },
})

// const errorLink = onError(({ networkError, graphQLErrors }) => {
//   console.log('graphQLErrors: ', graphQLErrors)
//   console.log('networkError: ', networkError)
// })

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  uploadLink
)

const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
})

export default client
