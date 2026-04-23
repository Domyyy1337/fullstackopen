import React from 'react'
import { useAnecdoteActions } from '../store'

export default function AnecdoteFilter() {
  const { setFilter } = useAnecdoteActions()

  const style = { marginBottom: 10 }

  const handleChange = e => setFilter(e.target.value)

  return (
    <div style={style}>
      filter <input type='text' onChange={handleChange} />
    </div>
  )
}
