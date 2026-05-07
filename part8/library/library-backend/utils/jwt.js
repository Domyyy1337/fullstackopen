const jwt = require('jsonwebtoken')
const User = require('../models/user')

async function signToken(user) {
  console.log(user)

  return jwt.sign({ username: user.username, id: user._id }, process.env.JWT_SECRET)
}

async function getUserFromAutHeader(auth) {
  if (!auth || !auth.startsWith('Bearer ')) return null
  const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)

  return User.findById(decodedToken.id)
}

module.exports = { signToken, getUserFromAutHeader }
