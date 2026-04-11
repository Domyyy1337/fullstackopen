const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const config = require('../utils/config')
const { expressjwt: jwt } = require('express-jwt')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs)
})

blogsRouter.post('/', jwt(config.JWT_CONFIG), async (req, res) => {
  const { author, likes, title, url } = req.body

  const user = await User.findOne({ username: '1' })

  if (!user) return res.status(400).json({ error: 'userId missing or not valid' })

  const blog = new Blog({
    author,
    likes,
    title,
    url,
    user: user._id,
  })

  const savedNote = await blog.save()
  user.blogs = user.blogs.concat(savedNote._id)
  await user.save()

  res.status(201).json(savedNote)
})

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)

  if (blog) {
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

blogsRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const { title, author, url, likes } = req.body

  const blog = await Blog.findById(req.params.id)

  blog.title = title
  blog.author = author
  blog.url = url
  blog.likes = likes

  const updatedBlog = await blog.save()

  res.json(updatedBlog)
})

module.exports = blogsRouter
