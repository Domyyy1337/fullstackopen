import express from 'express'
import { calculateBmi } from './bmiCalculator.ts'

const app = express()
const PORT = 3003

app.use(express.json())

app.get('/hello', (_req, res) => res.send('Hello Full Stack!'))

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height)
  const weight = Number(req.query.weight)

  if (isNaN(height) || isNaN(weight)) return res.json({ error: 'malformatted parameters' })

  return res.json({
    weight,
    height,
    bmi: calculateBmi(Number(height), Number(weight)),
  })
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
