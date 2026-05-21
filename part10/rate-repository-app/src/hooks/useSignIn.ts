import { useMutation } from '@apollo/client/react'
import { AUTHENTICATE } from '../graphql/mutations'
import { type AuthenticateData, type SignInType, type AuthenticateInput } from '../types'
import useAuthStorage from './useAuthStorage'

export default function useSignIn() {
  const authStorage = useAuthStorage()
  const [mutate, result] = useMutation<AuthenticateData, AuthenticateInput>(AUTHENTICATE)

  async function signIn({ username, password }: SignInType) {
    const payload = await mutate({ variables: { credentials: { username, password } } })
    return payload
  }

  return [signIn, result] as const
}
