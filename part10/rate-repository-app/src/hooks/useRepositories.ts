import { useQuery } from '@apollo/client/react'
import { GET_REPOSITORIES } from '../graphql/queries'
import type { SortingOptions, RepositoriesResponse } from '../types'

type RepositoriesHookType = {
  sorting: SortingOptions
  searchQuery: string
}

export default function useRepositories({ sorting = 'latest', searchQuery = '' }: RepositoriesHookType) {
  const result = useQuery<{ repositories: RepositoriesResponse }>(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: { ...getOrderVariables(sorting), searchKeyword: searchQuery },
  })

  return { repositories: result.data?.repositories, loading: result.loading, refetch: result.refetch }
}

type OrderVariables = {
  orderDirection: 'ASC' | 'DESC'
  orderBy: 'CREATED_AT' | 'RATING_AVERAGE'
}

function getOrderVariables(sorting: SortingOptions) {
  const orderVariables: OrderVariables = {
    orderDirection: sorting === 'lowest' ? 'ASC' : 'DESC',
    orderBy: sorting === 'latest' ? 'CREATED_AT' : 'RATING_AVERAGE',
  }
  return orderVariables
}
