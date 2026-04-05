require('dotenv').config()
const express = require('express')
const Note = require('./models/note.js')

const app = express()

const PORT = process.env.port || 3001

app.use(express.json())
app.use(express.static('dist'))

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', async (req, res) => {
  const notes = await Note.find({})
  res.json(notes)
})

app.get('/api/notes/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    const note = await Note.findById(id)
    if (!note) return res.status(404).end()
    return res.json(note)
  } catch (error) {
    next(error)
  }
})

app.delete('/api/notes/:id', async (req, res, next) => {
  const { id } = req.params

  try {
    await Note.findByIdAndDelete(id)
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }

  res.status(204).end()
})

app.put('/api/notes/:id', async (req, res, next) => {
  const { content, important } = req.body
  const { id } = req.params

  try {
    const note = await Note.findById(id)

    if (!note) return res.sendStatus(404)

    note.content = content
    note.important = important

    const updatedNote = await note.save()

    res.json(updatedNote)
  } catch (error) {
    next(error)
  }
})

app.post('/api/notes', (req, res, next) => {
  const body = req.body
  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note
    .save()
    .then((savedNote) => {
      res.json(savedNote)
    })
    .catch((err) => next(err))
})

app.use((req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
})

app.use((err, req, res, next) => {
  console.error(err.message)

  switch (err.name) {
    case 'CastError':
      return res.status(400).send({ error: 'malformatted id' })
    case 'ValidationError':
      return res.status(400).json({ error: err.message })
    default:
      next(err)
  }

  if (err.name === 'CastError') next(err)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
