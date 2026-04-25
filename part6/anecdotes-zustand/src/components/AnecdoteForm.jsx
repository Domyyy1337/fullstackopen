import React from 'react'
import { useAnecdoteActions } from '../store/anecdoteStore'

export default function AnecdoteForm() {
  const { add } = useAnecdoteActions()

  function handleAddAnecdote(e) {
    e.preventDefault()
    const anecdote = e.target.anecdote.value
    add(anecdote)
    e.target.reset()
  }

  return (
    <div>
      {' '}
      <h2>create new</h2>
      <form onSubmit={handleAddAnecdote}>
        <div>
          <input name='anecdote' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}
