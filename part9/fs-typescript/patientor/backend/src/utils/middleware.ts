import type { NextFunction, Request, Response } from 'express'
import { NewPatientSchema } from '../types.ts'
import z from 'zod'

function newPatientParser(req: Request, _res: Response, next: NextFunction) {
  NewPatientSchema.parse(req.body)
  next()
}

function errorHandler(error: unknown, _req: Request, res: Response, next: NextFunction) {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues })
  } else {
    next()
  }
}

export default { newPatientParser, errorHandler }
