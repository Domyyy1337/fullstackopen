import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Blogs from './components/Blogs'
import FormItem from './components/FormItem'
import loginService from './services/login'
import Form from './components/Form'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(() => {
    const savedUser = window.localStorage.getItem('savedBlogsUser')
    return savedUser ? JSON.parse(savedUser) : null
  })
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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

  const handleCreate = async event => {
    event.preventDefault()
    const returnedBlog = await blogService.create({ title, author, url })
    setBlogs(blogs.concat(returnedBlog))
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  if (!user) {
    return (
      <Form onSubmit={handleLogin} title='Login' buttonText='login'>
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
      </Form>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <Blogs blogs={blogs} user={user} />
      <Form title='create new' buttonText='create' onSubmit={handleCreate}>
        <FormItem id='title' text='title:' value={title} onChange={({ target }) => setTitle(target.value)} />
        <FormItem id='author' text='author:' value={author} onChange={({ target }) => setAuthor(target.value)} />
        <FormItem id='url' text='url:' value={url} onChange={({ target }) => setUrl(target.value)} />
      </Form>
    </div>
  )
}

export default App
