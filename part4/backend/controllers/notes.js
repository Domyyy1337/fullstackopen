const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({})
  res.json(notes)
})

notesRouter.get('/:id', async (req, res) => {
  const note = await Note.findById(req.params.id)

  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})

notesRouter.post('/', async (req, res) => {
  const { content, important = false, userId } = req.body
  const user = await User.findById(userId)

  if (!user) return res.status(400).json({ error: 'userId missing or not valid' })

  const note = new Note({
    content: content,
    important: important,
    user: user._id,
  })

  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()

  res.status(201).json(savedNote)
})

notesRouter.delete('/:id', (req, res, next) => {
  Note.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch(err => next(err))
})

notesRouter.put('/:id', (req, res, next) => {
  const { content, important } = req.body

  Note.findById(req.params.id)
    .then(note => {
      if (!note) return res.status(404).end()

      note.content = content
      note.important = important

      return note.save().then(updatedNote => res.json(updatedNote))
    })
    .catch(err => next(err))
})

module.exports = notesRouter
