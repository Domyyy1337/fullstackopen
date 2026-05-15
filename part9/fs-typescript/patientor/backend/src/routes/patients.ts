import express, { type Request, type Response } from 'express'
import patientService from '../services/patientService.ts'
import type { Patient, NonSensitivePatient, NewPatient } from '../types.ts'
import middleware from '../utils/middleware.ts'
import NotFoundError from '../../errors/NotFoundError.ts'

const router = express.Router()

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitivePatients())
})

router.get('/:id', (req, res: Response<Patient>) => {
  const { id } = req.params
  console.log(id)

  const patient = patientService.getPatientById(id)
  console.log(patient)

  if (!patient) throw new NotFoundError('No patient with this id')

  res.json(patient)
})

router.post(
  '/',
  middleware.newPatientParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient | string>) => {
    const addedPatient = patientService.addPatient(req.body)
    res.json(addedPatient)
  }
)

router.use(middleware.errorHandler)

export default router
