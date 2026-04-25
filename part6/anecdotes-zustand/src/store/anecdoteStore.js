import { create } from 'zustand'
import anecdoteService from '../services/anecdotes'

const useAnecdoteStore = create((set, get) => ({
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
    async vote(id) {
      const anecdote = get().anecdotes.find(a => a.id === id)
      const updated = await anecdoteService.update(id, { ...anecdote, votes: anecdote.votes + 1 })

      set(s => ({ anecdotes: sortByVotes(s.anecdotes.map(a => (a.id === id ? updated : a))) }))
    },
    async add(content) {
      const newAnecdote = await anecdoteService.create(content)
      set(s => ({ anecdotes: s.anecdotes.concat(newAnecdote) }))
    },
    async removeUnpopular() {
      const unpopular = get().anecdotes.filter(a => a.votes === 0)

      for (const anecdote of unpopular) {
        await anecdoteService.remove(anecdote.id)
      }
      set(s => ({ anecdotes: s.anecdotes.filter(a => a.votes > 0) }))
      return unpopular.length
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
