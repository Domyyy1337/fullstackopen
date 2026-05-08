import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS, ALL_GENRES } from '../queries'
import { useState } from 'react'

const Books = props => {
  const [genre, setGenre] = useState(null)
  const genresResult = useQuery(ALL_GENRES)
  const allGenres = genresResult.data?.allGenres
  const booksResult = useQuery(ALL_BOOKS, { variables: { genre }, skip: !allGenres })

  if (!props.show) {
    return null
  }

  if (allGenres.loading || booksResult.loading) return <div>loading...</div>

  const allBooks = booksResult.data.allBooks  

  return (
    <div>
      <h2>books</h2>
      <div>
        {allGenres.map(g => (
          <button onClick={() => setGenre(g)} key={g}>
            {g}
          </button>
        ))}
        <button onClick={() => setGenre(null)}>all genres</button>
      </div>
      <p>
        in <b>{genre ? genre : 'all genres'}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {allBooks.map(a => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
