import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Blogs from './components/Blogs'
import FormItem from './components/FormItem'
import loginService from './services/login'
import Form from './components/Form'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import { Link, Route, Routes, useMatch, useNavigate } from 'react-router-dom'
import Blog from './components/Blog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(() => {
    const savedUser = window.localStorage.getItem('savedBlogsUser')
    return savedUser ? JSON.parse(savedUser) : null
  })
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(false)

  const navigate = useNavigate()
  const match = useMatch('/blogs/:id')

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }, [])

  useEffect(() => {
    if (!user) return
    blogService.setToken(user.token)
  }, [user])

  const handleLogout = async () => {
    window.localStorage.clear()
    navigate('/')
    setUser(null)
    blogService.setToken(null)
  }

  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('savedBlogsUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setError(false)
      setNotification(`successfully logged in as ${user.username}`)
      setTimeout(() => setNotification(null), 5000)
      return true
    } catch (error) {
      console.error(error?.response?.data?.error)
      setError(true)
      setNotification(error?.response?.data?.error)
      setTimeout(() => setNotification(null), 5000)
      return false
    }
  }

  const createBlog = async (title, author, url) => {
    try {
      const returnedBlog = await blogService.create({ title, author, url })
      setBlogs(blogs.concat(returnedBlog))
      setError(false)
      setNotification(`a new blog ${title} by ${author} added`)
      setTimeout(() => setNotification(null), 5000)
      return true
    } catch (error) {
      console.error(error?.response?.data?.error)
      setError(true)
      setNotification(error?.response?.data?.error)
      setTimeout(() => setNotification(null), 5000)
      return false
    }
  }

  const like = async blog => {
    try {
      const newBlog = { ...blog, likes: blog.likes + 1 }
      await blogService.update(blog.id, newBlog)
      const newBlogs = blogs.map(b => (b.id === blog.id ? newBlog : b))
      setBlogs(newBlogs.sort((a, b) => b.likes - a.likes))
      setError(false)
      setNotification(`You liked ${blog.title} by ${blog.author}`)
    } catch (error) {
      console.error(error?.response?.data?.error)
      setError(true)
      setNotification(error?.response?.data?.error)
    }
    setTimeout(() => setNotification(null), 5000)
  }

  const remove = async blog => {
    try {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    } catch (error) {
      console.error(error?.response?.data?.error)
      setError(true)
      setNotification(error?.response?.data?.error)
    }
    setTimeout(() => setNotification(null), 5000)
  }

  const padding = { padding: 5 }

  const blog = match ? blogs.find(blog => blog.id === match.params.id) : null

  return (
    <div>
      <div>
        <Link to='/' style={padding}>
          blogs
        </Link>
        {user ? (
          <Link to='/create' style={padding}>
            new blog
          </Link>
        ) : null}
        {!user ? (
          <Link to='/login' style={padding}>
            login
          </Link>
        ) : (
          <button onClick={handleLogout}>logout</button>
        )}
      </div>
      <Notification message={notification} error={error} />
      {/* <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p> */}

      <Routes>
        <Route path='/' element={<Blogs blogs={blogs} user={user} like={like} remove={remove} />} />
        <Route path='/login' element={<LoginForm login={login} />} />
        <Route path='/blogs/:id' element={<Blog blog={blog} like={like} remove={remove} user={user} />} />
        <Route path='/create' element={<BlogForm create={createBlog} />} />
      </Routes>
    </div>
  )
}

export default App
