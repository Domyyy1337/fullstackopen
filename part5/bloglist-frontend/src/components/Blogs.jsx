import { useState } from 'react'

const Blogs = ({ blogs, like, remove, user }) => {
  return (
    <div>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} like={() => like(blog)} remove={() => remove(blog)} user={user} />
      ))}
    </div>
  )
}

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

  console.log(user, blog);
  

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
            {user && user.username === blog.user.username ?
              <button onClick={removeBlog}>remove</button>
            : null}
          </>
        : null}
      </div>
    </div>
  )
}
export default Blogs
