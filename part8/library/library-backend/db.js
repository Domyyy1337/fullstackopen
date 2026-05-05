require('dotenv').config()
const mongoose = require('mongoose')

async function connectToDatabase(uri) {
  console.log('connecting to database URI:', uri)

  try {
    await mongoose.connect(uri)
    console.log('connected to MongoDB')
  } catch (error) {
    console.log('error connecting to MongoDB:', error.message)
    process.exit(1)
  }
}

module.exports = connectToDatabase