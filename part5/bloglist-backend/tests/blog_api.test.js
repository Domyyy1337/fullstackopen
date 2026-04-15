const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)
const ctJson = /application\/json/

let token

beforeEach(async () => {
  token = await helper.initializeDb()
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
  test('returns 401 when being added without token', async () => {
    const newBlog = { title: 'My New Blog', author: 'Mustermann', url: 'https://facebook.com', likes: 0 }

    await api.post('/api/blogs').send(newBlog).expect(401).expect('Content-Type', ctJson)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })

  test('that is valid can be added', async () => {
    const newBlog = { title: 'My New Blog', author: 'Mustermann', url: 'https://facebook.com', likes: 0 }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', ctJson)

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

  test('with no likes posted has 0 likes', async () => {
    const newBlog = { title: 'My New Blog', author: 'Mustermann', url: 'https://facebook.com' }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', ctJson)

    assert.strictEqual(response.body.likes, 0)
  })

  test('without title is not valid', async () => {
    const newBlog = { author: 'Mustermann', url: 'https://facebook.com', likes: 0 }

    await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog).expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })

  test('without url is not valid', async () => {
    const newBlog = { title: 'My invalid Blog', author: 'Mustermann', likes: 0 }

    await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog).expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })

  test('can be viewed', async () => {
    const blogs = await helper.blogsInDb()
    const blog = blogs[0]

    const resultBlog = await api.get(`/api/blogs/${blog.id}`).expect(200).expect('Content-Type', ctJson)

    assert.deepStrictEqual(resultBlog.body.id, blog.id)
  })

  test('can be deleted', async () => {
    const blog = await helper.getBlog()

    await api.delete(`/api/blogs/${blog.id}`).set('Authorization', `Bearer ${token}`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    const ids = blogsAtEnd.map(b => b.id)

    assert(!ids.includes(blog.id))
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
  })

  test('can be updated with new likes', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const id = blogsAtStart[0].id

    const blogBeforeUpdate = await api.get(`/api/blogs/${id}`)
    const blog = blogBeforeUpdate.body

    blog.likes = 9999

    console.log(blog)

    await api.put(`/api/blogs/${id}`).send(blog).expect(200)

    const blogAfterUpdate = await api.get(`/api/blogs/${id}`).expect(200)
    assert.strictEqual(blogAfterUpdate.body.likes, 9999)
  })

  describe('when updated', () => {
    test('with valid data returns the updated blog', async () => {
      const blog = await helper.getBlog()

      blog.title = 'I have an update'

      const response = await api.put(`/api/blogs/${blog.id}`).send(blog).expect(200)

      assert.deepStrictEqual(response.body.title, blog.title)
    })
  })
})

after(async () => await mongoose.connection.close())
