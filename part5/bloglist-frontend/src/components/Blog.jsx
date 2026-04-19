import { useNavigate } from 'react-router-dom'

const Blog = ({ blog, like, remove, user }) => {
  const navigate = useNavigate()

  if (!blog) return null

  /**
   * @type {import("react").CSSProperties}
   */
  const blogStyle = { paddingTop: 10, paddingLeft: 2, marginBottom: 5 }

  const removeBlog = () => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) return
    remove(blog)
    navigate('/')
  }

  return (
    <div style={blogStyle} data-testid='blog'>
      <div>
        <h3>
          {blog.author}: {blog.title}
        </h3>
        <div>
          <a href={blog.url}>{blog.url}</a>
          <p>
            <span>likes {blog.likes}</span>
            {user ? <button onClick={() => like(blog)}>like</button> : null}
          </p>
          <p>Added by {blog.user.name}</p>
          {user && user.username === blog.user.username ? <button onClick={removeBlog}>remove</button> : null}
        </div>
      </div>
    </div>
  )
}

export default Blog
