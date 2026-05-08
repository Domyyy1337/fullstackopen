import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS } from '../queries'
import { useState } from 'react'

const Books = props => {
  const result = useQuery(ALL_BOOKS)
  const [genre, setGenre] = useState(null)

  if (!props.show) {
    return null
  }

  if (result.loading) return <div>loading...</div>

  let books = result.data.allBooks
  let genres = []

  for (const book of books) {
    genres.push(...book.genres)
  }

  genres = [...new Set(genres)]
  books = genre ? books.filter(b => b.genres.includes(genre)) : books

  return (
    <div>
      <h2>books</h2>
      <div>
        {genres.map(g => (
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
          {books.map(a => (
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
