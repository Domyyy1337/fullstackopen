import { useEffect, useState } from 'react'
import noteService from './services/notes'
import { Link, Route, BrowserRouter as Router, Routes, useMatch } from 'react-router-dom'
import NoteList from './components/NoteList'
import NoteForm from './components/NoteForm'
import Footer from './components/Footer'
import Home from './components/Home'
import Note from './components/Note'
import { AppBar, Button, Container, Toolbar } from '@mui/material'
import Notification from './components/Notification'

const App = () => {
  const [notes, setNotes] = useState([])
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    noteService.getAll().then(initialNotes => setNotes(initialNotes))
  }, [])

  const addNote = n =>
    noteService.create(n).then(returnedNote => {
      setNotes(notes.concat(returnedNote))
      setNotification({ text: `Note ${returnedNote.content} added!`, type: 'success' })
      setTimeout(() => setNotification(null), 5000)
    })

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => (note.id === id ? returnedNote : note)))
      })
      .catch(() => {
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const deleteNote = id => noteService.remove(id).then(() => setNotes(notes.filter(n => n.id !== id)))

  const match = useMatch('/notes/:id')

  const note = match ? notes.find(n => n.id === match.params.id) : null

  const style = { '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }

  return (
    <Container>
      <AppBar position='static'>
        <Toolbar>
          <Button color='inherit' component={Link} to='/' sx={style}>
            home
          </Button>
          <Button color='inherit' component={Link} to='/notes' sx={style}>
            notes
          </Button>
          <Button color='inherit' component={Link} to='/create' sx={style}>
            new note
          </Button>
        </Toolbar>
      </AppBar>

      <Notification notification={notification} />

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
    </Container>
  )
}

export default App
