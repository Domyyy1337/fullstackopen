import { useNoteActions } from '../store'

export default function Note({ note }) {
  const { toggleImportance } = useNoteActions()
  const text = note.important ? 'make not important' : 'make important'
  const handleImportance = () => toggleImportance(note.id)

  const displayNote = note.important ? <strong>{note.content}</strong> : note.content

  return (
    <li>
      {displayNote}
      <button onClick={handleImportance}>{text}</button>
    </li>
  )
}
