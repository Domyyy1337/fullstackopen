import axios from 'axios'
import { type DiaryEntry, type NewDiaryEntry } from '../types'

const baseUrl = '/api/diaries'

async function getAll() {
  try {
    const response = await axios.get<DiaryEntry[]>(baseUrl)
    return response.data
  } catch {
    throw new Error('Failed fetching data')
  }
}

async function create(entry: NewDiaryEntry) {
  try {
    const response = await axios.post<DiaryEntry>(baseUrl, entry)
    return response.data
  } catch {
    throw new Error('Failed fetching entry')
  }
}

export default { getAll, create }
