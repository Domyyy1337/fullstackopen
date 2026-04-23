import React from 'react'
import { addAnecdote } from '../store'

export default function AnecdoteForm() {
  function handleAddAnecdote(e) {
    e.preventDefault()
    const anecdote = e.target.anecdote.value
    addAnecdote(anecdote)
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
