const Note = require('../models/note')
const User = require('../models/user')

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false,
    user: '69d7c118b283b9b0b6c4c9ae',
  },
  {
    content: 'Browser can only execute JavaScript',
    important: true,
    user: '69d7c118b283b9b0b6c4c9ae',
  },
]

const initialUsers = [
  {
    username: 'dominik',
    name: 'Dominik',
    passwordHash: 'cookies',
  },
]

const initializeDb = async () => {
  await User.deleteMany({})
  await Note.deleteMany({})

  const user = await User.insertOne(initialUsers[0])
  const validUserId = user._id.toString()

  for (const note of initialNotes) {
    note.user = validUserId
  }

  await Note.insertMany(initialNotes)
}

const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon' })
  await note.save()
  await note.deleteOne()

  return note._id.toString()
}

const notesInDb = async () => {
  const notes = await Note.find({})
  return notes.map(note => note.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const getUser = async () => {
  const users = await usersInDb()
  return users[0]
}

const getNote = async () => {
  const notes = await notesInDb()
  return notes[0]
}

const getUserAndNote = async () => {
  const user = await getUser()
  const note = await getNote()
  return { user, note }
}

module.exports = {
  initialNotes,
  initialUsers,
  nonExistingId,
  notesInDb,
  usersInDb,
  getUser,
  getNote,
  getUserAndNote,
  initializeDb,
}
