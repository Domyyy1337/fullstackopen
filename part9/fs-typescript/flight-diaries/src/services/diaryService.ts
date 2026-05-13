import diaries from '../../data/entries.ts'
import type { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from '../types.ts'

function getEntries(): DiaryEntry[] {
  return diaries
}

function getNonSensitiveEntries(): NonSensitiveDiaryEntry[] {
  return diaries.map(({ id, date, weather, visibility }) => ({ id, date, weather, visibility }))
}

function addDiary(entry: NewDiaryEntry): DiaryEntry {
  const newDiaryEntry = {
    id: Math.max(...diaries.map(d => d.id)) + 1,
    ...entry
  }
  
  diaries.push(newDiaryEntry)
  return newDiaryEntry
}

function findById(id: number): DiaryEntry | undefined {
  const entry = diaries.find(d => d.id === id)
  return entry
}

export default { getEntries, addDiary, getNonSensitiveEntries, findById }
