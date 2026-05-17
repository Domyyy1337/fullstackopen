import axios from 'axios'
import type { Entry, EntryWithoutId, Patient, PatientFormValues, ZodErrorObject } from '../types'

import { apiBaseUrl } from '../constants'

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`)

  return data
}

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object)

  return data
}

async function get(id: string) {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`)

  return data
}

async function createEntryForPatient(patientId: Patient['id'], entry: EntryWithoutId) {
  try {
    const { data } = await axios.post<Entry>(`${apiBaseUrl}/patients/${patientId}/entries`, entry)

    return data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const validationErrors = JSON.parse(error.response?.request?.response)

      if (!validationErrors) throw new Error('Unknown Backend Error')

      let errorMessage = 'Error: '
      errorMessage += validationErrors.error.map((e: ZodErrorObject) => e.message).join(', ')

      throw new Error(errorMessage)
    }
    throw error
  }
}

export default {
  getAll,
  create,
  get,
  createEntryForPatient,
}
