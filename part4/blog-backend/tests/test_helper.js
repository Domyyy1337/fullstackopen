const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'My First Blog',
    author: 'John Volt',
    url: 'https://google.com',
    likes: 100,
  },
  {
    title: 'My Last Blog',
    author: 'Tobias Wams',
    url: 'https://google.de',
    likes: 1337,
  },
  {
    title: 'I love blogging',
    author: 'Hendrik Stueck',
    url: 'https://google.com',
    likes: 900,
  },
]

const blogsInDb = async () => {
  const notes = await Blog.find({})
  return notes.map(note => note.toJSON())
}

module.exports = { initialBlogs, blogsInDb }
