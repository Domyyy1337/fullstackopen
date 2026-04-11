import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import FormItem from './components/FormItem'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(() => {
    const savedUser = window.localStorage.getItem('savedBlogsUser')
    return savedUser ? JSON.parse(savedUser) : null
  })

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    if (!user) return
    blogService.setToken(user.token)
  }, [user])

  const handleLogout = async () => {
    window.localStorage.clear()
    setUser(null)
  }

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('savedBlogsUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      console.error('wrong credentials')
    }
  }

  if (!user) {
    return (
      <LoginForm onSubmit={handleLogin}>
        <FormItem
          id='username'
          text='username:'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <FormItem
          id='password'
          text='password:'
          type='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </LoginForm>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      {user && <Blogs blogs={blogs} user={user} />}
    </div>
  )
}

export default App
