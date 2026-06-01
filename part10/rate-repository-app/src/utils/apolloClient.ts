import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import type AuthStorage from './authStorage'
import { SetContextLink } from '@apollo/client/link/context'
import { relayStylePagination } from '@apollo/client/utilities'

const httpLink = new HttpLink({
  uri: process.env.EXPO_PUBLIC_APOLLO_URI,
})

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        repositories: relayStylePagination(),
      },
    },
  },
})

export default function createApolloClient(authStorage: AuthStorage) {
  const authLink = new SetContextLink(async context => {
    const headers = context.headers as Record<string, string> | undefined
    try {
      const accessToken = await authStorage.getAccessToken()
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
      }
    } catch (error: unknown) {
      console.log(error)
      return { headers }
    }
  })

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
  })
}
