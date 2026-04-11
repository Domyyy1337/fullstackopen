const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const config = require('../utils/config')
const { expressjwt: jwt } = require('express-jwt')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs)
})

blogsRouter.post('/', jwt(config.JWT_CONFIG), middleware.userExtractor, async (req, res) => {
  const { author, likes, title, url } = req.body
  const user = req.user

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

blogsRouter.delete('/:id', jwt(config.JWT_CONFIG), middleware.userExtractor, async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  const user = req.user

  if (!blog) return res.status(404).json({ error: 'blog does not exist' })
  if (!blog.user) return res.status(400).json({ error: 'blog has no owner' })

  if (blog.user.toString() !== user.id) return res.status(401).json({ error: 'only creator of blog can delete it' })

  await blog.deleteOne()

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
