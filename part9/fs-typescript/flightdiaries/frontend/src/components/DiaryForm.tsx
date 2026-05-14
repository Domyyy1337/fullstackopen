import { useState } from 'react'
import { type NewDiaryEntry, NewEntrySchema } from '../types'
import z from 'zod'

interface DiaryFormProps {
  createDiary: (newDiaryEntry: NewDiaryEntry) => void
  setError: (message: string) => void
}

export default function DiaryForm({ createDiary, setError }: DiaryFormProps) {
  const [weather, setWeather] = useState('')
  const [visibility, setVisibility] = useState('')
  const [comment, setComment] = useState('')
  const [date, setDate] = useState('')

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    if (!weather || !visibility || !date) {
      return setError('Required input parameter missing')
    }

    try {
      const newDiaryEntry = NewEntrySchema.parse({
        weather: weather,
        visibility: visibility,
        comment,
        date,
      })
      createDiary(newDiaryEntry)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const issues = error.issues.map(i => i.message).join(', ')
        setError(issues)
        return
      }
      setError('Something went wrong.')
    }

    setWeather('')
    setVisibility('')
    setComment('')
    setDate('')
  }

  return (
    <div>
      <h2>Add New Entry</h2>
      <form onSubmit={handleSubmit}>
        <label>
          date*: <input type='date' value={date} onChange={e => setDate(e.target.value)} />
        </label>
        <label>
          weather*: <input value={weather} onChange={e => setWeather(e.target.value)} />
        </label>
        <label>
          visibility*: <input value={visibility} onChange={e => setVisibility(e.target.value)} />
        </label>
        <label>
          comment: <input value={comment} onChange={e => setComment(e.target.value)} />
        </label>
        <button type='submit'>submit</button>
      </form>
    </div>
  )
}
