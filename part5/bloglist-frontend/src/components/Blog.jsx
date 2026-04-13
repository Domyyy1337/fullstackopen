import { useState } from 'react'

const Blog = ({ blog, like, remove, user }) => {
  const [visible, setVisible] = useState(false)

  /**
   * @type {import("react").CSSProperties}
   */
  const blogStyle = { paddingTop: 10, paddingLeft: 2, border: 'solid', borderWidth: 1, marginBottom: 5 }

  const removeBlog = () => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) return
    remove()
  }

  return (
    <div style={blogStyle}>
      <div>
        '{blog.title}' by {blog.author}
        <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button>
        {visible ? (
          <>
            <p>{blog.url}</p>
            <p>
              likes {blog.likes}
              <button onClick={like}>like</button>
            </p>
            {user && user.username === blog.user.username ? <button onClick={removeBlog}>remove</button> : null}
          </>
        ) : null}
      </div>
    </div>
  )
}

export default Blog
