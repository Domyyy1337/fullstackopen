import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { ALL_AUTHORS, ALL_BOOKS, ALL_GENRES, CREATE_BOOK } from '../queries'
import useField from '../hooks/useField'
import { addBookToCache } from '../utils/apolloCache'

const NewBook = props => {
  const title = useField()
  const author = useField()
  const published = useField('number')
  const genre = useField()
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS, variables: { genre: null } }, { query: ALL_AUTHORS }, { query: ALL_GENRES }],
    onError: error => props.setError(error.message),
    update: (cache, response) => addBookToCache(cache, response.data.addBook),
  })

  if (!props.show) {
    return null
  }

  const submit = async event => {
    event.preventDefault()

    createBook({
      variables: {
        title: title.props.value,
        author: author.props.value,
        published: Number(published.props.value),
        genres,
      },
    })

    title.reset()
    author.reset()
    published.reset()
    genre.reset()
    setGenres([])
  }

  const addGenre = () => {
    setGenres(genres.concat(genre.props.value))
    genre.reset()
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title <input {...title.props} />
        </div>
        <div>
          author <input {...author.props} />
        </div>
        <div>
          published <input {...published.props} />
        </div>
        <div>
          <input {...genre.props} />
          <button onClick={addGenre} type='button'>
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook
