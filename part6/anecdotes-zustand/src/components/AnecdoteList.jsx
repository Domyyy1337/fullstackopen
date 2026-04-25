import React from 'react'
import { useAnecdoteActions, useAnecdotes } from '../store/anecdoteStore'
import { useNotificationActions } from '../store/notificationStore'

export default function AnecdoteList() {
  const anecdotes = useAnecdotes()
  const { vote } = useAnecdoteActions()
  const { setNotification } = useNotificationActions()

  function handleVote(anecdote) {
    vote(anecdote.id)
    setNotification(`You voted '${anecdote.content}'`)
  }

  return (
    <div>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}
