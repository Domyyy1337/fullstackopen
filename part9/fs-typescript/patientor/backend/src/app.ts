import express from 'express'
import diagnosisRouter from './routes/diagnoses.ts'
import patientRouter from './routes/patients.ts'

export const app = express()
app.use(express.json())

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged')
  res.send('pong')
})

app.use('/api/diagnoses', diagnosisRouter)
app.use('/api/patients', patientRouter)
