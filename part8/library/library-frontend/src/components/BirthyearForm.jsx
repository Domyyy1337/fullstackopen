import { useMutation, useQuery } from '@apollo/client/react'
import { useState } from 'react'
import { ALL_AUTHOR_NAMES, ALL_AUTHORS, EDIT_BIRTHYEAR } from '../queries'

export default function BirthyearForm() {
  const authors = useQuery(ALL_AUTHOR_NAMES)
  const names = authors.data.allAuthors.map(a => a.name)
  const [editBirthYear] = useMutation(EDIT_BIRTHYEAR, { refetchQueries: [{ query: ALL_AUTHORS }] })

  const [born, setBorn] = useState('')
  const [selectedAuthor, setSelectedAuthor] = useState(names ? names[0] : null)

  function submit(e) {
    e.preventDefault()
    editBirthYear({ variables: { name: selectedAuthor, setBornTo: Number(born) } })
    setBorn('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <select value={selectedAuthor} onChange={e => setSelectedAuthor(e.target.value)}>
          {names.map(n => (
            <option value={n}>{n}</option>
          ))}
        </select>
        <div>
          born <input value={born} onChange={e => setBorn(e.target.value)} />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}
