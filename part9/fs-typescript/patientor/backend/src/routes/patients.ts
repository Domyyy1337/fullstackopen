import express, { type Request, type Response } from 'express'
import patientService from '../services/patientService.ts'
// import { NewEntrySchema } from '../types/entry.ts'
import middleware from '../utils/middleware.ts'
import NotFoundError from '../../errors/NotFoundError.ts'
import type { NewPatient, NonSensitivePatient, Patient } from '../types/patient.ts'

const router = express.Router()

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitivePatients())
})

router.get('/:id', (req, res: Response<Patient>) => {
  const { id } = req.params
  const patient = patientService.getPatientById(id)

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

router.post('/:id/entries', (req, res: Response<Patient>) => {
  const { id } = req.params
  const patient = patientService.getPatientById(id)

  if (!patient) throw new NotFoundError('No patient with this id')

  // const entry = NewEntrySchema.parse(req.body)

  // console.log(entry)

  res.json(patient)
})

router.use(middleware.errorHandler)

export default router
