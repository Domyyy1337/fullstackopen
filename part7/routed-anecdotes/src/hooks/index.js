import { useEffect, useState } from 'react'
import anecdoteService from '../services/anecdotes'

export function useField(type = 'text') {
  const [value, setValue] = useState('')

  const onChange = e => setValue(e.target.value)
  const reset = () => setValue('')

  const props = { type, value, onChange }

  return { props, reset }
}

export function useAnecdotes() {
  const [anecdotes, setAnecdotes] = useState([])

  useEffect(() => {
    anecdoteService.getAll().then(initialAnecdotes => setAnecdotes(initialAnecdotes))
  }, [])

  async function addAnecdote(anecdote) {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    setAnecdotes(anecdotes.concat(newAnecdote))
  }

  return { anecdotes, addAnecdote }
}
