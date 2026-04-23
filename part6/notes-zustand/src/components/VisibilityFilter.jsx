import React from 'react'
import { useNoteActions } from '../store'

export default function VisibilityFilter() {
  const { setFilter } = useNoteActions()
  return (
    <div>
      <input type='radio' name='filter' onChange={() => setFilter('all')} defaultChecked />
      all
      <input type='radio' name='filter' onChange={() => setFilter('important')} />
      important
      <input type='radio' name='filter' onChange={() => setFilter('notimportant')} />
      not important
    </div>
  )
}
