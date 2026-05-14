import { useEffect, useState } from 'react'
import type { Note } from './types'
import axios from 'axios'
import noteService from './services/noteService'

function App() {
  const [notes, setNotes] = useState<Note[]>([{ id: '1', content: 'testing' }])
  const [newNote, setNewNote] = useState('')

  useEffect(() => {
    noteService.getAll().then(initialNotes => setNotes(initialNotes))
  }, [])

  function noteCreation(e: React.SyntheticEvent) {
    e.preventDefault()
    noteService.create({ content: newNote }).then(returnedNote => setNotes(notes.concat(returnedNote)))
    setNewNote('')
  }

  return (
    <div>
      <form onSubmit={noteCreation}>
        <input value={newNote} onChange={e => setNewNote(e.target.value)} />
        <button type='submit'>add</button>
      </form>
      <ul>
        {notes.map(n => (
          <li key={n.id}>{n.content}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
