import { ApolloClient } from 'apollo-client'
import { createUploadLink } from 'apollo-upload-client'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createPersistedQueryLink } from 'apollo-link-persisted-queries'

const uploadLink = createUploadLink({
  uri: 'http://206.189.239.225:4000/',
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

const persistedLink = createPersistedQueryLink()

// const errorLink = onError(({ networkError, graphQLErrors }) => {
//   console.log('graphQLErrors: ', graphQLErrors)
//   console.log('networkError: ', networkError)
// })

const client = new ApolloClient({
  link: authLink.concat(persistedLink.concat(uploadLink)),
  cache: new InMemoryCache(),
})

export default client
