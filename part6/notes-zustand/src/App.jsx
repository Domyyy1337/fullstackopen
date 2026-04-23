import NoteForm from './components/NoteForm'
import NoteList from './components/NoteList'
import VisibilityFilter from './components/VisibilityFilter'

export default function App() {
  return (
    <div>
      <NoteForm />
      <VisibilityFilter />
      <NoteList />
    </div>
  )
}
