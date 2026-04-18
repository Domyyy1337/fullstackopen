import { useEffect, useState } from 'react'
import noteService from './services/notes'
import { Link, Route, BrowserRouter as Router, Routes, useMatch } from 'react-router-dom'
import NoteList from './components/NoteList'
import NoteForm from './components/NoteForm'
import Footer from './components/Footer'
import Home from './components/Home'
import Note from './components/Note'

const App = () => {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    noteService.getAll().then(initialNotes => setNotes(initialNotes))
  }, [])

  const addNote = n => noteService.create(n).then(returnedNote => setNotes(notes.concat(returnedNote)))

  const padding = { padding: 5 }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => (note.id === id ? returnedNote : note)))
      })
      .catch(() => {
        // setErrorMessage(`the note '${note.content}' was already deleted from the server`)
        // setTimeout(() => setErrorMessage(null), 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const deleteNote = id => noteService.remove(id).then(() => setNotes(notes.filter(n => n.id !== id)))

  const match = useMatch('/notes/:id')

  const note = match ? notes.find(n => n.id === match.params.id) : null

  return (
    <div>
      <div>
        <Link style={padding} to='/'>
          home
        </Link>
        <Link style={padding} to='/notes'>
          notes
        </Link>
        <Link style={padding} to='/create'>
          new note
        </Link>
      </div>

      <Routes>
        <Route path='/notes' element={<NoteList notes={notes} />} />
        <Route path='/create' element={<NoteForm createNote={addNote} />} />
        <Route path='/' element={<Home />} />
        <Route
          path='/notes/:id'
          element={<Note note={note} toggleImportance={toggleImportanceOf} deleteNote={deleteNote} />}
        />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
