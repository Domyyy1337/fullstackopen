import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createNote, getNotes, updateNote } from './requests'

export default function App() {
  const queryClient = useQueryClient()
  const result = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
  })

  const newNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notes'] }),
  })

  const updateNoteMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notes'] }),
  })

  async function addNote(e) {
    e.preventDefault()
    const content = e.target.note.value
    e.target.reset()
    newNoteMutation.mutate({ content, important: true })
  }

  function toggleImportance(note) {
    updateNoteMutation.mutate({ ...note, important: !note.important })
  }

  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isPending) return <div>loading data...</div>

  const notes = result.data

  return (
    <div>
      <h2>Notes app</h2>
      <form onSubmit={addNote}>
        <input name='note' />
        <button type='submit'>add</button>
      </form>
      {notes.map(note => (
        <li key={note.id}>
          {note.important ? <strong>{note.content}</strong> : note.content}
          <button onClick={() => toggleImportance(note)}>
            {note.important ? 'make not important' : 'make important'}
          </button>
        </li>
      ))}
    </div>
  )
}
