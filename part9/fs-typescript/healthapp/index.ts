import express from 'express'
import { calculateBmi } from './bmiCalculator.ts'
import { calculateExercises } from './exerciseCalculator.ts'

const app = express()
const PORT = 3000

app.use(express.json())

app.get('/hello', (_req, res) => res.send('Hello Full Stack!'))

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height)
  const weight = Number(req.query.weight)

  if (isNaN(height) || isNaN(weight)) return res.status(400).json({ error: 'malformatted parameters' })

  return res.json({
    weight,
    height,
    bmi: calculateBmi(Number(height), Number(weight)),
  })
})

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises } = req.body

  if (!target || !daily_exercises) return res.status(400).json({ error: 'parameters missing' })

  const dailyExercises = daily_exercises as number[]

  if (isNaN(Number(target)) || dailyExercises.some(e => isNaN(Number(e))))
    return res.status(400).json({ error: 'malformatted parameters' })

  return res.json(calculateExercises(dailyExercises, Number(target)))
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
