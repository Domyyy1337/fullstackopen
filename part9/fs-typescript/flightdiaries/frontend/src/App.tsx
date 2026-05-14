import { useEffect, useState } from 'react'
import { type DiaryEntry, type NewDiaryEntry } from './types'
import diaryService from './services/diaryService'
import Header from './components/Header'
import Diaries from './components/Diaries'
import DiaryForm from './components/DiaryForm'
import Notification from './components/Notification'

function App() {
  const [entries, setEntries] = useState<DiaryEntry[] | undefined>(undefined)
  const [notification, setNotification] = useState<string | null>(null)

  useEffect(() => {
    diaryService.getAll().then(initialEntries => setEntries(initialEntries))
  }, [])

  function createDiary(newDiaryEntry: NewDiaryEntry) {
    diaryService
      .create(newDiaryEntry)
      .then(createdEntry => {
        if (!createdEntry) return
        setEntries(entries ? entries.concat(createdEntry) : [createdEntry])
      })
      .catch(error => {
        if (error instanceof Error) {
          setError(error.message)
        }
      })
  }

  function setError(message: string) {
    setNotification(message)
    setTimeout(() => setNotification(null), 5000)
  }

  if (!entries) return <div>loading ...</div>

  return (
    <div>
      <Header />
      <Notification message={notification} />
      <Diaries diaries={entries} />
      <DiaryForm createDiary={createDiary} setError={setError} />
    </div>
  )
}

export default App
