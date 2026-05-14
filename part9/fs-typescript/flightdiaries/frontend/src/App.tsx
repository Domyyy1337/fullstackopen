import { useEffect, useState } from 'react'
import { type DiaryEntry, type NewDiaryEntry } from './types'
import diaryService from './services/diaryService'
import Header from './components/Header'
import Diaries from './components/Diaries'
import DiaryForm from './components/DiaryForm'

function App() {
  const [entries, setEntries] = useState<DiaryEntry[] | undefined>(undefined)
  useEffect(() => {
    diaryService.getAll().then(initialEntries => setEntries(initialEntries))
  }, [])

  function createDiary(newDiaryEntry: NewDiaryEntry) {
    diaryService.create(newDiaryEntry).then(createdEntry => {
      setEntries(entries ? entries.concat(createdEntry) : [createdEntry])
    })
  }

  if (!entries) return <div>loading ...</div>

  return (
    <div>
      <Header />
      <Diaries diaries={entries} />
      <DiaryForm createDiary={createDiary} />
    </div>
  )
}

export default App
