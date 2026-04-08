const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)
const ctJson = /application\/json/

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('all blogs', () => {
  test('are returned as json', async () => {
    await api.get('/api/blogs').expect(200).expect('Content-Type', ctJson)
  })

  test('are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('contain a specific blog', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(b => b.title)
    assert(titles.includes('My First Blog'))
  })
})

describe('single blog', () => {
  test('that is valid can be added', async () => {
    const newBlog = {
      title: 'My New Blog',
      author: 'Mustermann',
      url: 'https://facebook.com',
      likes: 0,
    }

    await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', ctJson)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    assert(titles.includes(newBlog.title))
  })

  test('has unique identifier id', async () => {
    const response = await api.get('/api/blogs')
    const blog = Object.keys(response.body[0])

    assert(blog.includes('id'))
  })

  // test('without title is not valid', async () => {
  //   const newBlog = {
  //     author: 'Mustermann',
  //     url: 'https://facebook.com',
  //     likes: 0,
  //   }

  //   await api.post('/api/blogs').send(newBlog).expect(400)

  //   const blogsAtEnd = await helper.blogsInDb()
  //   expect.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  // })

  // test('can be viewed', async () => {
  //   const blogs = await helper.blogsInDb()
  //   const blog = blogs[0]

  //   const resultBlog = await api.get(`/api/blogs/${blog.id}`).expect(200).expect('Content-Type', ctJson)

  //   assert.deepStrictEqual(resultBlog.body, blog)
  // })
})

after(async () => await mongoose.connection.close())
