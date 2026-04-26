import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes } from '../requests'

export function useAnecdotes() {
  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: false,
  })

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
  }
}
