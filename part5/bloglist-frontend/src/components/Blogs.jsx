import Blog from './Blog'

const Blogs = ({ blogs, like, remove, user }) => {
  return (
    <div>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} like={() => like(blog)} remove={() => remove(blog)} user={user} />
      ))}
    </div>
  )
}

export default Blogs
