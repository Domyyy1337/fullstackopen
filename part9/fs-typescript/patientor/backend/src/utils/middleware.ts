import type { NextFunction, Request, Response } from 'express'
import { NewPatientSchema } from '../types/patient.ts'
import z from 'zod'
import NotFoundError from '../../errors/NotFoundError.ts'

function newPatientParser(req: Request, _res: Response, next: NextFunction) {
  NewPatientSchema.parse(req.body)
  next()
}

function errorHandler(error: unknown, _req: Request, res: Response, next: NextFunction) {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues })
  } else if (error instanceof NotFoundError) {
    res.status(404).send({ error: error.message })
  } else {
    next()
  }
}

export default { newPatientParser, errorHandler }
