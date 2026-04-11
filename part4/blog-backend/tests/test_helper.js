const Blog = require('../models/blog')
const User = require('../models/user')

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

const initialUsers = [
  {
    username: 'dominik',
    name: 'Dominik',
    passwordHash: 'fish',
  },
  {
    username: 'johnny',
    name: 'Johnny',
    passwordHash: 'dogs',
  },
]

const blogsInDb = async () => {
  const notes = await Blog.find({})
  return notes.map(note => note.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const getUser = async () => {
  const users = await usersInDb()
  return users[0]
}

const initializeDb = async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  await Blog.insertMany(initialBlogs)
  await User.insertMany(initialUsers)
}

const nonExistingId = async () => {
  const user = new User({ name: 'Paul Lot', passwordHash: 'guy', username: 'pauliii' })
  await user.save()
  await user.deleteOne()

  return user._id.toString()
}

module.exports = { initialBlogs, initialUsers, blogsInDb, initializeDb, usersInDb, getUser, nonExistingId }
