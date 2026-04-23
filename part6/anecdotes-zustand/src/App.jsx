import { addAnecdote, useAnecdotes, vote } from './store'

const App = () => {
  const anecdotes = useAnecdotes()

  function handleAddAnecdote(e) {
    e.preventDefault()
    const anecdote = e.target.anecdote.value
    addAnecdote(anecdote)
    e.target.reset()
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
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

export default App
