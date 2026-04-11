const Blogs = ({ blogs, user = false }) => {
  return (
    <div>
      <h2>blogs</h2>
      {user && <p>{user.name} logged in</p>}
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>
)

export default Blogs
