import axios from 'axios'
import type { Note, NewNote } from '../types'

const baseUrl = 'http://localhost:3001/notes'

async function getAll() {
  const response = await axios.get<Note[]>(baseUrl)
  return response.data
}

async function create(object: NewNote) {
  const response = await axios.post<Note>(baseUrl, object)
  return response.data
}

export default { getAll, create }
