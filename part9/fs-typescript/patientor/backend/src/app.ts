import express, { type Response } from 'express'
import diagnosisRouter from './routes/diagnoses.ts'
import patientRouter from './routes/patients.ts'
import cors from 'cors'

export const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/ping', (_req, res: Response<string>) => {
  console.log('someone pinged')
  res.send('pong')
})

app.use('/api/diagnoses', diagnosisRouter)
app.use('/api/patients', patientRouter)
