import { useQuery } from '@apollo/client/react'
import type { UserReviewsResponse } from '../types'
import { GET_USER_REVIEWS } from '../graphql/queries'

export default function useUserReviews() {
  const result = useQuery<UserReviewsResponse>(GET_USER_REVIEWS, { fetchPolicy: 'cache-and-network' })

  return { reviews: result.data?.me, loading: result.loading, refetch: result.refetch }
}
