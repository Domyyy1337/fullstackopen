import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addAnecdote, getAnecdotes, updateAnecdote } from '../requests'

export function useAnecdotes() {
  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: false,
  })

  const addAnecdoteMutation = useMutation({
    mutationFn: addAnecdote,
    onSuccess: newAnecdote => {
      if (newAnecdote.content.length < 5) return

      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    },
  })

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: updatedAnecdote => {
      if (updatedAnecdote.content.length < 5) return

      const anecdotes = queryClient.getQueryData(['anecdotes'])
      const updatedAnecdotes = anecdotes.map(a => (a.id === updatedAnecdote.id ? updatedAnecdote : a))
      queryClient.setQueryData(['anecdotes'], updatedAnecdotes)
    },
  })

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
    addAnecdote: content => addAnecdoteMutation.mutate({ content, votes: 0 }),
    vote: anecdote => updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 }),
  }
}
