import React from 'react'
import useLocalStorage from './hooks/useLocalStorage'

export default function LocalStorage() {
  const [name, setName] = useLocalStorage('name', '')
  return (
    <div>
      <input type='text' value={name} onChange={e => setName(e.target.value)} />
      <p>Hello, {name}! (your name is stored in localStorage)</p>
    </div>
  )
}
