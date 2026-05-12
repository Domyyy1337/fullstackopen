import diaries from '../../data/entries.ts'
import type { DiaryEntry, NonSensitiveDiaryEntry } from '../types.ts'

function getEntries(): DiaryEntry[] {
  return diaries
}

function getNonSensitiveEntries(): NonSensitiveDiaryEntry[] {
  return diaries.map(({ id, date, weather, visibility }) => ({ id, date, weather, visibility }))
}

function addDiary() {
  return null
}

export default { getEntries, addDiary, getNonSensitiveEntries }
