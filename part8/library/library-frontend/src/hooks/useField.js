import { useState } from 'react'

export default function useField(type = 'text') {
  const [value, setValue] = useState('')

  const onChange = e => setValue(e.target.value)
  const reset = () => setValue('')

  const props = { value, type, onChange }

  return { props, reset }
}
