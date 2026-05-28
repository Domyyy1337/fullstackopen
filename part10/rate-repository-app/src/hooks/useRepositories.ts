import { useQuery } from '@apollo/client/react'
import { GET_REPOSITORIES } from '../graphql/queries'
import { type RepositoriesResponse } from '../types'

export default function useRepositories() {
  const result = useQuery<{ repositories: RepositoriesResponse }>(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  })

  return { repositories: result.data?.repositories, loading: result.loading, refetch: result.refetch }
}
