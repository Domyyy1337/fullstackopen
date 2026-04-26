import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createNote, getNotes, updateNote } from '../requests'

export function useNotes() {
  const queryClient = useQueryClient()
  const result = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
    refetchOnWindowFocus: false,
  })

  const newNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: newNote => {
      const notes = queryClient.getQueryData(['notes'])
      queryClient.setQueryData(['notes'], notes.concat(newNote))
    },
  })

  const updateNoteMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: updatedNote => {
      const notes = queryClient.getQueryData(['notes'])
      const updatedNotes = notes.map(n => (n.id === updatedNote.id ? updatedNote : n))
      queryClient.setQueryData(['notes'], updatedNotes)
    },
  })

  return {
    notes: result.data,
    isPending: result.isPending,
    addNote: content => newNoteMutation.mutate({ content, important: true }),
    toggleImportance: note => updateNoteMutation.mutate({ ...note, important: !note.important }),
  }
}
