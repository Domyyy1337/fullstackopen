import { useNavigate } from 'react-router-dom'
import { useAnecdotes, useField } from '../hooks'

const CreateNew = () => {
  const content = useField()
  const author = useField()
  const info = useField()
  const navigate = useNavigate()
  const { addAnecdote } = useAnecdotes()

  async function handleSubmit(e) {
    e.preventDefault()
    await addAnecdote({
      content: content.props.value,
      author: author.props.value,
      info: info.props.value,
      votes: 0,
    })
    navigate('/')
  }

  function handleReset(e) {
    e.preventDefault()
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' {...content.props} />
        </div>
        <div>
          author
          <input name='author' {...author.props} />
        </div>
        <div>
          url for more info
          <input name='info' {...info.props} />
        </div>
        <button>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew
