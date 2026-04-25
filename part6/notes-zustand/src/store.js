import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import noteService from './services/notes'

const logger = config => (set, get) =>
  config((...args) => {
    console.log('prev state', get())
    set(...args)
    console.log('next state', get())
  }, get)

const useNoteStore = create(
  devtools((set, get) => ({
    notes: [],
    filter: 'all',
    actions: {
      async add(content) {
        const newNote = await noteService.createNew(content)
        set(state => ({ notes: state.notes.concat(newNote) }))
      },
      async toggleImportance(id) {
        const note = get().notes.find(n => n.id === id)
        const updated = await noteService.update(id, { ...note, important: !note.important })

        set(state => ({
          notes: state.notes.map(note => (note.id === id ? updated : note)),
        }))
      },
      setFilter(value) {
        set(() => ({ filter: value }))
      },
      async initialize() {
        const notes = await noteService.getAll()
        set(() => ({ notes }))
      },
    },
  }))
)

export function useNotes() {
  const notes = useNoteStore(s => s.notes)
  const filter = useNoteStore(s => s.filter)
  if (filter === 'important') return notes.filter(n => n.important)
  if (filter === 'nonimportant') return notes.filter(n => !n.important)
  return notes
}
export const useFilter = () => useNoteStore(state => state.filter)
export const useNoteActions = () => useNoteStore(state => state.actions)

export default useNoteStore
