import { create } from 'zustand'
import anecdoteService from './services/anecdotes'

const useAnecdoteStore = create(set => ({
  anecdotes: [],
  filter: '',
  actions: {
    async initialize() {
      const anecdotes = await anecdoteService.getAll()
      set(() => ({ anecdotes }))
    },
    setFilter(value) {
      set(() => ({ filter: value }))
    },
    vote(id) {
      set(s => ({ anecdotes: sortByVotes(s.anecdotes.map(a => (a.id === id ? { ...a, votes: a.votes + 1 } : a))) }))
    },
    async add(content) {
      const newAnecdote = await anecdoteService.create(content)
      set(s => ({ anecdotes: s.anecdotes.concat(newAnecdote) }))
    },
  },
}))

const sortByVotes = anecdotes => anecdotes.toSorted((a, b) => b.votes - a.votes)

export function useAnecdotes() {
  const anecdotes = useAnecdoteStore(s => s.anecdotes)
  const filter = useAnecdoteStore(s => s.filter)
  return anecdotes.filter(a => a.content.includes(filter))
}

export const useFilter = () => useAnecdoteStore(s => s.filter)
export const useAnecdoteActions = () => useAnecdoteStore(s => s.actions)
