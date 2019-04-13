import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createPersistedQueryLink } from 'apollo-link-persisted-queries'

const httpLink = createHttpLink({
  uri: 'http://192.168.1.125:4000',
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('TOKEN')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const persistedLink = createPersistedQueryLink()

// const errorLink = onError(({ networkError, graphQLErrors }) => {
//   console.log('graphQLErrors: ', graphQLErrors)
//   console.log('networkError: ', networkError)
// })

const client = new ApolloClient({
  link: authLink.concat(persistedLink.concat(httpLink)),
  cache: new InMemoryCache(),
})

export default client
