import { useNoteActions } from "../store"

export default function NoteForm() {
  const { add } = useNoteActions()

  const generateId = () => crypto.randomUUID()
  function addNote(e) {
    e.preventDefault()
    const content = e.target.note.value
    add({ id: generateId(), content, important: false })
    e.target.reset()
  }

  return (
    <form onSubmit={addNote}>
      <input name='note' placeholder='note' />
      <button type='submit'>add</button>
    </form>
  )
}
