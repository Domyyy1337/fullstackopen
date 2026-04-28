import React from 'react'
import useField from './hooks/useField'

export default function Form() {
  const name = useField()
  const born = useField('date')
  const height = useField('number')

  return (
    <div>
      <form>
        name: <input {...name} />
        <br />
        birthdate: <input {...born} />
        <br />
        height: <input {...height} />
      </form>
      <div>
        {name.value} {born.value} {height.value}
      </div>
    </div>
  )
}
