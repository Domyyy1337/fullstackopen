import { ALL_BOOKS } from '../queries'

export function addBookToCache(cache, bookToAdd) {
  cache.updateQuery({ query: ALL_BOOKS }, data => {
    if (!data) {
      return { allBooks: [bookToAdd] }
    }

    const { allBooks } = data
    const bookExists = allBooks.some(b => b.id === bookToAdd.id)

    if (bookExists) return { allBooks }

    return { allBooks: allBooks.concat(bookToAdd) }
  })
}
