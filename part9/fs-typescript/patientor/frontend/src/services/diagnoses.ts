import axios from 'axios'
import type { Diagnosis } from '../types'
import { apiBaseUrl } from '../constants'

async function getAll() {
  const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`)

  return data
}

export default { getAll }
