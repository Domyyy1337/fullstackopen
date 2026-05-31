import { useMutation } from '@apollo/client/react'
import type { Review } from '../types'
import { DELETE_REVIEW } from '../graphql/mutations'

export default function useDeleteReview() {
  const [mutate, result] = useMutation<{ deleteReview: boolean }, { deleteReviewId: string }>(DELETE_REVIEW)

  async function deleteReview(deleteReviewId: Review['id']) {
    await mutate({ variables: { deleteReviewId } })
  }

  return [deleteReview, result] as const
}
