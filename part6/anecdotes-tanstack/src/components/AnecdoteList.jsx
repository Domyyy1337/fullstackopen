import React from 'react'
import { useAnecdotes } from '../hooks/useAnecdotes'
import useNotification from '../hooks/useNotification'

export default function AnecdoteList() {
  const { anecdotes, vote } = useAnecdotes()
  const { setNotification } = useNotification()

  function handleVote(anecdote) {
    vote(anecdote)
    setNotification(`anecdote '${anecdote.content}' voted`)
  }

  return (
    <div>
      {' '}
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
