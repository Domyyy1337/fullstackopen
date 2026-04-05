const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log(
    'give password as argument (optionally also name and number to create new entry)',
  )
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://dominik:${password}@cluster0.jjihyzn.mongodb.net/phoneBook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 })

const phoneBookSchema = new mongoose.Schema({
  name: String,
  number: String,
})
const Person = mongoose.model('Person', phoneBookSchema)

if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]
  const entry = new Person({
    name,
    number,
  })

  entry.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  Person.find({}).then((result) => {
    console.log('phonebook:')
    for (const person of result) {
      console.log(`${person.name} ${person.number}`)
    }
    mongoose.connection.close()
  })
}
