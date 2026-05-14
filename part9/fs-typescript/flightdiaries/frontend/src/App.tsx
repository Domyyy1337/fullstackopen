import { useEffect, useState } from 'react'
import { type Weather, type DiaryEntry, type Visibility } from './types'
import entryService from './services/diaryService'
import Header from './components/Header'
import Diaries from './components/Diaries'

function App() {
  const [entries, setEntries] = useState<DiaryEntry[] | undefined>(undefined)
  // const [weather, setWeather] = useState<Weather | undefined>(undefined)
  // const [visibility, setVisibility] = useState<Visibility | undefined>(undefined)
  // const [comment, setComment] = useState('')
  // const [date, setDate] = useState('')

  useEffect(() => {
    entryService.getAll().then(initialEntries => setEntries(initialEntries))
  }, [])

  if (!entries) return <div>loading ...</div>

  return (
    <div>
      <Header />
      <Diaries diaries={entries} />
    </div>
  )
}

export default App
