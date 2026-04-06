require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const app = express()

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

mongoose.connect(process.env.MONGODB_URI, { family: 4 })

app.use(express.json())

app.get('/api/blogs', (req, res) => {
  Blog.find({}).then(blogs => res.json(blogs))
})

app.post('/api/blogs', (req, res) => {
  const blog = new Blog(req.body)

  blog.save().then(result => res.status(201).json(result))
})

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`))
