const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', (req, res) => {
  Note.find({}).then(notes => res.json(notes))
})

notesRouter.get('/:id', (req, res, next) => {
  Note.findById(req.params.id)
    .then(note => {
      if (note) return res.json(note)
      res.status(404).end()
    })
    .catch(err => next(err))
})

notesRouter.post('/', (req, res, next) => {
  const { content, important = false } = req.body

  const note = new Note({
    content: content,
    important: important,
  })

  note
    .save()
    .then(savedNote => res.json(savedNote))
    .catch(err => next(err))
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
