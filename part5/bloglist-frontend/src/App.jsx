import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import FormItem from './components/FormItem'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      console.error('wrong credentials')
    }
  }

  const loginForm = () => (
    <LoginForm onSubmit={handleLogin}>
      <FormItem id='username' text='username:' value={username} onChange={({ target }) => setUsername(target.value)} />
      <FormItem
        id='password'
        text='password:'
        type='password'
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      />
    </LoginForm>
  )

  return (
    <div>
      {!user && loginForm()}
      {user && <Blogs blogs={blogs} user={user} />}
    </div>
  )
}

export default App
