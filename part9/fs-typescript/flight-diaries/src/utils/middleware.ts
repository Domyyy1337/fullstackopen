import type { NextFunction, Request, Response } from 'express'
import { NewEntrySchema } from '../types.ts'
import z from 'zod'

function newDiaryParser(req: Request, _res: Response, next: NextFunction) {
  try {
    NewEntrySchema.parse(req.body)
    next()
  } catch (error: unknown) {
    next(error)
  }
}

function errorHandler(error: unknown, _req: Request, res: Response, next: NextFunction) {
  if (error instanceof z.ZodError) return res.status(400).send({ error: error.issues })

  return next(error)
}

export default { newDiaryParser, errorHandler }
