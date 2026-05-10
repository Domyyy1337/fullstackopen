import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { useApolloClient, useSubscription } from '@apollo/client/react'
import Recommend from './components/Recommend'
import Notification from './components/Notification'
import { BOOK_ADDED } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(window.localStorage.getItem('library-user-token'))
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      window.alert(`${addedBook.title} added`)
    },
  })

  function logout() {
    setToken(null)
    localStorage.removeItem('library-user-token')
    client.resetStore()
  }

  function notify(message) {
    setErrorMessage(message)
    setTimeout(() => setErrorMessage(message), 5000)
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={() => setPage('recommend')}>recommend</button>}
        {!token ? <button onClick={() => setPage('login')}>login</button> : <button onClick={logout}>logout</button>}
      </div>

      <Notification message={errorMessage} />

      <Authors show={page === 'authors'} token={token} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} />
      <Recommend show={page === 'recommend'} />
      <Login show={page === 'login'} setToken={setToken} setPage={setPage} setError={notify} />
    </div>
  )
}

export default App
