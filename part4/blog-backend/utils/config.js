require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.NODE_ENV === 'test' ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI
const JWT_CONFIG = {
  secret: process.env.SECRET,
  algorithms: ['HS256'],
}

module.exports = { PORT, MONGODB_URI, JWT_CONFIG }
