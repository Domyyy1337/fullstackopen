import express from 'express'

const app = express()
const PORT = 3001

app.use(express.json())

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged')
  res.send('pong')
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
