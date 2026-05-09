import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS, ME } from '../queries'

export default function Recommend({ show }) {
  const userResult = useQuery(ME, { skip: !show })
  const favoriteGenre = userResult.data?.me?.favoriteGenre
  const booksResult = useQuery(ALL_BOOKS, { variables: { genre: favoriteGenre }, skip: !favoriteGenre })
  const matchingBooks = booksResult.data?.allBooks
  console.log((userResult, booksResult))

  if (!show) return null
  if (userResult.loading || booksResult.loading) return <div>loading...</div>

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <b>{favoriteGenre}</b>
      </p>
      {matchingBooks && matchingBooks.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
          </thead>
          <tbody>
            {matchingBooks.map(b => (
              <tr key={b.id}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>There are no books with your favorite genre :-(</p>
      )}
    </div>
  )
}
