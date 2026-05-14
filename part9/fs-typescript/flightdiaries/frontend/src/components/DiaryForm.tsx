import { useState } from 'react'
import { type NewDiaryEntry, NewEntrySchema, Visibility, Weather } from '../types'
import z from 'zod'

interface DiaryFormProps {
  createDiary: (newDiaryEntry: NewDiaryEntry) => void
  setError: (message: string) => void
}

export default function DiaryForm({ createDiary, setError }: DiaryFormProps) {
  const [weather, setWeather] = useState<Weather>('sunny')
  const [visibility, setVisibility] = useState<Visibility>('great')
  const [comment, setComment] = useState('')
  const [date, setDate] = useState('')

  const weatherOptions = Object.values(Weather)
  const visibilityOptions = Object.values(Visibility)

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

    setWeather('sunny')
    setVisibility('great')
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
          comment: <input value={comment} onChange={e => setComment(e.target.value)} />
        </label>
        <fieldset>
          <legend>visibility*</legend>
          {visibilityOptions.map(o => (
            <label key={o}>
              {o}
              <input type='radio' name='visibility' onChange={() => setVisibility(o)} checked={visibility === o} />
            </label>
          ))}
        </fieldset>
        <fieldset>
          <legend>weather*</legend>
          {weatherOptions.map(o => (
            <label key={o}>
              {o}
              <input type='radio' name='weather' onChange={() => setWeather(o)} checked={weather === o} />
            </label>
          ))}
        </fieldset>
        <button type='submit'>submit</button>
      </form>
    </div>
  )
}
