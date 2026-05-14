import { useState } from 'react'
import type { NewDiaryEntry, Visibility, Weather } from '../types'

interface DiaryFormProps {
  createDiary: (newDiaryEntry: NewDiaryEntry) => void
}

export default function DiaryForm({ createDiary }: DiaryFormProps) {
  const [weather, setWeather] = useState('')
  const [visibility, setVisibility] = useState('')
  const [comment, setComment] = useState('')
  const [date, setDate] = useState('')

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    if (!weather || !visibility || !date) throw new Error('Required input parameter missing')
    const newDiaryEntry: NewDiaryEntry = {
      weather: weather as Weather,
      visibility: visibility as Visibility,
      comment,
      date,
    }
    createDiary(newDiaryEntry)
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
