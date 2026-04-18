import { Link, useNavigate } from 'react-router-dom'

const Note = ({ note, toggleImportance, deleteNote }) => {
  const navigate = useNavigate()

  if (!note) return null

  const label = note.important ? 'make not important' : 'make important'

  const handleDelete = () => {
    if (window.confirm(`Delete note ${note.content}?`)) {
      deleteNote(note.id)
      navigate('/notes')
    }
  }

  return (
    <li className='note'>
      <span>{note.content}</span>
      <button onClick={() => toggleImportance(note.id)}>{label}</button>
      <button onClick={handleDelete}>delete</button>
    </li>
  )
}

export default Note
