import { useQuery } from '@apollo/client/react'
import { GET_REPOSITORIES } from '../graphql/queries'
import type { SortingOptions, RepositoriesResponse } from '../types'

type RepositoriesHookType = {
  sorting: SortingOptions
  searchQuery: string
  first: number
}

export default function useRepositories({ sorting = 'latest', searchQuery = '', first }: RepositoriesHookType) {
  const variables = { ...getOrderVariables(sorting), searchKeyword: searchQuery, first }
  const { data, loading, fetchMore, ...result } = useQuery<{ repositories: RepositoriesResponse }>(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables,
  })

  async function handleFetchMore() {
    const canFetchMore = !loading && data?.repositories?.pageInfo?.hasNextPage

    if (!canFetchMore) return

    await fetchMore({ variables: { after: data.repositories.pageInfo.endCursor, ...variables } })
  }

  return { repositories: data?.repositories, loading, refetch: result.refetch, fetchMore: handleFetchMore }
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
