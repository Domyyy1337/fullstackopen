import { useState } from 'react'

export function useField(type = 'text') {
  const [value, setValue] = useState('')

  const onChange = e => setValue(e.target.value)

  return { type, value, onChange }
}
