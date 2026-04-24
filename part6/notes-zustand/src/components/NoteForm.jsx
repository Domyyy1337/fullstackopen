import { useNoteActions } from '../store'

export default function NoteForm() {
  const { add } = useNoteActions()

  async function addNote(e) {
    e.preventDefault()
    add(e.target.note.value)
    e.target.reset()
  }

  return (
    <form onSubmit={addNote}>
      <input name='note' placeholder='note' />
      <button type='submit'>add</button>
    </form>
  )
}
