import { useEffect, useState } from 'react'
import Note from './Note'
import noteService from '../services/notes.js'
import Notification from './Notification.jsx'
import Footer from './Footer.jsx'
import loginService from '../services/login'
import LoginForm from './LoginForm.jsx'
import FormItem from './FormItem.jsx'
import Togglable from './Togglable.jsx'
import { Link } from 'react-router-dom'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

const NoteList = ({ notes }) => {
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    return loggedUserJSON ? JSON.parse(loggedUserJSON) : null
  })

  useEffect(() => {
    if (!user) return
    noteService.setToken(user.token)
  }, [user])

  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user)
    } catch {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const loginForm = () => {
    return (
      <Togglable buttonLabel='login'>
        <LoginForm login={login} />
      </Togglable>
    )
  }

  notes.forEach(n => console.log(n.user))
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {!user && loginForm()}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>content</TableCell>
              <TableCell>user</TableCell>
              <TableCell>important</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notes.map(note => (
              <TableRow key={note.id}>
                <TableCell>
                  <Link to={`/notes/${note.id}`}>{note.content}</Link>
                </TableCell>
                <TableCell>{note.user.username}</TableCell>
                <TableCell>{note.important ? 'yes' : ''}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default NoteList
