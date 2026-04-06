const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

mongoose.connect(process.env.TEST_MONGODB_URI, { family: 4 })

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'HTML is totally super hard',
  important: true,
})

note.save().then(() => {
  console.log('note saved!')
  mongoose.connection.close()
})

// Note.find({}).then((result) => {
//   for (const note of result) {
//     console.log(note)
//   }
//   mongoose.connection.close()
// })
