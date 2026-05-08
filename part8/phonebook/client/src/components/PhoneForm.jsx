import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { EDIT_NUMBER } from '../queries'

export default function PhoneForm({ setError }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const [changeNumber] = useMutation(EDIT_NUMBER, {
    onCompleted: data => {
      if (!data.editNumber) setError('person not found')
    },
  })

  async function submit(e) {
    e.preventDefault()

    try {
      await changeNumber({ variables: { name, phone } })
    } catch (error) {
      console.error(error.message)
      setError(error.message)
    }

    setName('')
    setPhone('')
  }

  return (
    <div>
      <h2>change number</h2>

      <form onSubmit={submit}>
        <div>
          name <input value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div>
          phone <input value={phone} onChange={e => setPhone(e.target.value)} />
        </div>
        <button type='submit'>change number</button>
      </form>
    </div>
  )
}
