import express, { type Response } from 'express'
import patientService from '../services/patientService.ts'
import type { Patient, NonSensitivePatient } from '../types.ts'

const router = express.Router()

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitivePatients())
})

router.post('/', (req, res: Response<Patient | string>) => {
  /* eslint-disable @typescript-eslint/no-unsafe-argument */
  const newPatient = patientService.addPatient(req.body)
  res.json(newPatient)
})

export default router
