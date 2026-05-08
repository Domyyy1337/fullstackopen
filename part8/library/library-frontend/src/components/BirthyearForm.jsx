import { useMutation, useQuery } from '@apollo/client/react'
import { useState } from 'react'
import { ALL_AUTHOR_NAMES, ALL_AUTHORS, EDIT_BIRTHYEAR } from '../queries'
import useField from '../hooks/useField'

export default function BirthyearForm({show}) {
  const authors = useQuery(ALL_AUTHOR_NAMES)
  const names = authors.data.allAuthors.map(a => a.name)
  const [editBirthYear] = useMutation(EDIT_BIRTHYEAR, { refetchQueries: [{ query: ALL_AUTHORS }] })

  const born = useField('number')
  const [selectedAuthor, setSelectedAuthor] = useState(names ? names[0] : null)

  if (!show) return null

  function submit(e) {
    e.preventDefault()
    editBirthYear({ variables: { name: selectedAuthor, setBornTo: Number(born.props.value) } })
    born.reset()
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <select value={selectedAuthor} onChange={e => setSelectedAuthor(e.target.value)}>
          {names.map(n => (
            <option value={n} key={n}>
              {n}
            </option>
          ))}
        </select>
        <div>
          born <input {...born.props} />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}
