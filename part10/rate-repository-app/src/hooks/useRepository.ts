import { useQuery } from '@apollo/client/react'
import { GET_REPOSITORY } from '../graphql/queries'
import { type RepositoryResponse } from '../types'

export default function useRepository(repositoryId: string | undefined) {
  const result = useQuery<RepositoryResponse>(GET_REPOSITORY, {
    variables: { repositoryId },
    skip: !repositoryId,
    fetchPolicy: 'cache-and-network',
  })

  return { repository: result.data?.repository, loading: result.loading, refetch: result.refetch }
}
