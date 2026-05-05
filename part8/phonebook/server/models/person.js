const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
  },
  phone: {
    type: String,
    minLength: 5,
  },
  street: {
    type: String,
    required: true,
    minLength: 5,
  },
  city: {
    type: String,
    required: true,
    minLength: 3,
  },
})

const Person = mongoose.model('Person', schema)

module.exports = Person
