import axios from 'axios'
import { type DiaryEntry, type NewDiaryEntry } from '../types'

const baseUrl = '/api/diaries'

async function getAll() {
  const response = await axios.get<DiaryEntry[]>(baseUrl)
  return response.data
}

async function create(entry: NewDiaryEntry) {
  const response = await axios.post<DiaryEntry>(baseUrl, entry)
  return response.data
}

export default { getAll, create }
