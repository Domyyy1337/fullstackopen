import { useMutation } from '@apollo/client/react'
import { CREATE_REVIEW } from '../graphql/mutations'
import { type CreateReviewData, type CreateReviewInput } from '../types'
import { GET_REPOSITORY } from '../graphql/queries'

export default function useReview() {
  const [mutate, result] = useMutation<CreateReviewData, CreateReviewInput>(CREATE_REVIEW, {
    refetchQueries: [{ query: GET_REPOSITORY }],
  })

  async function createReview({ review }: CreateReviewInput) {
    const { data } = await mutate({ variables: { review } })

    if (!data) throw new Error('Error retrieving review data from backend')

    console.log(data)

    return data
  }

  return [createReview, result] as const
}
