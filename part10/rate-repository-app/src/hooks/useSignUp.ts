import { useMutation } from '@apollo/client/react'
import { CREATE_USER } from '../graphql/mutations'
import type { CreateUserInput, SignUpType, CreateUserData } from '../types'

export default function useSignUp() {
  const [mutate, result] = useMutation<CreateUserData, CreateUserInput>(CREATE_USER)

  async function signUp({ username, password }: SignUpType) {
    const { data } = await mutate({ variables: { user: { password, username } } })
    if (!data) throw new Error('Error registering your new user in the backend. Try again later.')

    console.log(data)

    return data
  }

  return [signUp, result] as const
}
