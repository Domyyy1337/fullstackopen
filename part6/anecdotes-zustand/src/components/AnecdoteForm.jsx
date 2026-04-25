import React from 'react'
import { useAnecdoteActions } from '../store/anecdoteStore'
import { useNotificationActions } from '../store/notificationStore'

export default function AnecdoteForm() {
  const { add } = useAnecdoteActions()
  const { setNotification } = useNotificationActions()

  function handleAddAnecdote(e) {
    e.preventDefault()
    const anecdote = e.target.anecdote.value
    add(anecdote)
    setNotification(`'${anecdote}' created`)
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
