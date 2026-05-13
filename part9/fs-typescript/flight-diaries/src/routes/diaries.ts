import express, { type Request, type Response } from 'express'
import diaryService from '../services/diaryService.ts'
import { type DiaryEntry, type NewDiaryEntry, type NonSensitiveDiaryEntry } from '../types.ts'
import middleware from '../utils/middleware.ts'

const router = express.Router()

router.get('/', (_req, res: Response<NonSensitiveDiaryEntry[]>) => {
  res.send(diaryService.getNonSensitiveEntries())
})

router.post(
  '/',
  middleware.newDiaryParser,
  (req: Request<unknown, unknown, NewDiaryEntry>, res: Response<DiaryEntry | object>) => {
    const addedEntry = diaryService.addDiary(req.body)
    return res.json(addedEntry)
  }
)

router.get('/:id', (req, res: Response<DiaryEntry | string>) => {
  const diary = diaryService.findById(Number(req.params.id))

  if (diary) return res.send(diary)
  return res.sendStatus(404)
})

router.use(middleware.errorHandler)

export default router
