import { useState } from 'react'

const Blogs = ({ blogs, like }) => {
  return (
    <div>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} like={() => like(blog)} />
      ))}
    </div>
  )
}

const Blog = ({ blog, like }) => {
  const [visible, setVisible] = useState(false)

  /**
   * @type {import("react").CSSProperties}
   */
  const blogStyle = { paddingTop: 10, paddingLeft: 2, border: 'solid', borderWidth: 1, marginBottom: 5 }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
        <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button>
        {visible ?
          <>
            <p>{blog.url}</p>
            <p>
              likes {blog.likes}
              <button onClick={like}>like</button>
            </p>
            <p>{blog.author}</p>
          </>
        : null}
      </div>
    </div>
  )
}
export default Blogs
