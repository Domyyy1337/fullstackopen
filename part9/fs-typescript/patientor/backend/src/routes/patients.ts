import express, { type Response } from 'express'
import patientService from '../services/patientService.ts'
import type { Patient, NonSensitivePatient } from '../types.ts'
import { parsePatient } from '../utils.ts'

const router = express.Router()

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitivePatients())
})

router.post('/', (req, res: Response<Patient | string>) => {
  try {
    const newPatient = parsePatient(req.body)
    const addedPatient = patientService.addPatient(newPatient)
    res.json(addedPatient)
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message
    }
    res.status(400).send(errorMessage)
  }
})

export default router
