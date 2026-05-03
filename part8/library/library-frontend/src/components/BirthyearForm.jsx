import { useMutation } from '@apollo/client/react'
import { useState } from 'react'
import { ALL_AUTHORS, EDIT_BIRTHYEAR } from '../queries'

export default function BirthyearForm() {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [editBirthYear] = useMutation(EDIT_BIRTHYEAR, { refetchQueries: [{ query: ALL_AUTHORS }] })

  function submit(e) {
    e.preventDefault()
    editBirthYear({ variables: { name, setBornTo: Number(born) } })
    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name <input value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div>
          born <input value={born} onChange={e => setBorn(e.target.value)} />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}
