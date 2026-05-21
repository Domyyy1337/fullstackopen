import { useApolloClient, useMutation } from '@apollo/client/react'
import { AUTHENTICATE } from '../graphql/mutations'
import { type AuthenticateData, type SignInType, type AuthenticateInput } from '../types'
import useAuthStorage from './useAuthStorage'

export default function useSignIn() {
  const authStorage = useAuthStorage()
  const [mutate, result] = useMutation<AuthenticateData, AuthenticateInput>(AUTHENTICATE)
  const apolloClient = useApolloClient()

  async function signIn({ username, password }: SignInType) {
    const { data } = await mutate({ variables: { credentials: { username, password } } })
    if (!data) throw new Error('Error retrieving Sign-In data from backend')
    await authStorage.setAccessToken(data?.authenticate.accessToken)
    await apolloClient.resetStore()
    return data
  }

  return [signIn, result] as const
}
