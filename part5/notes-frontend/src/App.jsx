import { useEffect, useState } from 'react'
import Note from './components/Note'
import noteService from './services/notes.js'
import Notification from './components/Notification.jsx'
import Footer from './components/Footer.jsx'
import loginService from './services/login'
import NoteForm from './components/NoteForm.jsx'
import LoginForm from './components/LoginForm.jsx'
import FormItem from './components/FormItem.jsx'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    return loggedUserJSON ? JSON.parse(loggedUserJSON) : null
  })

  useEffect(() => {
    noteService.getAll().then(initialNotes => setNotes(initialNotes))
  }, [])

  useEffect(() => {
    if (!user) return
    noteService.setToken(user.token)
  }, [user])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addNote = event => {
    event.preventDefault()
    const noteObject = { content: newNote, important: Math.random() < 0.5 }

    noteService.create(noteObject).then(returnedNote => {
      setNotes(notes.concat(returnedNote))
      setNewNote('')
    })
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => (note.id === id ? returnedNote : note)))
      })
      .catch(() => {
        setErrorMessage(`the note '${note.content}' was already deleted from the server`)
        setTimeout(() => setErrorMessage(null), 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const handleNoteChange = event => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const loginForm = () => (
    <LoginForm onSubmit={handleLogin}>
      <FormItem
        id='username'
        text='username'
        type='text'
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      />
      <FormItem
        id='password'
        text='password'
        type='password'
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      />
    </LoginForm>
  )

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {!user && loginForm()}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          <NoteForm onSubmit={addNote} value={newNote} onChange={handleNoteChange} show={user} />
        </div>
      )}

      <div>
        <button onClick={() => setShowAll(!showAll)}>show {showAll ? 'important' : 'all'}</button>
      </div>
      <ul>
        {notesToShow.map(note => (
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
        ))}
      </ul>
      <Footer />
    </div>
  )
}

export default App
