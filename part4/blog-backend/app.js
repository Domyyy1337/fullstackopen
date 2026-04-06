require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')

const app = express()

mongoose
  .connect(config.MONGODB_URI, { family: 4 })
  .then(() => logger.info('Connected to MongoBD'))
  .catch(err => logger.error('Error while connecting to MongoDB: ', err))

app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app
