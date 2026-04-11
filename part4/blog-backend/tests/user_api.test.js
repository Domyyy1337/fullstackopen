const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)
const ctJson = /application\/json/

describe('in a db with existing users', () => {
  beforeEach(async () => {
    await helper.initializeDb()
  })

  describe('retrieving all users', () => {
    test('succeeds with 200 and returns the users', async () => {
      const users = await helper.usersInDb()

      const response = await api.get('/api/users').expect(200).expect('Content-Type', ctJson)

      assert.strictEqual(response.body.length, users.length)
    })

    test('contains a specific user', async () => {
      const user = await helper.getUser()

      const response = await api.get('/api/users')
      const usernames = response.body.map(user => user.username)

      assert(usernames.includes(user.username))
    })
  })

  describe('retrieving a single user', () => {
    test('with an non-existing id throws a 404 not found', async () => {
      const invalidId = await helper.nonExistingId()

      await api.get(`/api/users/${invalidId}`).expect(404)
    })

    test('with an invalid id throws a 400', async () => {
      await api.get('/api/users/1').expect(400)
    })

    test('returns the user', async () => {
      const user = await helper.getUser()

      const response = await api.get(`/api/users/${user.id}`).expect(200).expect('Content-Type', ctJson)

      assert.deepStrictEqual(user, response.body)
    })
  })

  describe('creating a single user', () => {
    test('with valid data succeeds', async () => {
      const newUser = {
        username: 'peterino',
        name: 'Peter John',
        password: 'password',
      }
      await api.post('/api/users').send(newUser).expect(201).expect('Content-Type', ctJson)
      const usersAfter = await helper.usersInDb()
      assert.strictEqual(helper.initialUsers.length + 1, usersAfter.length)
    })
  })
})

after(async () => await mongoose.connection.close())
