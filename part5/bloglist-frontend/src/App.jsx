import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import Blogs from './components/Blogs'
import FormItem from './components/FormItem'
import loginService from './services/login'
import Form from './components/Form'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(() => {
    const savedUser = window.localStorage.getItem('savedBlogsUser')
    return savedUser ? JSON.parse(savedUser) : null
  })
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(false)

  const blogFormRef = useRef()

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

  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('savedBlogsUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setNotification(`successfully logged in as ${user.username}`)
    } catch (error) {
      console.error(error?.response?.data?.error)
      setError(true)
      setNotification(error?.response?.data?.error)
    }
    setTimeout(() => setNotification(null), 5000)
  }

  const createBlog = async ({ title, author, url }) => {
    try {
      blogFormRef.current.toggleVisibility()
      const returnedBlog = await blogService.create({ title, author, url })
      setBlogs(blogs.concat(returnedBlog))
      setError(false)
      setNotification(`a new blog ${title} by ${author} added`)
    } catch (error) {
      console.error(error?.response?.data?.error)
      setError(true)
      setNotification(error?.response?.data?.error)
    }
  }

  const like = async blog => {
    try {
      const newBlog = { ...blog, likes: blog.likes + 1 }
      await blogService.update(blog.id, newBlog)
      const newBlogs = blogs.map(b => (b.id === blog.id ? newBlog : b))
      setBlogs(newBlogs)
      setError(false)
      setNotification(`You liked ${blog.title} by ${blog.author}`)
    } catch (error) {
      console.error(error?.response?.data?.error)
      setError(true)
    }
    setTimeout(() => setNotification(null), 5000)
  }

  if (!user) {
    return (
      <>
        <Notification message={notification} error={error} />
        <Togglable buttonLabel='login'>
          <LoginForm login={login} />
        </Togglable>
      </>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={notification} error={error} />
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm create={createBlog} ref={blogFormRef} />
      </Togglable>

      <Blogs blogs={blogs} user={user} like={like} />
    </div>
  )
}

export default App
